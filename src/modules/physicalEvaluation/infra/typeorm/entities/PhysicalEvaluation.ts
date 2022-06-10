import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Student from '@modules/student/infra/typeorm/entities/Student';

@Entity('physicalEvaluation')
class PhysicalEvaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  fatMass: number;

  @Column('float')
  leanMass: number;

  @Column('float')
  muscleMass: number;

  @Column('float')
  boneDensity: number;

  @Column('float')
  visceralFat: number;

  @Column('float')
  basalMetabolism: number;

  @Column('float')
  hydration: number;

  @Column()
  studentId: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student;
}

export default PhysicalEvaluation;
