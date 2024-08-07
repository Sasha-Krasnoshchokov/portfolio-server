export class CreatePersonalDatumDto {
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  phone_number: string;
  main_photo: string;
  messengers: string;
  communities: string;
  lang: 'en' | 'uk';

  constructor({ first_name, last_name, address, email, phone_number, main_photo, messengers, communities, lang }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    this.email = email;
    this.phone_number = phone_number;
    this.main_photo = main_photo;
    this.messengers = messengers;
    this.communities = communities;
    this.lang = lang;
  }

  static getDefault() {
    return {
      first_name: 'the username in the current language',
      last_name: 'the user surname in the current language',
      address: 'the user address in the current language',
      email: 'the user email',
      phone_number: 'the user phone number',
      main_photo: 'the blob data is converted to a string using JSON.stringify()',
      messengers: 'the messenger links object was converted to a string using JSON.stringify()',
      communities: 'the community links object was converted to a string using JSON.stringify()',
      lang: 'en | uk',
    };
  }
}
