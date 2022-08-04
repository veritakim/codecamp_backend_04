import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSalesLocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationepository: Repository<ProductSalesLocation>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['productSalesLocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    console.log(productCategoryId);
    const result = await this.productSalesLocationepository.save({
      ...productSaleslocation,
    });

    result.id;
    // tag 등록하기 ["#전자제품", "#컴퓨터", "#용산"]
    /*
    const result111 = await this.productTagRepository.save({
      name: productTags[0],
    });
    const result222 = await this.productTagRepository.save({
      name: productTags[1],
    });
    const result333 = await this.productTagRepository.save({
      name: productTags[2],
    });
    */
    const result2 = [];
    for (let i = 0; i < productTags.length; i++) {
      // # 없애주기
      const tagname = productTags[i].replace('#', '');

      const prevTag = await this.productTagRepository.findOne({
        where: { name: tagname },
      });
      // 원래 있던 태그라면 그 값을 사용할 수 있게
      if (prevTag) {
        result2.push(prevTag);
        // 기존 태그가 없다면
      } else {
        const newTag = await this.productTagRepository.save({ name: tagname });
        result2.push(newTag);
      }
    }

    const result3 = await this.productRepository.save({
      ...product,
      productSalesLocation: result,
      productCategory: { id: productCategoryId },
      // productTags: [ {id: , name: }, {id: , name: }, {id: , name: } ]
      // productTags: [result111, result222, result333],
      productTags: result2,
    });

    return result3;
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = await this.productRepository.save({
      ...myproduct,
      id: productId, //
      ...updateProductInput,
    });

    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId, //
      },
    });
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
