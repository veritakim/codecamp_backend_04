import { InputType, PickType } from '@nestjs/graphql';
import { ProductSubCategory } from '../entities/productSubCategory.entity';

@InputType()
export class ProductSubCategoryInput extends PickType(
  ProductSubCategory,
  ['id', 'name'],
  InputType,
) {}
