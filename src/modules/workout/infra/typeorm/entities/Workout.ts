import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

import Trainer from '@modules/trainer/infra/typeorm/entities/Trainer';

@Entity('workouts')
class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  video_url: string;

  @Column()
  @Exclude()
  cover: string;

  @Expose({ name: 'cover_url' })
  getAvatarUrl(): string | null {
    if (!this.cover) return null;
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.cover}`;
      case 'firebase':
        return `https://storage.googleapis.com/${process.env.BUCKET}/workouts/${this.cover}`;
      default:
        return null;
    }
  }

  @Column()
  trainer_id: string;

  @ManyToOne(() => Trainer)
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainer;
}

export default Workout;
