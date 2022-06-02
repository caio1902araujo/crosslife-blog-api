import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory')
class Inventory{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  product: string

  @Column('int')
  quantity: number

  @Column()
  note: string
}

export default Inventory;
