export interface IUploadFileBody {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: any;
}
export interface IApi {
  method: TMethods;
  baseUrl: string;
  url: string;
  params?: string[];
  body?: string | FormData | any;
  description?: string;
}

export type TMethods = 'get' | 'post' | 'patch' | 'delete';
