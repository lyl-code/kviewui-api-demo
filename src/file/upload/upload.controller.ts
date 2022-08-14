import { Controller, HttpStatus, InternalServerErrorException, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { success } from 'src/utils/utils';
import * as qiniu from 'qiniu';
import { FileException } from '../file.exception';
import { URL } from 'url';

@Controller('file/upload')
export class UploadController {
    @Post('add')
    @UseInterceptors(FileInterceptor('file'))
    doTo(@UploadedFile() file: Express.Multer.File, @Res({passthrough: true}) res: Response): any {
        // get token
        const mac = new qiniu.auth.digest.Mac(process.env.QN_AK, process.env.QN_SK);
        const putPolicy = new qiniu.rs.PutPolicy({
            scope: process.env.QN_SCOPE
        });
        const uploadToken = putPolicy.uploadToken(mac);
        // upload
        const formUploader = new qiniu.form_up.FormUploader(
            new qiniu.conf.Config({
                zone: qiniu.zone.Zone_z0
            })
        );

        return new Promise((_res, _rej) => {
            formUploader.put(
                uploadToken,
                `${Date.now()}-${file.originalname}`,
                file.buffer,
                new qiniu.form_up.PutExtra(),
                (respErr, respBody, respInfo) => {
                    if (respErr) {
                        return new FileException(500, respErr.message);
                   }

                    if (respInfo.statusCode === 200) {
                        // 重置成功状态码
                        res.status(HttpStatus.OK);
                        _res(success({
                            url: new URL(respBody.key, process.env.QN_HOST).href
                        }));
                    } else {
                        _rej(new FileException(500, respInfo.message));
                    }
                }
            )
        });
    }
}
