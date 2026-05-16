import { Observable } from 'rxjs';

export interface HealthCheckResponse {
  success: boolean;
  message: string;
}
export type HealthCheckRequest = Record<string, never>;

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface AuthServiceRPC {
  healthCheck(request: HealthCheckRequest): HealthCheckResponse;
  register(request: RegisterRequest): Observable<RegisterResponse>;
}
