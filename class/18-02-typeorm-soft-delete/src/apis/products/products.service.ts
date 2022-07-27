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
    const product = await this.productRepository.findOne({
      where: {
        id: productId, //
      },
    });
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // 1. 실제로 삭제하는 방법
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 2. 소프트 삭제 - isDeleted column 사용
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 - deletedAt을 저장
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제 - typeorm에서 제공
    // 5와 다른 점. 아이디로만 삭제 가능
    // this.productRepository.softRemove({ id: productId });

    // 5. 소프트 삭제 -
    // 4와 다른 점 다른 것으로도 삭제 가능 이름으로라던지
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
