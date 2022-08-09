import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsImage } from '../productIsmages/entities/productsImage.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(ProductsImage)
    private readonly productsImage: Repository<ProductsImage>,
  ) {}
  async productImageUpload({ files }) {
    console.log(files);

    const waitedFiles = await Promise.all(files);
    // console.log(waitedFiles);

    const storage = new Storage({
      projectId: 'united-blend-358105',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('codecamp-be04-storage');

    const bucket = 'codecamp-be04-storage';

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(
                storage.file(el.filename).createWriteStream(), //
              )
              .on('finish', () => resolve(`${bucket}/${el.filename}`)) // 성공하면 성공
              .on('error', () => reject('실패'));
          }),
      ),
    );
    console.log('result', results);
    return results;
  }

  async findImages({ productId }) {
    const productImages = await this.productsImage.find({
      where: { product: { id: productId } },
    });

    return productImages;
  }

  // createImages() {}
}
