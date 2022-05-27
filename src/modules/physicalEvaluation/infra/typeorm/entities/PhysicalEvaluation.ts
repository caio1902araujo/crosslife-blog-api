import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Student from '@modules/student/infra/typeorm/entities/Student';

@Entity('physical_evaluation')
class PhysicalEvaluation{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('float')
  fat_mass: number

  @Column('float')
  lean_mass: number

  @Column('float')
  muscle_mass: number

  @Column('float')
  bone_density: number

  @Column('float')
  visceral_fat: number

  @Column('float')
  basal_metabolism: number

  @Column('float')
  hydration: number

  @Column()
  student_id: string

  @OneToOne(() => Student)
	@JoinColumn({name: 'student_id'})
	student: Student
}

export default PhysicalEvaluation
