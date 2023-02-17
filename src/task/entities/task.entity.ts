import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 120, nullable: false })
  title: string;

  @Column({ length: 350 })
  description: string;

  @Column()
  startAt: Date;

  @Column()
  finishAt: Date;

  @Column()
  deadLine: Date;

  //   @ManyToOne(() => Person, (person) => person.tasks)
  //   person: Person;
}
