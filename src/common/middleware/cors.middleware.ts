import { HttpCode, HttpException, HttpStatus, Injectable, NestMiddleware, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const isOrigin = (origin: string): boolean => {
  return origin === 'http://127.0.0.1:3000';
}

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`中间件执行了`);
    console.log(req.headers);
    console.log(req.headers.origin);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    // throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    if (isOrigin(req.headers.origin)) {
      console.log('校验通过');
      next();
    } else {
      res.send({code: 400, message: 'BAD_REQUEST'});
    }
  }
}