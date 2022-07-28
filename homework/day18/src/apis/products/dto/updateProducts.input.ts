import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProducts.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
