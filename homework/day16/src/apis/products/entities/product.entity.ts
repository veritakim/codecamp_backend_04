import { Hamster } from 'src/apis/hamsters/entites/hamster.entity';
import { Payment } from 'src/apis/payments/entites/payment.entity';
import { ProductDescriptions } from 'src/apis/productDescriptions/entities/productDescription.entity';
import { ProductSubCategory } from 'src/apis/productsSubCategories/entities/productSubCategory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => ProductSubCategory)
  productSubCategory: ProductSubCategory;

  @JoinColumn()
  @OneToOne(() => ProductDescriptions)
  productDescription: ProductDescriptions;

  @JoinColumn()
  @OneToOne(() => Payment)
  payment: Payment;

  @JoinTable()
  @ManyToMany(() => Hamster, (hamsters) => hamsters.products)
  hamsters: Hamster[];
}
