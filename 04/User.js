/**
 * Created by easterCat on 2017/9/6.
 */

function User(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.enter = () => {
        console.log("user的图书馆");
    };
}

module.exports = User;
