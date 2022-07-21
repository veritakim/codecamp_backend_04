import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { stringify } from 'querystring';
import { CreateStarbucksInput } from './dto/createStarbucks.input';
import { Coffee } from './entites/starbucks.entity';
import { StarBuckService } from './starbucks.service';

@Resolver()
export class StarbucksResolver {
  constructor(private readonly starbucksService: StarBuckService) {}

  @Mutation(() => String)
  createStarbucks(
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ) {
    return this.starbucksService.createCoffee({ createStarbucksInput });
  }

  @Query(() => [Coffee])
  fetchStarbucks() {
    return this.starbucksService.findStarbucks();
  }
}
