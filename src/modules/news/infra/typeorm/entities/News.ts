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
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Exclude()
  cover: string;

  @Expose({ name: 'coverUrl' })
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
  @Exclude()
  authorId: string;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'authorId' })
  author: Author;
}

export default News;
