import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import PhysicalEvaluation from '@modules/physicalEvaluation/infra/typeorm/entities/PhysicalEvaluation';
import Matriculation from '@modules/matriculation/infra/typeorm/entities/Matriculation';

@Entity('student')
class Student{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  telephone: string

  @Column()
  cpf:string

  @Column()
  username: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 'firebase':
        return `https://storage.googleapis.com/${process.env.BUCKET}/students/${this.avatar}`
      default:
        return null;
    }
  }

  @OneToOne(() => PhysicalEvaluation, physicalEvaluations => physicalEvaluations.student, {cascade:['insert']})
  @Exclude()
  physicalEvaluation: PhysicalEvaluation

  @OneToOne(() => Matriculation, matriculation => matriculation.student, {cascade:['insert']})
  @Exclude()
  matriculation: Matriculation
}

export default Student
