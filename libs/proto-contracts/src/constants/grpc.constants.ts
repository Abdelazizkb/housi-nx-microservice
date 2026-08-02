export enum GrpcPackage {
  AUTH = 'auth',
  USERS = 'users',
}

export enum GrpcService {
  AUTH = 'AuthService',
  USERS = 'UsersService',
}

export const GRPC_METHODS = {
  [GrpcPackage.AUTH]: {
    [GrpcService.AUTH]: {
      VALIDATE_EMAIL: 'ValidateEmail',
      REGISTER: 'Register',
    },
  },
  [GrpcPackage.USERS]: {
    [GrpcService.USERS]: {
      CREATE_USER: 'CreateUser',
    },
  },
};

export const AUTH_PACKAGE_CLIENT = 'AUTH_PACKAGE_CLIENT';
export const USERS_PACKAGE_CLIENT = 'USERS_PACKAGE_CLIENT';
