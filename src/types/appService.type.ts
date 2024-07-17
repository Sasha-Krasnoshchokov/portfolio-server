export interface IApi {
  method: TMethods;
  baseUrl: string;
  url: string;
  params?: string[];
  body?: string | FormData;
}

export type TMethods = 'get' | 'post' | 'put' | 'delete';
