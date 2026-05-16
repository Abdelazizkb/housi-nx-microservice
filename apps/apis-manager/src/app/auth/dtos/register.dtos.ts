import { RegisterRequest } from '@housi-nx-microservices/proto-contracts';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto implements RegisterRequest {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
