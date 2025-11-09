import { AppService } from '@application/app.service';
import { Controller, Get } from '@nestjs/common';

@Controller('app-info')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  handler() {
    return this.appService.execute();
  }
}
