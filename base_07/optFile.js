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
    }
}