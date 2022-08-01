import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hamster } from '../hamsters/entites/hamster.entity';
import { ProductDescriptions } from '../productDescriptions/entities/productDescription.entity';
import { ProductSubCategory } from '../productsSubCategories/entities/productSubCategory.entity';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductDescriptions,
      ProductSubCategory,
      Hamster,
    ]),
  ],
  providers: [
    ProductsService, //
    ProductsResolver,
  ],
})
export class ProductsModule {}
