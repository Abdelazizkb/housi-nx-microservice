import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dtos';
import { ValidateEmailDto } from './dtos/verify-email.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  healthCheck() {
    return this.authService.healthCheck();
  }

  @Post('register')
  register(@Body() registerPayload: RegisterDto) {
    return this.authService.register(registerPayload);
  }

  @Post('validate-email')
  validateEmail(
    @Body()
    validateEmailPayload: ValidateEmailDto,
  ) {
    return this.authService.validateEmail(validateEmailPayload);
  }
}
