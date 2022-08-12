import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Board])
  fetchBoard() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput', { nullable: true })
    createBoardInput: CreateBoardInput,
  ) {
    // 1. redis 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0, // 무제한
    });
    // 2. redis 캐시에서 조회하는 연습
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);
    return '지금은 캐시 테스트 중!!!!!!';
    // 레디스 확인을 위해 잠시 주석
    // return this.boardService.create({ createBoardInput });
  }
}
