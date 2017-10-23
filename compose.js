let compose = function (g, f) {
    return function (x) {
        return g(f(x));
    };
};
//f和g都是函数，x是在它们之间通过"管道"传输的值。
//组合看起来像是饲养函数。你就是饲养员，选择两个有特点有遭你喜欢的函数。