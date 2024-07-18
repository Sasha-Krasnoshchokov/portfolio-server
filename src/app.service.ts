import { Injectable } from '@nestjs/common';
import { IApi } from './types/appService.type';

@Injectable()
export class AppService {
  getCheckConnection(): string {
    console.log('Check connection');
    return `You've connected to the server!`;
  }
  getApis(): IApi[] {
    console.log('this.configService.get<string>', process.env.BASE_URL);
    return [
      {
        method: 'get',
        baseUrl: process.env.BASE_URL,
        url: '/apis',
      },
    ];
  }
}
