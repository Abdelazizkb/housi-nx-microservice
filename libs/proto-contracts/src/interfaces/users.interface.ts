import { Observable } from 'rxjs';
import {
  HealthCheckRequest,
  HealthCheckResponse,
} from './health-check.interface';

export interface CreateUserRequest {
  credentialId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
}

export interface UsersServiceRPC {
  healthCheck: (data: HealthCheckRequest) => Observable<HealthCheckResponse>;
  createUser: (data: CreateUserRequest) => Observable<CreateUserResponse>;
}
