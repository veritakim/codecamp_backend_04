import { InputType, OmitType } from '@nestjs/graphql';
import { ProductDescriptions } from '../entities/productDescription.entity';

@InputType()
export class ProductDescriptionsInput extends OmitType(
  ProductDescriptions,
  ['id'],
  InputType,
) {}
