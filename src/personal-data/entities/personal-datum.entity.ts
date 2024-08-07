import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personal_data')
export class PersonalDatum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  phone_number: string;

  @Column({ type: 'text' })
  main_photo: string;

  @Column({ type: 'text' })
  communities: string;

  @Column({ type: 'text' })
  messengers: string;

  @Column({ type: 'enum', enum: { EN: 'en', UK: 'uk' } })
  lang: 'en' | 'uk';
}
