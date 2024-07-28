import { CreateTechStackDto } from 'src/tech-stack/dto/create-tech-stack.dto';
import { IApi } from 'src/types/appService.type';

const apis = (baseUrl: string): IApi[] => [
  {
    method: 'get',
    baseUrl,
    url: '/apis',
  },
  {
    method: 'get',
    baseUrl,
    url: '/check-connection',
  },
  {
    description: 'to create a new tech stack entity',
    method: 'post',
    baseUrl,
    url: '/tech-stack',
    body: CreateTechStackDto.getDefault(),
  },
  {
    description: 'to upload files',
    method: 'post',
    baseUrl,
    url: '/tech-stack/upload',
    body: 'a data in the FormData format',
  },
  {
    description: 'get the list of the tech stacks',
    method: 'get',
    baseUrl,
    url: '/tech-stack',
  },
  {
    description: 'get the tech stack by id',
    method: 'get',
    baseUrl,
    url: '/tech-stack',
    params: ['/:id'],
  },
  {
    description: 'remove the tech stack by id',
    method: 'delete',
    baseUrl,
    url: '/tech-stack',
    params: ['/:id'],
  },
  {
    description: 'to update an existed tech stack',
    method: 'patch',
    baseUrl,
    url: '/tech-stack',
    params: ['/:id'],
    body: CreateTechStackDto.getDefault(),
  },
];

export default apis;
