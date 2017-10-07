//let foo = $('#foo');
//foo == document.getElementById('foo');
//=> false
//foo[0] == document.getElementById('foo');
//=> true
//jQuery返回的对象并不是一个原生的对象，而是对原生对象的一种封装
//这种某种意义上就是一个'容器'(但它并不是函数式)

//容器为函数式提供了一层及其强大的外衣，赋予了它们一些很惊艳的特性

//简单的容器
let Container = function (x) {
    this._value = x;
};
Container.of = x => new Container(x);
//试试看
Container.of(1);
console.log(Container.of(1));
//=> Container(1);
Container.of('abcd');
console.log(Container.of('abcd'));
//=> Container('abcd');

Container.prototype.map = function (f) {
    return Container.of(f(this._value));
};

Container.of(3)
    .map(x => x + 1)//=>Container(4)
    .map(x => 'Result is ' + x);//Container('Result is 4')

//链式调用
//第一个Functor(函子)
//如果我们要将普通函数应用到一个被容器包裹的值，我们首先需要定义一个叫Functor的数据类型，在这个数据类型中需要定义如何使用map来应用这个普通的函数

//容器=>拥有惰性求值、错误处理、异步调用等特性
var MayBe = function () {
    this._value = x;
};
MayBe.of = function (x) {
    return new MayBe(x);
};
MayBe.prototype.map = function (f) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(f(this._value));
};
MayBe.prototype.isNothing = function () {
    return (this._value == null || this._value === undefined);
};