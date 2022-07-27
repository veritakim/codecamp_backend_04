import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Today } from 'src/commons/utils/today';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly product: Repository<Product>,
  ) {}

  async createproduct({ createProductInput }) {
    const today = Today();
    console.log(today);
    const result = await this.product.save(
      createProductInput, //
    );

    return result;
  }

  async checkExpPeriod({ productId }) {
    const result = await this.product.findOne({ where: { id: productId } });
    // const dd = result.expDate.split('-').join('').substring(0, 8);
    const dd = result.expDate;
    // console.log(dd);
    const today = Today();

    if (Number(dd) < Number(today)) {
      throw new UnprocessableEntityException('유통기한이 넘은 상품입니다.');
    }
  }

  async updateProduct({ productId, updateProductInput }) {
    const myproduct = await this.product.findOne({
      where: { id: productId },
    });

    const result = await this.product.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });

    return result;
  }

  findAll() {
    return this.product.find();
  }

  findOne({ productId }) {
    return this.product.findOne({
      where: { id: productId }, //
    });
  }
}
