import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import techStackList from 'src/data/techStackList';
import { del, put } from '@vercel/blob';
import { InjectRepository } from '@nestjs/typeorm';
import { TechStack } from './entities/tech-stack.entity';
import { Repository } from 'typeorm';
// import PostgresQl from 'src/postgresdb/postgresQL';

@Injectable()
export class TechStackService {
  constructor(
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
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

  async create(createTechStackDto: CreateTechStackDto) {
    const badRequestException = (cause: string) => {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST, { cause });
    };
    if (
      techStackList.find(
        (item) => item.stack_id === createTechStackDto.stack_id || item.title === createTechStackDto.title,
      )
    ) {
      badRequestException(`The ${createTechStackDto.title} technology is exist!`);
    }

    const newStack = new CreateTechStackDto(createTechStackDto);
    if (newStack?.stack_id && newStack?.title && newStack?.icon) {
      try {
        const newTechStack = await this.techStackRepository.save(newStack);
        techStackList.push(newTechStack);
        return {
          message: 'The new tech stack created successfully',
          body: newTechStack,
        };
      } catch (error) {
        console.error(error);
        this.deleteFile(JSON.parse(newStack.icon).url ?? '');
        badRequestException(`Failed to create the ${createTechStackDto.title} tech stack!`);
      }
    } else {
      this.deleteFile(JSON.parse(newStack.icon).url ?? '');
      badRequestException(`Failed to create the ${createTechStackDto.title} tech stack!`);
    }
  }

  async findAll() {
    try {
      if (techStackList.length) return techStackList;
      const list = await this.techStackRepository.find();
      list.forEach((item) => techStackList.push(item));
      return list;
    } catch (error) {
      console.error(error);
      throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    const currentStack = techStackList.find((item) => item.stack_id === id);
    if (!currentStack) return `Can't find a tech stack with an id: ${id}`;
    return currentStack;
  }

  update(id: string, updateTechStackDto: UpdateTechStackDto) {
    let isUpdated = false;
    techStackList.forEach((item) => {
      if (item.stack_id === id) {
        item = {
          ...item,
          ...updateTechStackDto,
        };
        isUpdated = true;
      }
    });
    if (!isUpdated) return `Can't update a tech stack with an id: ${id}`;
    return 'Updated successfully';
  }

  remove(id: string) {
    const filteredList = techStackList.filter((item) => item.stack_id !== id);
    if (filteredList.length === techStackList.length) return `Can't remove a tech stack with an id: ${id}`;
    techStackList.length = 0;
    filteredList.forEach((item) => techStackList.push(item));
    return 'Deleted successfully';
  }
}
