import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 120, nullable: false })
  title: string;

  @Column({ length: 350, nullable: true })
  description: string;

  @Column({ type: 'datetime', nullable: false })
  startAt: Date;

  @Column({ type: 'datetime', nullable: true })
  finishAt: Date;

  @Column({ type: 'datetime', nullable: false })
  deadLine: Date;

  @Column()
  personId: number;

  @ManyToOne(() => Person, (person) => person.tasks, { onDelete: 'SET NULL' })
  person: Person;
}
