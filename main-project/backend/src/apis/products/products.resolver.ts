import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilesService } from '../files/files.service';
import { CreateProductInput } from './dto/createProducts.input';
import { UpdateProductInput } from './dto/updateProducts.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
    private readonly filesService: FilesService,
  ) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.createproduct({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productsService.checkIsSoldout({ productId });

    const originImage = await this.filesService.findImages({ productId });
    // console.log('DDDDDDD', originImage);
    return this.productsService.updateProduct({
      productId,
      originImage,
      updateProductInput,
    });
  }

  @Query(() => [Product])
  fetchProducts() {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }

  @Query(() => [Product])
  fetchProductsWithDeleted() {
    return this.productsService.findAllwithDeleted();
  }

  @Mutation(() => Boolean)
  restoreProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.restoreDeletedProduct({ productId });
  }
}
