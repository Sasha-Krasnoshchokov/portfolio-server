import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TechStackModule } from './tech-stack/tech-stack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TechStackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
