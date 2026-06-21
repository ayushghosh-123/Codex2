import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from '../../backend/src/app.module';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; username: string }) {
    return firstValueFrom(
      this.authClient.send({ cmd: 'auth.register' }, body),
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return firstValueFrom(
      this.authClient.send({ cmd: 'auth.login' }, body),
    );
  }
}
