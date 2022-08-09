import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsImage } from '../productIsmages/entities/productsImage.entity';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsImage, //
    ]),
  ],
  providers: [
    FilesResolver, //
    FilesService,
  ],
})
export class FilesModule {}
