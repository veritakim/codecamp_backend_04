import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSalesLocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationepository: Repository<ProductSalesLocation>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['productSalesLocation', 'productCategory'],
    });
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation', 'productCategory'],
    });
  }

  async create({ createProductInput }) {
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    console.log(productCategoryId);
    const result = await this.productSalesLocationepository.save({
      ...productSaleslocation,
    });

    result.id;

    const result2 = await this.productRepository.save({
      ...product,
      productSalesLocation: result,
      productCategory: { id: productCategoryId },
    });

    return result2;
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
