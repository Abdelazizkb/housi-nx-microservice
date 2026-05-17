import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '../common/constants';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { RpcException } from '@nestjs/microservices';
import { httpToGrpc } from '@housi-nx-microservices/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async createUser(createUserPayload: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserPayload.email },
    });
    if (existingUser) {
      throw new RpcException({
        message: 'User already exists',
        code: httpToGrpc.get(HttpStatus.BAD_REQUEST),
      });
    }
    const newUser = this.usersRepository.create(createUserPayload);
    return this.usersRepository.save(newUser);
  }
}
