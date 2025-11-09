import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from '@infra/databases/pg-promise/config.module';
import { AppService } from '@application/app.service';
import { AppRepository } from '@infra/repositries/app.repository';
import { QueueModule } from '@infra/queue/queue.module';

@Module({
  imports: [DatabaseModule, QueueModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'IAppRepository', useClass: AppRepository },
  ],
})
export class Example { }
