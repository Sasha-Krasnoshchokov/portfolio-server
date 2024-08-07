import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TechStackModule } from './tech-stack/tech-stack.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechStack } from './tech-stack/entities/tech-stack.entity';
import { ResumeModule } from './resume/resume.module';
import { Resume } from './resume/entities/resume.entity';
import { PersonalDataModule } from './personal-data/personal-data.module';
import { PersonalDatum } from './personal-data/entities/personal-datum.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        url: configService.get('POSTGRES_URL'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [TechStack, Resume, PersonalDatum],
        autoLoadEntities: true,
        synchronize: true, // Be cautious about using synchronize in production
        // entities: [__dirname + '/../**/*.entity.{js,ts}'],
        // logging: true, // typeorm prints all info to the console
      }),
      inject: [ConfigService],
    }),
    TechStackModule,
    ResumeModule,
    PersonalDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
