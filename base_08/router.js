/**
 * Created by easterCat on 2017/9/11.
 */
let optfile = require('./optFile');

function getRecall(request, response) {
    response.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
    function recall(data) {
        response.write(data);
        response.end('end');
    }
    return recall;
}


module.exports = {
    login: function (request, response) {
        /*
         function  recall(data){
         res.write(data);
         res.end('');//不写则没有http协议尾
         }*/
        recall = getRecall(request, response);
        optfile.readFile('./views/login.html', recall);
    },
    zhuce: function (req, res) {
        /*
         function  recall(data){
         res.write(data);
         res.end('');//不写则没有http协议尾
         }
         */
        recall = getRecall(req, res);
        optfile.readfileSync('./views/zhuce.html', recall);
    },
    writefile: function (req, res) {
        function recall(data) {
            res.write(data);
            res.end('');//不写则没有http协议尾
        }

        optfile.writefile('E:/easterCat_nodejs/base_08/a.txt', '今天阳光灿烂', recall);
    },
    showimg: function (req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        optfile.readImg('C:/Users/Administrator/Desktop/u=905788449,1574547104&fm=214&gp=0.jpg', res);
    }
}
