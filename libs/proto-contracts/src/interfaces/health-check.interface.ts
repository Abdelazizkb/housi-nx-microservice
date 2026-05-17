export interface HealthCheckResponse {
  success: boolean;
  message: string;
}
export type HealthCheckRequest = Record<string, never>;
