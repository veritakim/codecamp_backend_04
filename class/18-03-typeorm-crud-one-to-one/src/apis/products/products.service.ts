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

  async create({ createProductInput }) {
    // 1. 상품만 등록하는 경우
    // const result = await this.productRepository.save({
    //   ...createProductInput,
    // });
    // console.log(result); // {name: "의류"}
    // return result;
    //
    // 2. 상품, 거래위치 같이 등록하는 경우
    // 나누자 스프레드 연산자를 이용해
    // console.log('Ss', createProductInput);
    const { productSaleslocation, ...ss } = createProductInput;
    console.log('ss' + ss);
    // salesLocation 먼저 저장하기
    const result = await this.productSalesLocationepository.save({
      ...productSaleslocation,
    });

    // 이것을 product의 locationId를 넣어주면 된다.
    result.id;

    const result2 = await this.productRepository.save({
      ...ss,
      productSalesLocation: result,
    });

    // result, result2 같이 보내주기
    return result2;
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
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
