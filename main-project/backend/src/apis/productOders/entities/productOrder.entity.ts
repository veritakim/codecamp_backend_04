import { UseGuards } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Payment } from 'src/apis/payments/entites/payment.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entites/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ProductOrder {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  orderDate: Date;

  @Column()
  @Field(() => String)
  cs: string;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => String)
  orderNumber: string;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Payment)
  @Field(() => Payment)
  payment: Payment;
}
