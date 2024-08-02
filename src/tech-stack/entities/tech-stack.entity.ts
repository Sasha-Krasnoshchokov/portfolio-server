import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tech_stacks')
export class TechStack {
  @PrimaryColumn({ unique: true })
  stack_id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  source_link: string;

  @Column({ type: 'text' })
  icon: string;
}
