import { v4 as uuidv4 } from 'uuid';

export class CreateTechStackDto {
  stack_id: string;
  title: string;
  description: string;
  source_link: string;
  icon: string;

  constructor({ stack_id, title = '', description = '', source_link = '', icon = '' }) {
    this.stack_id = stack_id || uuidv4();
    this.description = description;
    this.icon = icon;
    this.title = title;
    this.source_link = source_link;
  }

  static getDefault() {
    return {
      stack_id: 'uuid4 format or an empty string',
      title: 'short title',
      description: 'some description about tech stack',
      source_link: 'a reference to the stack source',
      icon: 'a blob data is converted to a string using JSON.stringify()',
    };
  }
}
