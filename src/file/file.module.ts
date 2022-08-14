import { HttpStatus, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';
import dayjs = require('dayjs');
import * as nuid from 'nuid';
import { autoCreateDir } from 'src/utils/utils';
import { FileException } from './file.exception';
import { ConfigModule } from '@nestjs/config';

const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];

@Module({
    imports: [
        ConfigModule.forRoot(),
        // MulterModule.register({
        //     storage: diskStorage({
        //         // 配置文件上传后的文件夹路径
        //         // destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
        //         destination: (req, file, callback) => {
        //             // 根据上传的文件类型将图片视频音频和其他类型文件分别存放
        //             const mimeType = file.mimetype.split('/')[1];
        //             let temp = 'other';
        //             image.filter(item => item === mimeType).length > 0
        //                 ? (temp = 'image')
        //                 :  '';
        //             video.filter(item => item === mimeType).length > 0
        //                 ? (temp = 'video')
        //                 : '';
        //             audio.filter(item => item === mimeType).length > 0
        //                 ? (temp = 'audio')
        //                 : '';
        //             const filePath = `dist/public/uploads/${temp}/${dayjs().format(
        //                 'YYYY-MM-DD',
        //             )}`;
        //             autoCreateDir(filePath); // 自动创建文件夹
        //             return callback(null, `${filePath}`);
        //         },
        //         filename: (req, file, callback) => {
        //             // 自定义保存的文件名称
        //             const fileType = file.originalname.split('.');
        //             const filename = `${nuid.next()}.${fileType[fileType.length - 1]}`;
        //             return callback(null, filename);
        //         }
        //     }),
        //     fileFilter: (req, file, callback) => {
        //         const mimeType = file.mimetype.split('/')[1].toLowerCase();
        //         let temp = 'other';
        //         image.filter(item => item === mimeType).length > 0
        //             ? (temp = 'image')
        //             : '';
        //         video.filter(item => item === mimeType).length > 0
        //             ? (temp = 'video')
        //             : '';
        //         audio.filter(item => item === mimeType).length > 0
        //             ? (temp = 'audio')
        //             : '';
        //         if (temp === 'other') {
        //             return callback(new FileException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, 'Unknown media type'), false);
        //         }
        //         return callback(null, true);
        //     }
        // })
    ],
    controllers: [UploadController],
    providers: [UploadService]
})
export class FileModule {}
