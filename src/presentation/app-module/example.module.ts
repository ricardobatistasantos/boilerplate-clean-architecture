import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from '@infra/databases/pg-promise/config.module';
import { AppInfoUseCase } from '@application/user-cases/app-info.use-case';
import { AppRepository } from '@infra/repositries/app.repository';
import { QueueModule } from '@infra/queue/queue.module';

@Module({
  imports: [DatabaseModule, QueueModule],
  controllers: [AppController],
  providers: [
    AppInfoUseCase,
    { provide: 'IAppRepository', useClass: AppRepository },
  ],
})
export class ExampleModule { }
