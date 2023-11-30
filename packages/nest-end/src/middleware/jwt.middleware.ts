import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import { jwtConstants } from '../api/auth/constants';
import { tokenError } from '../common/exception';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      next();
      return;
    }
    try {
      // const decodedToken = jwt.verify(token, jwtConstants.secret) as {
      //   sub: string;
      //   nickname: string;
      // };
      // req.user = {
      //   userId: decodedToken.sub,
      //   nickname: decodedToken.nickname,
      // };
    } catch (error) {
      throw new tokenError('token过期或token错误，请重新登录');
    } finally {
      next();
    }
  }
}
