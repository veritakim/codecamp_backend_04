import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ProductsImage } from '../productIsmages/entities/productsImage.entity';
import { FilesService } from './files.service';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesServise: FilesService, //
  ) {}

  @Mutation(() => [String])
  uploadProductImages(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ) {
    return this.filesServise.productImageUpload({ files });
  }

  // @Query(() => [ProductsImage])
  // async fetchImages(
  //   @Args('productId') productId: string, //
  // ) {
  //   return await this.filesServise.findImages({ productId });
  // }
}
