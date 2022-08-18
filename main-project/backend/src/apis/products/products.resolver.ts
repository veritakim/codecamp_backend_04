import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import e from 'express';
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
    // console.log('search', search);
    const redisResult = await this.cacheManager.get(search);
    console.log(redisResult);
    if (redisResult) return redisResult;
    try {
      const elasticResult = await this.elasticsearchService.search({
        index: 'products',
        query: {
          bool: {
            must: [
              {
                term: {
                  name: search,
                },
              },
            ],
            must_not: {
              exists: {
                field: 'deletedat',
              },
            },
          },
        },
      });
      console.log('result', JSON.stringify(elasticResult, null, '  '));
    } catch (error) {
      throw new UnprocessableEntityException('null');
    }
    return this.productsService.findAll();
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
