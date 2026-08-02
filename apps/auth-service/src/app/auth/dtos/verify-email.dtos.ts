import { ValidateEmailRequest } from '@housi-nx-microservices/proto-contracts';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValidateEmailDto implements ValidateEmailRequest {
  @IsString()
  @IsNotEmpty()
  verificationId: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
