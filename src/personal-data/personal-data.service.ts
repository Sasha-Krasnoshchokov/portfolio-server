import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonalDatumDto } from './dto/create-personal-datum.dto';
import { UpdatePersonalDatumDto } from './dto/update-personal-datum.dto';
import { PersonalDatum } from './entities/personal-datum.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { del, put } from '@vercel/blob';

@Injectable()
export class PersonalDataService {
  constructor(
    @InjectRepository(PersonalDatum)
    private readonly personalDatumRepository: Repository<PersonalDatum>,
  ) {}

  async saveFile(file: Express.Multer.File) {
    const blob = await put(file.originalname, file.buffer, {
      access: 'public',
    });
    if (!blob) {
      return 'Failed to save file';
    }
    return blob;
  }
  async deleteFile(url: string) {
    if (!url) return false;
    await del(url);
    return true;
  }

  async create(createPersonalDatumDto: CreatePersonalDatumDto) {
    const defaultPersonalData = CreatePersonalDatumDto.getDefault();
    const isValidIncomingData = !Object.keys(defaultPersonalData).some((key) => !createPersonalDatumDto[key]);
    if (!isValidIncomingData) {
      console.error('Invalid incoming data!', createPersonalDatumDto);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    try {
      const langPersonalDataDb = await this.personalDatumRepository.save({
        first_name: createPersonalDatumDto.first_name,
        last_name: createPersonalDatumDto.last_name,
        address: createPersonalDatumDto.address,
        phone_number: createPersonalDatumDto.phone_number,
        main_photo: createPersonalDatumDto.main_photo,
        communities: createPersonalDatumDto.communities,
        messengers: createPersonalDatumDto.messengers,
        email: createPersonalDatumDto.email,
        lang: createPersonalDatumDto.lang,
      });

      return {
        message: 'The new personal data added successfully',
        body: langPersonalDataDb,
      };
    } catch (error) {
      console.error(error);
      this.deleteFile(JSON.parse(createPersonalDatumDto.main_photo).url ?? '');
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(lang: 'en' | 'uk') {
    try {
      const langPersonalData = await this.personalDatumRepository.find({
        where: { lang },
      });
      if (!langPersonalData?.length) {
        console.error("Can't get the personal data from the DB!");
        throw new Error();
      }

      return langPersonalData[0];
    } catch (error) {
      console.error(error);
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updatePersonalDatumDto: UpdatePersonalDatumDto) {
    console.log({ updatePersonalDatumDto });
    return `This action updates a #${id} personalDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalDatum`;
  }
}
