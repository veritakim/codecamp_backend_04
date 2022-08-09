import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { FilesResolver } from '../files/files.resolver';
import { FilesService } from '../files/files.service';
import { Hamster } from '../hamsters/entites/hamster.entity';
import { ProductDescriptions } from '../productDescriptions/entities/productDescription.entity';
import { ProductsImage } from '../productIsmages/entities/productsImage.entity';
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
      ProductsImage,
      Hamster,
    ]),
  ],
  providers: [
    ProductsService, //
    ProductsResolver,
    FilesService,
  ],
})
export class ProductsModule {}
