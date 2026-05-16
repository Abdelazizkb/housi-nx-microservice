import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dtos';
import { RegisterResponse } from '@housi-nx-microservices/proto-contracts';
import {
  AUTH_CREDENTIAL_REPOSITORY,
  AUTH_DATA_SOURCE,
  AUTH_ROLE_REPOSITORY,
} from '../../common/constants';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AuthCredentialEntity } from '../database/entities/auth-credential.entity';
import { HashingProvider } from './hashing.provider';
import { AuthRoleEntity } from '../database/entities/auth-role.entity';
import { AuthRoleNamesEnum } from '../database/enums/role-name.enum';
import { httpToGrpc } from '@housi-nx-microservices/exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_CREDENTIAL_REPOSITORY)
    private readonly authCredentialRepository: Repository<AuthCredentialEntity>,

    @Inject(AUTH_ROLE_REPOSITORY)
    private readonly authRoleRepository: Repository<AuthRoleEntity>,

    private readonly hashingProvider: HashingProvider,
    @Inject(AUTH_DATA_SOURCE) private readonly dataSource: DataSource,
  ) {}

  async register(registerPayload: RegisterDto): Promise<RegisterResponse> {
    const existingCredential = await this.authCredentialRepository.findOne({
      where: { email: registerPayload.email },
    });

    if (existingCredential) {
      throw new BadRequestException('Email already exists');
    }

    await this.dataSource.transaction(async (manager) => {
      const newCredential = await this.createAuthCredential(
        manager,
        registerPayload,
      );
      await this.createAuthRole(manager, newCredential.id);
    });

    return {
      success: true,
      message: 'User registered successfully',
    };
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
}
