import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Today } from 'src/commons/utils/today';
import { IsNull, Not, Repository } from 'typeorm';
import { ProductDescriptions } from '../productDescriptions/entities/productDescription.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDescriptions)
    private readonly productDescriptionRepository: Repository<ProductDescriptions>,
  ) {}

  async createproduct({ createProductInput }) {
    const today = Today();

    const { expDate, description, productSubCategory, ...rest } =
      createProductInput;

    const newExpDate = expDate.split('-').join('').substring(0, 8);
    if (newExpDate < today) {
      throw new UnprocessableEntityException('유통기한이 지난 상품입니다.');
    }

    // description 먼저 등록하기
    const desc = await this.productDescriptionRepository.save({
      ...description,
    });

    // console.log(desc);
    const result = await this.productRepository.save({
      ...rest,
      productDescription: desc,
      expDate: newExpDate,
      productSubCategory: productSubCategory,
    });

    return result;
  }

  async checkIsSoldout({ productId }) {
    const result = await this.productRepository.findOne({
      where: { id: productId },
    });
    // const dd = result.expDate.split('-').join('').substring(0, 8);
    const isSoldout = result.isSoldout;

    if (isSoldout) {
      throw new UnprocessableEntityException('판매 완료된 상품입니다.');
    }
  }

  async updateProduct({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = await this.productRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });

    return result;
  }

  findAll() {
    return this.productRepository.find({
      relations: ['productDescription', 'productSubCategory'],
    });
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId }, //
      relations: ['productDescription', 'productSubCategory'],
    });
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async findDeletedAll() {
    return await this.productRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  }

  async restoreDeletedProduct({ productId }) {
    await this.productRepository.restore({
      id: productId,
    });

    return true;
  }
}
