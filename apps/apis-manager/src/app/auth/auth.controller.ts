import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  healthCheck() {
    return this.authService.healthCheck();
  }

  @Post('register')
  register(
    @Body(new ValidationPipe({ whitelist: true })) registerPayload: RegisterDto,
  ) {
    return this.authService.register(registerPayload);
  }
}
