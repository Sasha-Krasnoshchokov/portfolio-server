import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Repository } from 'typeorm';
import { del, put } from '@vercel/blob';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
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

  async updateResumeSelectedStatus() {
    await this.resumeRepository.createQueryBuilder().update('resume').set({ is_selected: false }).execute();
  }

  async create(createResumeDto: CreateResumeDto) {
    if (!createResumeDto.summary || !createResumeDto.resume_file) {
      console.error('Invalid incoming data!', createResumeDto);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }
    await this.updateResumeSelectedStatus();

    const newResume = new CreateResumeDto(createResumeDto);
    if (!newResume.resume_id || !newResume.summary || !newResume.resume_file) {
      console.error('Failed to create a new instance!', newResume);
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    try {
      const newDataDb = await this.resumeRepository.save(newResume);
      return {
        message: 'The new resume added successfully',
        body: newDataDb,
      };
    } catch (error) {
      console.error(error);
      this.deleteFile(JSON.parse(newResume.resume_file).url ?? '');
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    let option: { [key: string]: string | boolean } | null = null;
    if (id === 'selected' || id === 'summary') {
      // return the resume with the status - is_selected: true
      option = { is_selected: true };
    } else {
      option = { resume_id: id };
    }
    try {
      const selectedResume = await this.resumeRepository.find({
        where: option,
      });
      if (!selectedResume) {
        console.error("Can't get the resume from the DB!");
        throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (id === 'selected') {
        return selectedResume.map((item) => item.resume_file);
      } else if (id === 'summary') {
        const [summary] = selectedResume.map((item) => item.summary);
        return summary;
      }
      return selectedResume;
    } catch (error) {
      console.error(error);
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // findAll() {
  //   return `This action returns all resume`;
  // }

  // update(id: number, updateResumeDto: UpdateResumeDto) {
  //   return `This action updates a #${id} resume`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} resume`;
  // }
}
