/**
 * Created by easterCat on 2017/11/7.
 */


const methods = require('./methods');
const _ = require('lodash');

/**
 * 将repo里面的方法挂载到传入的Schema上
 * @param  {[type]} Schema [description]
 * @return {[type]}        [description]
 */
module.exports = (Schema) => {
    let bindObj = {Schema};
    _.forEach(_.keysIn(methods),(key)=>{
        bindObj[key] =  _.partial(methods[key],Schema);
    });
    return bindObj;
};