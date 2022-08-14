import * as fs from 'fs';

export const autoCreateDir = filePath => {
    const pathArr = filePath.split('/');
    let checkPath = '.';
    let item: string;
    for (item of pathArr) {
        checkPath += `/${item}`;
        if (!fs.existsSync(checkPath)) {
            fs.mkdirSync(checkPath);
        }
    }
};

export const success = (data: any) => {
    return {
        errcode: 0,
        data
    }
}