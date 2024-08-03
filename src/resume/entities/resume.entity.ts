import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('resume')
export class Resume {
  @PrimaryColumn({ unique: true })
  resume_id: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text' })
  resume_file: string;

  @Column({ type: 'text' })
  last_updated: string;

  @Column({ type: 'boolean' })
  is_selected: boolean;
}
