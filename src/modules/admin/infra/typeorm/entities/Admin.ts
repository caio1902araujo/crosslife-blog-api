import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
class Admin{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  password: string
}

export default Admin
