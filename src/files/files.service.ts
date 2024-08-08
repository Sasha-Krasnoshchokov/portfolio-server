import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { del, put } from '@vercel/blob';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto) {
    try {
      const { group_of_data, file } = createFileDto;
      const blob = await put(file.originalname, file.buffer, {
        access: 'public',
      });
      if (!blob) throw new Error(`Failed to save file ${file.originalname} to Blob storage`);

      const fileDto = new CreateFileDto({
        group_of_data,
        blob_data: btoa(JSON.stringify(blob)),
      });
      const newDataDb = await this.fileRepository.save(fileDto);
      if (!newDataDb) {
        await del(blob.url);
        throw new Error(`Failed to add file ${file.originalname} to the DB`);
      }

      return {
        message: `File ${group_of_data} added successfully`,
        body: newDataDb,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(group_of_data?: string) {
    try {
      console.log({ group_of_data });
      const filter = group_of_data ? { where: { group_of_data } } : {};
      const selectedFiles = await this.fileRepository.find(filter);
      if (!selectedFiles?.length) {
        throw new Error(`Unable to get files from DB by  parameter: ${group_of_data}`);
      }
      return {
        message: `Found successfully`,
        body: selectedFiles,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(file_id: string) {
    try {
      const selectedFiles = await this.fileRepository.find({
        where: { file_id },
      });
      if (!selectedFiles?.length) {
        throw new Error(`Unable to get the file from DB by parameter: ${file_id}`);
      }
      return {
        message: `Found successfully`,
        body: selectedFiles[0],
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(file_id: string) {
    try {
      const selectedFiles = await this.fileRepository.find({
        where: { file_id },
      });
      if (!selectedFiles?.length) {
        throw new Error(`Unable to get the file from DB by parameter: ${file_id}`);
      }
      const fileUrl = JSON.parse(atob(selectedFiles[0].blob_data)).url;
      if (!fileUrl) {
        throw new Error(`Wrong blob data`);
      }
      await del(fileUrl);
      const deleteResult = await this.fileRepository.delete(file_id);
      if (!deleteResult) {
        throw new Error(`Unable to delete the file ${file_id}`);
      }
      return {
        message: `Delete successfully`,
        body: null,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
