import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductDescriptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contents: string;
}
