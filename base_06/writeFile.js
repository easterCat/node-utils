/**
 * Created by easterCat on 2017/9/11.
 */
let fs = require('fs');

module.exports = {
    writeFile: (path, data) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                throw err;
            }
            console.log('if saved');
        });
    },
    writeFileSync: (path, data) => {
        fs.writeFileSync(path, data);
        console.log('同步写入成功');
    }
}
