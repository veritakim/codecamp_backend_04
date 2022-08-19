import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productService: ProductsService, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // 엘라스틱서치 조회하기 연습
    const result = await this.elasticsearchService.search({
      // table, collection명
      index: 'myproduct04',
      query: {
        match_all: {},
        // match: {age: 17} 나이가 17인 애들 갖고오기
      },
    });

    console.log('result', JSON.stringify(result, null, '  '));
    // return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    // elasticsearch 등록하기 연습. 연습이후 삭제하기
    /*
    this.elasticsearchService.create({
      index: 'myproduct04',
      id: 'myid1234',
      document: {
        name: '해리포터',
        age: 15,
        school: '호그와트',
        ...createProductInput,
      },
    });
    return '등록완료';
    */
    // elasticsearch등록을 위해 주석
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string, //
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료가 됐는지 확인해보기
    await this.productService.checkSoldout({ productId });

    // 수정가능하면 실행
    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }
}
