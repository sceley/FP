// - a simple example(一个海鸥程序)
// 面向对象的写法
let Flock = function (n) {
    this.seagulls = n;
};
Flock.prototype.conjoin = function (other) {
    this.seagulls += other.seagulls;
    return this;
};
Flock.prototype.breed = function (other) {
    this.seagulls = this.seagulls * other.seagulls;
    return this;
};
let flock_a = new Flock(4);
let flock_b = new Flock(2);
let flock_c = new Flock(0);
let result = flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls;
// console.log(result = flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls);
//=>32
//代码的内部可变状态非常难以追踪，而且，最终的答案还是错的！正确答案是 16，但是因为 flock_a 在运算过程中永久地改变了;
// 更函数式的写法
let conjoin = function (flock_x, flock_y) {
    return flock_x + flock_y;
};
let breed = function (flock_x, flock_y) {
    return flock_x * flock_y;
};
let _flock_a = 4;
let _flock_b = 2;
let _flock_c = 0;
let _result = conjoin(breed(_flock_b, conjoin(_flock_a, _flock_c)), breed(_flock_a, _flock_b));
console.log(_result);
//缺点，代码嵌套太深

//conjoin=>add breed=>multiply
//更语义化
let add = function (flock_x, flock_y) {
    return flock_x + flock_y;
};
let multiply = function (flock_x, flock_y) {
    return flock_x * flock_y;
};
_flock_a = 4;
_flock_b = 2;
_flock_c = 0;
_result = add(multiply(_flock_b, add(_flock_a, _flock_c)), multiply(_flock_a, _flock_b));
console.log(_result);
//函数式编程的数学知识
//结合律(assosiative)
//add(add(x, y), z) == add(x, add(y, z));
//交换律(commutative)
//add(x, y) == add(y, x);
//同一律(identity)
//add(x, 0) == x;
//分配律
//multiply(x, add(y, z)) == add(multiply(x, y), multiply(x, z));

//利用数学定律简化这个海鸥小程序
//原有代码
add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_b, flock_a));
//应用同一律，去掉多余的加法。(add(flock_a, flock_c) == flock_a)
//add(multiply(flock_b, flock_a), multiply(flock_a, flock_b))
//应用分配律
multiply(flock_b, add(flock_a, flock_a));
//这里，简化了代码，你不需要去写一点多余的代码