/**
 * Created by easterCat on 2017/9/6.
 */
let User = require("./User");

function Teacher(id, name, age) {
    User.apply(this, [id, name, age]);
    this.teach = response => {
        response.write(`${this.name}在讲课,今年${this.age}岁了`);
    };
}
module.exports = Teacher;
