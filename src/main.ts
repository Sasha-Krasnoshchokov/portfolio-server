import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function server() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const envType = configService.get('ENV');
  console.log('//********************************************//');
  console.log(`// The Server as ${envType} on a port ${port} //`);
  console.log('//____________________________________________//');

  await app.listen(port);
}
server();
