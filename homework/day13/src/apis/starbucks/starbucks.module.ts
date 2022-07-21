import { Module } from '@nestjs/common';
import { StarbucksResolver } from './starbucks.resolver';
import { StarBuckService } from './starbucks.service';

@Module({
  // controllers: [AppController],
  providers: [StarBuckService, StarbucksResolver],
})
export class StarbucksModule {}
