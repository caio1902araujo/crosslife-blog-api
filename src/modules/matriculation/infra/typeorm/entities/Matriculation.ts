import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import Student from '@modules/student/infra/typeorm/entities/Student';

@Entity('matriculation')
class Matriculation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  active: boolean;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp with time zone')
  finishedAt: Date;

  @Column()
  studentId: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student;
}

export default Matriculation;
