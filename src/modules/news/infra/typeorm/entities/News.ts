import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

import Author from '@modules/author/infra/typeorm/entities/Author';

@Entity('news')
class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  body: string;

  @Column()
  category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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
        return `https://storage.googleapis.com/${process.env.BUCKET}/news/${this.cover}`;
      default:
        return null;
    }
  }

  @Column()
  author_id: string;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'author_id' })
  author: Author;
}

export default News;
