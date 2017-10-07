//纯净
//纯净=>纯函数
//1.
const z = 10;
function add (x, y) {
    return x + y;
};//纯函数，没有触碰到z变量

//2.
function justTen () {
    return 10;
};//更好的做法是将justTen定义为一个常量

//结论：大多数有用的纯函数都应至少一个参数

//3.
function addNoReturn (x, y) {
    var z = x + y;
};//纯函数，因为它仅仅处理其输入参数，无任何返回值，它是无用的。

//结论: 所有有用的纯函数都应该返回一些东西

function add(x, y) {
    return x + y;
};
console.log(add(1, 2));//print 3
console.log(add(1, 2));//still print 3
console.log(add(1, 2));//will always print 3

//结论: 纯函数对于给定相同的输入，总是产生相同的输入

//纯函数不能修改任何外部变量，以下所有函数都是不纯的
//writeFile(filename);
//updateDatabaseTable(sqlCmd)
//sendAjaxRequest(ajaxRequest)
//openSocket(ipAddress)
//这些所有的函数都有所谓的函数副作用

//纯函数
let arr = [1, 2, 3, 4, 5];
Array.slice//没有副作用,对于固定的输入，输入总是固定
arr.slice(0, 3);
//=>[1, 2, 3]
arr.slice(0, 3);
//=>[1, 2, 3]
//不纯函数
Array.splice//不纯，它有副作用，对于固定的输入，输出不是固定的
//这不是函数式
arr.splice(0, 3);
//=>[1, 2, 3]
arr.splice(0, 3);
//=>[4, 5]
arr.splice(0, 3);
//=>[]


//结论: 纯函数没有函数副作用

//在函数式编程中，你不仅仅编写纯函数
//函数式编程，不能消除函数副作用，目标是减少不纯净代码的数量并将它们和我们程序中的其他部分隔离


