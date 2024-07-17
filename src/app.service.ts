import { Injectable } from '@nestjs/common';
import { IApi } from './types/appService.type';

@Injectable()
export class AppService {
  getCheckConnection(): string {
    console.log('Check connection');
    return 'You are connected to the server!';
  }
  getApis(): IApi[] {
    return [
      {
        method: 'get',
        baseUrl: '',
        url: '/apis',
      },
    ];
  }
}
