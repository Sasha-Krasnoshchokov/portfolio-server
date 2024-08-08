import { v4 as uuidv4 } from 'uuid';

export class CreateFileDto {
  file_id?: string;
  group_of_data: string;
  file?: Express.Multer.File;
  blob_data?: string;

  constructor({ group_of_data, blob_data = '' }) {
    this.file_id = uuidv4();
    this.group_of_data = group_of_data;
    this.blob_data = blob_data;
  }

  static getDefault() {
    return {
      file_id: 'uuid4 format or an empty string',
      group_of_data: 'short description about expiries',
      file: 'buffer data in the formdata format',
      blob_data: 'encoded blob data or empty string',
    };
  }
}
