import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServiceService {
  register(data: { email: string; password: string; username: string }) {
    return {
      status: 'ok',
      message: 'Registration stub — implement persistence in auth-service',
      email: data.email,
      username: data.username,
    };
  }

  login(data: { email: string; password: string }) {
    return {
      status: 'ok',
      message: 'Login stub — implement JWT signing in auth-service',
      email: data.email,
      token: 'stub-jwt-token',
    };
  }

  validateToken(token: string) {
    return {
      status: 'ok',
      message: 'Token validation stub',
      valid: token.length > 0,
    };
  }

  health() {
    return {
      service: 'auth-service',
      status: 'ok',
      port: Number(process.env.AUTH_SERVICE_PORT) || 4001,
    };
  }
}
