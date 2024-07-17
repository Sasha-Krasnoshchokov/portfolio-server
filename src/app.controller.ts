import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IApi } from './types/appService.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/check-connection')
  getCheckConnection(): string {
    return this.appService.getCheckConnection();
  }

  @Get('/apis')
  getApis(): IApi[] {
    return this.appService.getApis();
  }
}
