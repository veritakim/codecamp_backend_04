import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Today } from 'src/commons/utils/today';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { Hamster } from '../hamsters/entites/hamster.entity';
import { ProductDescriptions } from '../productDescriptions/entities/productDescription.entity';
import { ProductsImage } from '../productIsmages/entities/productsImage.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDescriptions)
    private readonly productDescriptionRepository: Repository<ProductDescriptions>,
    @InjectRepository(Hamster)
    private readonly hamsterRepository: Repository<Hamster>,
    @InjectRepository(ProductsImage)
    private readonly productsImageRepository: Repository<ProductsImage>,
    private readonly dataSource: DataSource,
    private readonly fileServies: FilesService,
  ) {}

  async createproduct({ createProductInput }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { images } = createProductInput;
      const today = Today();
      const random = String(Math.round(Math.random() * 10000)).padEnd(5, '2');

      const { expDate, description, productSubCategory, hamsters, ...rest } =
        createProductInput;

      const newExpDate = expDate.split('-').join('').substring(0, 8);
      if (newExpDate < today) {
        throw new UnprocessableEntityException('유통기한이 지난 상품입니다.');
      }

      const desc = await this.productDescriptionRepository.save({
        ...description,
      });

      // n:m hamsters 등록하기
      const hamsterArr = [];
      for (let i = 0; i < hamsters.length; i++) {
        const hamsterName = await this.hamsterRepository.findOne({
          where: { name: hamsters[i] },
        });
        // console.log('ham', hamsterName);

        if (hamsterName) {
          hamsterArr.push(hamsterName);
        } else {
          const newHamster = await this.hamsterRepository.save({
            name: hamsters[i],
          });
          hamsterArr.push(newHamster);
        }
        // console.log('ham', hamsterArr);
      }

      const result = await this.productRepository.save({
        ...rest,
        productId: `FOOD-${random}`,
        productDescription: desc,
        expDate: newExpDate,
        productSubCategory: productSubCategory,
        hamsters: hamsterArr,
      });

      const productId = result.id;
      console.log('productId', productId);

      console.log('images', images);
      images.map(
        async (el) =>
          await this.productsImageRepository.save({
            url: el,
            product: productId,
          }),
      );

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      console.log(error.message);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async checkIsSoldout({ productId }) {
    const result = await this.productRepository.findOne({
      where: { id: productId },
    });
    // const dd = result.expDate.split('-').join('').substring(0, 8);
    const isSoldout = result.quantity;

    if (isSoldout === 0) {
      throw new UnprocessableEntityException('판매 완료된 상품입니다.');
    }
  }

  async updateProduct({ productId, updateProductInput, originImage: files }) {
    const { images } = updateProductInput;
    // console.log('QQQQQQQQQ', originImage[0].url);

    // const updateImage = [];
    await this.productsImageRepository.delete({
      product: { id: productId },
    });

    await this.fileServies.imageDelete({ files });

    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = await this.productRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });

    await Promise.all(
      images.map(
        (el) =>
          new Promise((resolve) => {
            const result = this.productsImageRepository.save({
              url: el,
              product: productId,
            });
            resolve(result);
          }),
      ),
    );

    return result;
  }

  findAll() {
    return this.productRepository.find({
      relations: [
        'productDescription',
        'productSubCategory',
        'hamsters',
        'productsImage',
      ],
    });
  }

  findOne({ productId }) {
    return this.productRepository.findOne({
      where: { id: productId }, //
      relations: ['productDescription', 'productSubCategory', 'hamsters'],
    });
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async findAllwithDeleted() {
    return await this.productRepository.find({
      withDeleted: true,
      // where: { deletedAt: Not(IsNull()) },
      relations: ['productDescription', 'productSubCategory', 'hamsters'],
    });
  }

  async restoreDeletedProduct({ productId }) {
    await this.productRepository.restore({
      id: productId,
    });

    return true;
  }
}
