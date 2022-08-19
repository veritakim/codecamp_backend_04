import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesLocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSalesLocation,
  ['id'],
  InputType,
) {}
