import { Observable } from 'rxjs';
import {
  HealthCheckRequest,
  HealthCheckResponse,
} from './health-check.interface';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  verificationId: string;
}

export interface ValidateEmailRequest {
  verificationId: string;
  code: number;
  type: string;
}

export interface ValidateEmailResponse {
  success: boolean;
  message: string;
}
export interface AuthServiceRPC {
  healthCheck(request: HealthCheckRequest): HealthCheckResponse;
  register(request: RegisterRequest): Observable<RegisterResponse>;
  validateEmail(
    request: ValidateEmailRequest,
  ): Observable<ValidateEmailResponse>;
}
