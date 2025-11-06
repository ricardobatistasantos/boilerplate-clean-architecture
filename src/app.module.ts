import { Module } from '@nestjs/common';
import { Example } from './presentation/app-module/example.module';

@Module({
  imports: [Example],
})
export class AppModule {}
