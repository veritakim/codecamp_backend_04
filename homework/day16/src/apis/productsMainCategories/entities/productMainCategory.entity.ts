import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductMainCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
