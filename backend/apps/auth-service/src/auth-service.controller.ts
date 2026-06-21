// apps/auth-service/src/auth-service.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthServiceService } from './auth-service.service';

@Controller()
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  // Gateway calls this when it needs to validate a JWT
  @MessagePattern({ cmd: 'auth.validate_token' })
  validateToken(@Payload() data: { token: string }) {
    return this.authService.validateToken(data.token);
  }

  // Gateway calls this on POST /auth/register
  @MessagePattern({ cmd: 'auth.register' })
  register(@Payload() data: { email: string; password: string; username: string }) {
    return this.authService.register(data);
  }

  // Gateway calls this on POST /auth/login
  @MessagePattern({ cmd: 'auth.login' })
  login(@Payload() data: { email: string; password: string }) {
    return this.authService.login(data);
  }
}
