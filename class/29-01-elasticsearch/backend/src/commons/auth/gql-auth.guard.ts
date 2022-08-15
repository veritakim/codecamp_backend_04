import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('access') {
  // context는 요청에 관련된 모든 내용이 들어있다
  getRequest(context: ExecutionContext) {
    // 들어온 context를 gql용으로 만들어주기
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
  // context는 요청에 관련된 모든 내용이 들어있다
  getRequest(context: ExecutionContext) {
    // 들어온 context를 gql용으로 만들어주기
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
