import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts(
    @Args({ name: 'search', nullable: true }) search: string, //
  ) {
    const redisResult = await this.cacheManager.get(search);
    if (redisResult) console.log('레디스 있음 ', redisResult);

    const elasticResult = await this.elasticsearchService.search({
      index: 'myproduct04',
      query: {
        match: {
          name: search,
        },
      },
    });
    console.log('result', JSON.stringify(elasticResult, null, '  '));
    // return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.findOne({ productId });
  }

  @Query(() => [Product])
  fetchProductsWithDeleted() {
    return this.productsService.findAllwithDeleted();
  }

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
    return this.productsService.updateProduct({
      productId,
      originImage,
      updateProductInput,
    });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }

  @Mutation(() => Boolean)
  restoreProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.restoreDeletedProduct({ productId });
  }
}
