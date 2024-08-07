import { Module } from '@nestjs/common';
import { PersonalDataService } from './personal-data.service';
import { PersonalDataController } from './personal-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalDatum } from './entities/personal-datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalDatum])],
  controllers: [PersonalDataController],
  providers: [PersonalDataService],
  exports: [TypeOrmModule],
})
export class PersonalDataModule {}
