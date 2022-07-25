import { User } from 'src/apis/users/entites/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  address_detail: string;

  @Column()
  zip_code: string;

  @ManyToOne(() => User)
  user: User;
}
