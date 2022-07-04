import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import News from './News';

@Entity('accessCounter')
class AccessCounter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  newsId: string;

  @OneToOne(() => News)
  @JoinColumn({ name: 'newsId' })
  news: News;
}

export default AccessCounter;
