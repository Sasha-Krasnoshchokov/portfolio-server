import { v4 as uuidv4 } from 'uuid';

export class CreateTechStackDto {
  id: string;
  title: string;
  description: string;
  sourceLink: string;
  icon: string;

  constructor({ id, title = '', description = '', sourceLink = '', icon = '' }) {
    this.id = id || uuidv4();
    this.description = description;
    this.icon = icon;
    this.title = title;
    this.sourceLink = sourceLink;
  }

  static getDefault() {
    return {
      id: 'uuid4 format or an empty string',
      title: 'short title',
      description: 'some description about tech stack',
      sourceLink: 'a reference to the stack source',
      icon: 'a blob data is converted to a string using JSON.stringify()',
    };
  }
}
