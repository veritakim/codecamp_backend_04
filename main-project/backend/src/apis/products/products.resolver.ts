import {
  CACHE_MANAGER,
  ConsoleLogger,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import e from 'express';
import { identity } from 'rxjs';
import { FilesService } from '../files/files.service';
import { CreateProductInput } from './dto/createProducts.input';
import { UpdateProductInput } from './dto/updateProducts.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

interface IBoard {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productSubCategory: string;
  productDescription: string;
  productsImage: string[];
  expDate: Date;
  deletedAt: Date;
  updatedAt: Date;
}

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
    // redis search
    const redisResult = await this.cacheManager.get(search);
    console.log(redisResult);

    if (redisResult !== null && redisResult !== []) {
      return redisResult;
    }

    try {
      // elasticsearch
      // console.log('elastic');
      const elasticArr = [];
      // console.log('dddd');
      const elasticResult = await this.elasticsearchService.search({
        index: 'myproduct1',
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

      // console.log(elasticResult);
      const obj = {};
      if (elasticResult) {
        elasticResult.hits.hits.map(async (el, i) => {
          obj['name'] = el._source['name'];
          obj['id'] = el._source['id'];
          obj['productDescription'] = {
            contents: el._source['productdescription'],
          };
          obj['price'] = el._source['price'];
          obj['quantity'] = el._source['quantity'];
          obj['updatedAt'] = el._source['updatedat'];
          const ddd = { ...obj };
          elasticArr.push(ddd);
        });

        // Redis에 저장시키기
        await this.cacheManager.set(search, elasticArr, {
          ttl: 100,
        });
        return elasticArr;
      } else {
        return this.productsService.findAll(search);
      }

      // return 해주기
    } catch (error) {
      throw new UnprocessableEntityException('null');
    }
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

  /*
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
  */

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
