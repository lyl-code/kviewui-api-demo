import { HttpException, HttpStatus } from "@nestjs/common";

export class FileException extends HttpException {
    constructor(errcode: number, errmsg: string) {
        super({ errcode, errmsg }, HttpStatus.OK);
    }
}