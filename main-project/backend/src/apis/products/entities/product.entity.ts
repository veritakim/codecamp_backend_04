import { DateScalarMode, Field, ObjectType } from '@nestjs/graphql';
import { Hamster } from 'src/apis/hamsters/entites/hamster.entity';
import { Payment } from 'src/apis/payments/entites/payment.entity';
import { ProductDescriptions } from 'src/apis/productDescriptions/entities/productDescription.entity';
import { ProductsImage } from 'src/apis/productIsmages/entities/productsImage.entity';
import { ProductSubCategory } from 'src/apis/productsSubCategories/entities/productSubCategory.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'productId' })
  @Field(() => String)
  id: string;

  // @Column()
  // @Field(() => String)
  // productId: string;

  @Column({ unique: true, nullable: true })
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => String)
  price: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  expDate: Date;

  @Column()
  @Field(() => String)
  quantity: number;

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

  @OneToMany(() => ProductsImage, (productImages) => productImages.product)
  @Field(() => [String])
  images: string[];
}
