import { Controller } from '@nestjs/common';
import { AccountVerificationService } from './account-verification.service';

@Controller()
export class AccountVerificationController {
  constructor(
    private readonly accountVerificationService: AccountVerificationService,
  ) {}
}
