import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 120, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @CreateDateColumn()
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  // @OneToMany(() => Task, (task) => task.person)
  // tasks: Task[];
}
