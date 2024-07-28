import { Injectable } from '@nestjs/common';
import { IApi } from './types/appService.type';
import apis from './data/apis';

@Injectable()
export class AppService {
  private baseUrl = process.env.ENV === 'dev' ? process.env.BASE_URL_DEV : process.env.BASE_URL;

  getCheckConnection(): string {
    console.log('Check connection');
    return `You've connected to the server!`;
  }
  getApis(): IApi[] {
    console.log('this.configService.get<string>', this.baseUrl);
    return apis(this.baseUrl);
  }
}
