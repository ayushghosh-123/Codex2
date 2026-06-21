import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './../../auth-service/src/auth.controler'; // <-- Make sure it points to local folder

export const AUTH_SERVICE         = 'AUTH_SERVICE';
export const PROJECT_SERVICE      = 'PROJECT_SERVICE';
export const FILE_SERVICE         = 'FILE_SERVICE';
export const COMMENT_SERVICE      = 'COMMENT_SERVICE';
export const EXECUT_SERVICE       = 'EXECUT_SERVICE';
export const PERMISSION_SERVICE   = 'PERMISSION_SERVICE';
export const NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ClientsModule.register([
      { name: AUTH_SERVICE,         transport: Transport.TCP, options: { host: process.env.AUTH_SERVICE_HOST, port: Number(process.env.AUTH_SERVICE_PORT)} },
      { name: PROJECT_SERVICE,      transport: Transport.TCP, options: { host: process.env.PROJECT_SERVICE_HOST, port: Number(process.env.PROJECT_SERVICE_PORT)} },
      { name: FILE_SERVICE,         transport: Transport.TCP, options: { host: process.env.FILE_SERVICE_HOST, port: Number(process.env.FILE_SERVICE_PORT)} },
      { name: COMMENT_SERVICE,      transport: Transport.TCP, options: { host: process.env.COMMENT_SERVICE_HOST, port: Number(process.env.COMMENT_SERVICE_PORT)} },
      { name: EXECUT_SERVICE,       transport: Transport.TCP, options: { host: process.env.EXECUT_SERVICE_HOST, port: Number(process.env.EXECUT_SERVICE_PORT)} },
      { name: PERMISSION_SERVICE,   transport: Transport.TCP, options: { host: process.env.PERMISSION_SERVICE_HOST, port: Number(process.env.PERMISSION_SERVICE_PORT)} },
      { name: NOTIFICATION_SERVICE, transport: Transport.TCP, options: { host: process.env.NOTIFICATION_SERVICE_HOST, port: Number(process.env.NOTIFICATION_SERVICE_PORT)} },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
