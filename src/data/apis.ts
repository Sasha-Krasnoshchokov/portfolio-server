import { CreateResumeDto } from 'src/resume/dto/create-resume.dto';
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
    url: '/tech-stack/id',
  },
  {
    description: 'remove the tech stack by id',
    method: 'delete',
    baseUrl,
    url: '/tech-stack/id',
  },
  {
    description: 'to update an existed tech stack',
    method: 'patch',
    baseUrl,
    url: '/tech-stack/id',
    body: CreateTechStackDto.getDefault(),
  },
  {
    description: 'to create a new resume entity',
    method: 'post',
    baseUrl,
    url: '/resume',
    body: CreateResumeDto.getDefault(),
  },
  {
    description: 'to upload resume file',
    method: 'post',
    baseUrl,
    url: '/resume/upload',
    body: 'a data in the FormData format',
  },
  {
    description: 'get the resume file by id',
    method: 'get',
    baseUrl,
    url: '/resume/id, the type of the id is: string | selected | summary',
  },
  {
    description: 'to upload main photo file',
    method: 'post',
    baseUrl,
    url: '/personal-data/upload',
    body: 'a data in the FormData format',
  },
  {
    description: 'to create and save a new personal data entities',
    method: 'post',
    baseUrl,
    url: '/personal-data',
    body: CreateResumeDto.getDefault(),
  },
  {
    description: 'get the new personal data by lang',
    method: 'get',
    baseUrl,
    url: '/personal-data/:lang',
  },
];

export default apis;
