import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('authors')
class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  description: string;

  @Column()
  @Exclude()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 'firebase':
        return `https://storage.googleapis.com/${process.env.BUCKET}/authors/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default Author;
