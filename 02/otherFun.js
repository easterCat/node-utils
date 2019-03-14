/**
 * Created by easterCat on 2017/9/6.
 */
// function controller(request, response) {
//     call('hello world', request, response);
//     response.end('函数');
// }
//
// function call(str, request, response) {
//     console.log('welcome');
//     response.write(str);
// }
//
// module.exports  =  controller;

module.exports = {
    controller: (request, response) => {
        console.log("welcome");
        response.write("welcome");
    },
    call: (request, response) => {
        console.log("end");
        response.end("函数");
    }
};
