import { AppInfoUseCase } from '@application/user-cases/app-info.use-case';
import { Controller, Get } from '@nestjs/common';

@Controller('app-info')
export class AppController {
  constructor(private readonly appInfoUseCase: AppInfoUseCase) {}

  @Get()
  handler() {
    return this.appInfoUseCase.execute();
  }
}
