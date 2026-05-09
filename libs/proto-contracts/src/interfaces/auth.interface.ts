export type HealthCheckRequest = Record<string, never>;

export interface HealthCheckResponse {
  success: boolean;
  message: string;
}

export interface AuthServiceRPC {
  healthCheck(data: HealthCheckRequest): HealthCheckResponse;
}
