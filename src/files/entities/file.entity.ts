import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryColumn({ unique: true })
  file_id: string;

  @Column({ type: 'text' })
  group_of_data: string;

  @Column({ type: 'text' })
  blob_data: string;
}
