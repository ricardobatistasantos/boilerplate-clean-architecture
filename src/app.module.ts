import { Module } from '@nestjs/common';
import { ExampleModule } from './presentation/app-module/example.module';

@Module({
  imports: [ExampleModule],
})
export class AppModule {}
