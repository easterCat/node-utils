/**
 * Created by easterCat on 2017/9/11.
 */

let fs = require('fs');

module.exports = {
    readImg: (path, response) => {
        fs.readFile(path, 'binary', (err, file) => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                console.log('输出文件');
                response.write(file, 'binary');
                response.end();
            }
        })
    },
    readFile: (path, recall) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                recall(data.toString());
            }
        });
        console.log('异步读取文件完毕');
    },
    readfileSync: (path, recall) => {
        let data = fs.readFileSync(path, 'utf-8');
        console.log(data);
        console.log('同步方法读取完毕');
        recall(data.toString());
    }
};