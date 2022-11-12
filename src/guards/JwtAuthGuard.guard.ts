import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwt_verify } from 'src/common/utils/jwt-utils';
import { promise_tuplify } from 'src/common/utils/promise-utils';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest();
    const { headers } = request;

    const authorization: string = headers['authorization'];

    if (!authorization) {
      return false;
    }

    const token = authorization.split(' ').pop();

    const [decoded, error] = await promise_tuplify(jwt_verify(token));

    if (error) {
      throw new UnauthorizedException(error);
    }

    request.user = decoded;

    return true;
  }
}
