import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dtos';
import { RegisterResponse } from '@housi-nx-microservices/proto-contracts';
import { RegisterUseCase } from './usecases/register.usecase';

@Injectable()
export class AuthService {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  async register(registerPayload: RegisterDto): Promise<RegisterResponse> {
    return this.registerUseCase.execute(registerPayload);
  }
}
