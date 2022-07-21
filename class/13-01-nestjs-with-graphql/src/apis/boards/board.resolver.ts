import { Resolver, Query } from '@nestjs/graphql';
import { BoardService } from './board.service';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => String, { nullable: true })
  getHello(): string {
    return this.boardService.getHello();
  }
}
