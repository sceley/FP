let _ = require("lodash");
let abc = function (a, b, c) {
    return [a, b, c];
};
let curried = _.curry(abc);

console.log(curried(1)(2)(3));
console.log(curried(2, 3)(4));
let Person = function (msg) {
    this.msg = msg;
};
Person.prototype.toString = function () {
    return this.msg;
};
let person = new Person('hello world');
console.log(person);
