import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('budget')
class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expense: string;

  @Column('float')
  value: number;

  @Column('timestamp with time zone')
  payday: Date;

  @Column()
  observation: string;
}

export default Budget;
