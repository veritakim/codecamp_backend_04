import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entites/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_date: Date;

  @Column()
  cs: string;

  @Column()
  quantity: number;

  @Column()
  order_number: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;
}
