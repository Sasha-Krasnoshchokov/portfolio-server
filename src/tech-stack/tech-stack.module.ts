import { Module } from '@nestjs/common';
import { TechStackService } from './tech-stack.service';
import { TechStackController } from './tech-stack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechStack } from './entities/tech-stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechStack])],
  controllers: [TechStackController],
  providers: [TechStackService],
  exports: [TypeOrmModule],
})
export class TechStackModule {}
