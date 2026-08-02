import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dtos';
import {
  RegisterResponse,
  ValidateEmailResponse,
} from '@housi-nx-microservices/proto-contracts';
import { RegisterUseCase } from './usecases/register.usecase';
import { ValidateEmailDto } from './dtos/verify-email.dtos';
import { VerifyEmailUsecase } from './usecases/verify-email.usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly validateEmailUseCase: VerifyEmailUsecase,
  ) {}

  async register(registerPayload: RegisterDto): Promise<RegisterResponse> {
    return this.registerUseCase.execute(registerPayload);
  }

  async validateEmail(
    validateEmailPayload: ValidateEmailDto,
  ): Promise<ValidateEmailResponse> {
    return this.validateEmailUseCase.execute(validateEmailPayload);
  }
}
