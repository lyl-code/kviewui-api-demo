import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
    @Get('info')
    findAll(@Res({passthrough: true}) res: Response) {
        res.status(HttpStatus.OK);
        return [];
    }
}
