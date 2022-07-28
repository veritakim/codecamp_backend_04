import { DateScalarMode, Field, ObjectType } from '@nestjs/graphql';
import { Hamster } from 'src/apis/hamsters/entites/hamster.entity';
import { Payment } from 'src/apis/payments/entites/payment.entity';
import { ProductDescriptions } from 'src/apis/productDescriptions/entities/productDescription.entity';
import { ProductSubCategory } from 'src/apis/productsSubCategories/entities/productSubCategory.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  price: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  expDate: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => ProductSubCategory)
  @Field(() => ProductSubCategory)
  productSubCategory: ProductSubCategory;

  @JoinColumn()
  @OneToOne(() => ProductDescriptions)
  @Field(() => ProductDescriptions)
  productDescription: ProductDescriptions;

  @JoinTable()
  @ManyToMany(() => Hamster, (hamsters) => hamsters.products)
  @Field(() => [Hamster])
  hamsters: Hamster[];
}
