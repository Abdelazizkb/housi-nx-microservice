import { Module } from '@nestjs/common';
import { UsersGrpcClientModule } from '../clients/users.grpc-client';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UsersGrpcClientModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
