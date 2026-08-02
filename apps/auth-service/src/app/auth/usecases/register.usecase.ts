import {
  CreateUserRequest,
  CreateUserResponse,
  GrpcService,
  RegisterResponse,
  USERS_PACKAGE_CLIENT,
  UsersServiceRPC,
} from '@housi-nx-microservices/proto-contracts';
import { RegisterDto } from '../dtos/register.dtos';
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  AUTH_CREDENTIAL_REPOSITORY,
  AUTH_DATA_SOURCE,
  AUTH_ROLE_REPOSITORY,
} from '../../common/constants';
import { AuthCredentialRepository } from '../repositories/auth-credential.repository';
import { AuthRoleRepository } from '../repositories/auth-role.repository';
import { DataSource, EntityManager } from 'typeorm';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthCredentialEntity } from '../../database/entities/auth-credential.entity';
import { httpToGrpc } from '@housi-nx-microservices/exceptions';
import { AuthRoleEntity } from '../../database/entities/auth-role.entity';
import { AuthRoleNamesEnum } from '../../database/enums/role-name.enum';
import { HashingProvider } from '../../hashing/hashing.provider';
import { AccountVerificationService } from '../../account-verification/account-verification.service';
import { VerificationTypesEnum } from '../../database/enums/verification-type.enum';

@Injectable()
export class RegisterUseCase {
  private usersService: UsersServiceRPC;

  constructor(
    @Inject(AUTH_CREDENTIAL_REPOSITORY)
    private readonly authCredentialRepository: AuthCredentialRepository,

    @Inject(AUTH_ROLE_REPOSITORY)
    private readonly authRoleRepository: AuthRoleRepository,

    private readonly hashingProvider: HashingProvider,
    @Inject(AUTH_DATA_SOURCE) private readonly dataSource: DataSource,

    @Inject(USERS_PACKAGE_CLIENT) private readonly usersClient: ClientGrpc,

    private readonly accountVerificationService: AccountVerificationService,
  ) {}

  onModuleInit() {
    this.usersService = this.usersClient.getService<UsersServiceRPC>(
      GrpcService.USERS,
    );
  }

  async execute(registerPayload: RegisterDto): Promise<RegisterResponse> {
    const existingCredential = await this.authCredentialRepository.findOne({
      where: { email: registerPayload.email },
    });

    if (existingCredential) {
      throw new BadRequestException('Email already exists');
    }

    const newCredential = await this.dataSource.transaction(async (manager) => {
      const newCredential = await this.createAuthCredential(
        manager,
        registerPayload,
      );

      await this.createAuthRole(manager, newCredential.id);

      return newCredential;
    });

    try {
      await this.createUser({
        credentialId: newCredential.id,
        firstName: registerPayload.firstName,
        lastName: registerPayload.lastName,
        email: registerPayload.email,
      });
    } catch (error) {
      this.rollbackTransaction(newCredential);
      throw new RpcException({
        message: `Failed to create user for credential with id : ${newCredential.id} - Transaction rolled back`,
        statusCode: httpToGrpc.get(HttpStatus.INTERNAL_SERVER_ERROR),
      });
    }

    const { verificationId } =
      await this.accountVerificationService.issueVerificationCode(
        newCredential.id,
        VerificationTypesEnum.VERIFY_EMAIL,
      );

    return {
      success: true,
      message: 'User registered successfully',
      verificationId,
    };
  }

  private async createUser(
    registerPayload: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const response = await lastValueFrom(
      this.usersService.createUser({
        credentialId: registerPayload.credentialId,
        firstName: registerPayload.firstName,
        lastName: registerPayload.lastName,
        email: registerPayload.email,
      }),
    );
    return response;
  }

  private async createAuthCredential(
    manager: EntityManager,
    registerPayload: RegisterDto,
  ): Promise<AuthCredentialEntity> {
    const existingCredential = await manager.findOne(AuthCredentialEntity, {
      where: {
        email: registerPayload.email,
      },
    });

    if (existingCredential) {
      throw new RpcException({
        message: 'Email already exists',
        statusCode: httpToGrpc.get(HttpStatus.BAD_REQUEST),
      });
    }

    const hashedPassword = await this.hashingProvider.hash(
      registerPayload.password,
    );
    const newCredential = this.authCredentialRepository.create({
      email: registerPayload.email,
      password: hashedPassword,
    });
    return manager.save(AuthCredentialEntity, newCredential);
  }

  private async createAuthRole(
    manager: EntityManager,
    credentialId: string,
  ): Promise<AuthRoleEntity> {
    const newRole = this.authRoleRepository.create({
      credentialId,
      name: AuthRoleNamesEnum.CUSTOMER,
    });
    await manager.save(AuthRoleEntity, newRole);
    return newRole;
  }

  private async rollbackTransaction(credential: AuthCredentialEntity) {
    await this.authCredentialRepository
      .delete({ id: credential.id })
      .catch(() => {
        throw new RpcException({
          message: `Failed to rollback for credential with id : ${credential.id} after creating user failed`,
          statusCode: httpToGrpc.get(HttpStatus.INTERNAL_SERVER_ERROR),
        });
      });
  }
}
