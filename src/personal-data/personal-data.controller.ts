import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PersonalDataService } from './personal-data.service';
import { CreatePersonalDatumDto } from './dto/create-personal-datum.dto';
import { UpdatePersonalDatumDto } from './dto/update-personal-datum.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('personal-data')
export class PersonalDataController {
  constructor(private readonly personalDataService: PersonalDataService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.personalDataService.saveFile(file);
  }

  @Post()
  create(@Body() createPersonalDatumDto: CreatePersonalDatumDto) {
    return this.personalDataService.create(createPersonalDatumDto);
  }

  @Get(':lang')
  findOne(@Param('lang') lang: 'en' | 'uk') {
    return this.personalDataService.findOne(lang);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalDatumDto: UpdatePersonalDatumDto) {
    return this.personalDataService.update(+id, updatePersonalDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalDataService.remove(+id);
  }
}
