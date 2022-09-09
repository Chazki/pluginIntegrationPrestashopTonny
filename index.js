let fs = require('fs');
let archiver = require('archiver');
let dir = './dist';
let dirCompress = 'integration_chazki';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

let output = fs.createWriteStream(`${dir}/${dirCompress}.zip`);
let archive = archiver('zip');

archive.pipe(output);
archive.directory(`./${dirCompress}`, false);
archive.finalize();