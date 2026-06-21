import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FileServiceController } from './file-service.controller';
import { FileServiceService } from './file-service.service';

export const PERMISSION_SERVICE = 'PERMISSION_SERVICE';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PERMISSION_SERVICE,
        transport: Transport.TCP,
        options: { host: 'localhost', port: 4008 },
      },
    ]),
  ],
  controllers: [FileServiceController],
  providers: [FileServiceService],
})
export class FileServiceModule {}
