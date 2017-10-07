//不可变性
let x = 1;
x = x + 1;
//函数式编程中 x = x + 1是非法的

//结论: 函数式编程中没有变量

//Elm版本的常量示例，Elm是一个用于Web开发的函数式语言
// addOneToSum y z = 
//     let 
//         x = 1
//     in 
//         x + y + z

//结论: 函数式编程通过递归实现循环

//两种实现循环的方式

//simple loop construct
let acc = 0;
for(let i = 0; i < 10; i++) {
    acc += i;

}
console.log(acc);
//without loop construct or variables (recursion)
function sumRange (start, end, acc) {
    if (start > end)
        return acc;
    return sumRange(start + 1, end, acc + start);
};
console.log(sumRange(1, 10, 0));
//递归实现循环

//Elm 实现
// sumRange start end acc = 
//     if(start > end) then
//         acc
//     else
//         sumRange (start + 1) end (acc + start)

//不可修改性的好处，实现只读性

//不可变性创建了更简单更安全的代码