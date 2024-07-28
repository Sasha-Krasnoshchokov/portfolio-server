import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import techStackList from 'src/data/techStackList';
import { put } from '@vercel/blob';
import { list } from '@vercel/blob';

@Injectable()
export class TechStackService {
  async getFile() {
    const response = await list();
    console.log({ response });
    return 'Failed to save file';
  }
  async saveFile(file: Express.Multer.File) {
    const blob = await put(file.originalname, file.buffer, {
      access: 'public',
    });
    if (!blob) {
      return 'Failed to save file';
    }
    return blob;
  }

  async create(createTechStackDto: CreateTechStackDto) {
    if (techStackList.find((item) => item.id === createTechStackDto.id || item.title === createTechStackDto.title)) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST, {
        cause: `The ${createTechStackDto.title} technology is exist!`,
      });
    }

    const newStack = new CreateTechStackDto(createTechStackDto);
    if (newStack) {
      techStackList.push(newStack);
      return {
        message: 'New tech stack created successfully',
        body: newStack,
      };
    }
    return 'Failed to create new tech stack';
  }

  findAll() {
    return techStackList;
  }

  findOne(id: string) {
    const currentStack = techStackList.find((item) => item.id === id);
    if (!currentStack) return `Can't find a tech stack with an id: ${id}`;
    return currentStack;
  }

  update(id: string, updateTechStackDto: UpdateTechStackDto) {
    let isUpdated = false;
    techStackList.forEach((item) => {
      if (item.id === id) {
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
    const filteredList = techStackList.filter((item) => item.id !== id);
    if (filteredList.length === techStackList.length) return `Can't remove a tech stack with an id: ${id}`;
    techStackList.length = 0;
    filteredList.forEach((item) => techStackList.push(item));
    return 'Deleted successfully';
  }
}
