import { CreateUserRequest } from '@housi-nx-microservices/proto-contracts';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  credentialId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
