let fs = require('fs');
let archiver = require('archiver');
let dir = './dist';
let dirCompress = 'integrationchazki';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

let output = fs.createWriteStream(`${dir}/${dirCompress}.zip`);
let archive = archiver('zip');

archive.pipe(output);
archive.directory(`./${dirCompress}`, `${dirCompress}`);
archive.finalize();