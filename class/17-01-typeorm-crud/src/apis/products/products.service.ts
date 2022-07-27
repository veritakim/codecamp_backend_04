import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  findOne({ productId }) {
    return this.productRepository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    // 디비에 카테고리 등록
    const result = await this.productRepository.save({
      ...createProductInput,

      // name: createProductInput.name,
      // price: createProductInput.price,
      // description: createProductInput.description,
    });
    console.log(result); // {name: "의류"}

    return result;
  }

  async update({ productId, updateProductInput }) {
    // await this.productRepository.update(
    //   { id: productId }, //
    //   { ...updateProductInput },
    // );

    // const result = await this.productRepository.findOne()

    // updateInput에 price가 없다면 name과 description만 들어간다. 그 전의 것들도 있어야하니까
    // 데이터를 갖고온다.
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
    try {
      const product = await this.productRepository.findOne({
        where: {
          id: productId, //
        },
      });
      if (product.isSoldout) {
        throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
        return false;
      } else return true;
    } catch (error) {
      console.log(error);
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
