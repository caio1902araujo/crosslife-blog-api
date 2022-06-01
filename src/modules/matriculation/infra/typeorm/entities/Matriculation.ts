import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import Student from '@modules/student/infra/typeorm/entities/Student';

@Entity('matriculation')
class Matriculation{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('boolean')
  active: boolean

  @Column()
  type: string

  @CreateDateColumn()
	created_at: Date

  @Column('timestamp with time zone')
  finished_at: Date

  @Column()
  student_id: string

  @OneToOne(() => Student)
	@JoinColumn({name: 'student_id'})
	student: Student
}

export default Matriculation
