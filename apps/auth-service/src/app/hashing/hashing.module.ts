import { Module } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Module({
  providers: [HashingProvider],
  exports: [HashingProvider],
})
export class HashingModule {}
