import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductsImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  @Column({ nullable: true })
  isMain: boolean;

  @ManyToOne(() => Product, (product) => product.productsImage)
  product: Product;
}
