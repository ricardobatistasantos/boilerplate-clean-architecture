import { AppService } from '@application/app.service';
import { Controller, Get } from '@nestjs/common';
import { App } from '@domain/entities/app';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  handler(): Promise<App> {
    return this.appService.execute();
  }
}
