import { v4 as uuidv4 } from 'uuid';

export class CreateResumeDto {
  resume_id: string;
  summary: string;
  resume_file: string; // the blob data is converted to a string using JSON.stringify
  last_updated: string;
  is_selected: boolean;

  constructor({ summary = '', resume_file = '', is_selected = false }) {
    this.resume_id = uuidv4();
    this.summary = summary;
    this.resume_file = resume_file;
    this.last_updated = new Date().toISOString();
    this.is_selected = is_selected;
  }

  static getDefault() {
    return {
      resume_id: 'uuid4 format or an empty string',
      summary: 'short description about expiries',
      resume_file: 'the blob data is converted to a string using JSON.stringify()',
      last_update: 'time in the iso format',
      is_selected: 'determines whether to display the resume or not',
    };
  }
}
