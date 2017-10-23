//纯函数的好处
//纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何的副作用。
//比如slice和splice，这两个函数的作用并无二致——但是注意，它们各自的方式却大不相同，但不管怎么说作用还是一样的。
//slice符合纯函数的定义是因为对相同的输入它保证能返回相同的输入。而splice却会嚼烂调用它的的那个数组，然后再吐出来；这就会产生可观察的副作用，即这个数组永久地地被改变了。
let xs = [1, 2, 3, 4, 5];4
//纯的
xs.slice(0, 3);
//=>[1, 2, 3]
xs.slice(0, 3);
//=>[1, 2, 3]
xs.slice(0, 3);
//=>[1, 2, 3];
//不纯的
xs.splice(0, 3);
//=>[1, 2, 3]
xs.splice(0, 3);
//=>[4, 5]
xs.splice(0, 3);
//=>[]
//在函数式编程中，我们讨厌这种会改变数据的笨函数。

//look a exapmle agian
//不纯的
let minimun = 21;
let checkAge = function (age) {
    return age >= minimum;
};
//纯的
let checkAge = function (age) {
    let minimum = 21;
    return age >= minimum;
};
//第一个中，它引入了外部的坏境，从而增加了认识负荷。
//使用纯函数的形式，函数就能做到自给自足。我们也可以让minimum成为一个不可变的(immutable)对象，这样就能保留纯粹性，因为状态不会有变化。
//实现这个效果
let immutableState = Object.freeze({
    minimum: 21
});
//副作用是在计算结果的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互。
//副作用可能包含，但不限于：
//更改文件系统
//往数据库插入记录
//发送一个http请求
//可变数据
//打印/log
//获取用户输入
//DOM查询
//访问系统状态
//概括来讲，只要是跟函数外部环境发生的交互就都是副作用———这一点可能会让你怀疑无副作用编程的可行性。函数式编程的哲学就是假定副作用是造成不正当行为的主要原因。
//八年级数学
//函数是不同数值之间的特殊关系：每一个输入返回且只返回一个输出值。
let toLowerCase = {'A': 'a', 'B': 'b', 'D': 'd', 'E': 'e', 'D': 'd'};
toLowerCase['C'];
//=>"c"
let isPrime = {1:false, 2: true, 3: true, 4: false, 5: true, 6:false};
isPrime[3];
//纯函数就是数学上的函数，而且是函数式编程的全部。使用这些纯函数编程能够带来大量的好处。

//Cacheable

let memorize = function (f) {
    let cache = {};
    return function () {
        let arg_str = JSON.stringify(arguments);
        cache[arg_str] = cache[arg_str] || f.appy(f, arguments);
        return cache[arg_str];
    };
};
let squareNumber = memorize(function (x) {
    return x * x;
});
squareNumber(4);
//=> 16
squareNumber(4);//从缓存中读取输入为4的结果
//=>16
squareNumber(5);
//=>25
squareNumber(5);//从缓存中读取输入值为5的结果
//=>２５

//值得注意的一点是，可以通过延迟执行的方式把不纯的函数转换为纯函数

let pureHttpCall = memorize(function (url, params) {
    return function () {
        return $.getJSON(url, params);
    };
});
//这里有趣的地方在于我们并没有真正发送HTTP请求———只是返回了一个函数，但调用它的时候才会发出请求。
//这个函数之所以有资格成为纯函数，是因为它总是会根据相同的输入返回相同的输出，给定了url和params之后，他就只会返回同一个发送http请求的函数。
//我们的 memoize 函数工作起来没有任何问题，虽然它缓存的并不是 http 请求所返回的结果，而是生成的函数
//我们可以缓存任意一个函数，不管它们看起来多么具有破坏性

//可移植性/自文档化(portable/self-documenting)
//纯函数完全是自给自足，纯函数的依赖很明确，因此更易于观察和理解。

//不纯的

let singup = function (attrs) {
    let user = saveUser(attrs);
    welcomeUser(user);
};
saveUser = function (attrs) {
    let user = Db.save(attrs);
    //...
};
let welcomeUser = function (user) {
    Email(user, ...);
    //...
};

//纯的
let singup = function (Db, Email, attrs) {
    return function () {
        let user = saveUser(Db, attrs);
        welcomeUser(Email, user);
    };
};
let saveUser = function (Db, attrs) {
    //...;
};
let welcomeUser = function (Email, user) {
    //...;
};
//纯函数对于其依赖必须要诚实，这样我们就能知道它的目的
//仅从纯函数版本的 signUp 的签名就可以看出，它将要用到 Db、Email 和 attrs，这在最小程度上给了我们足够多的信

//合理性
let Immutable = require('immutable');
let decrementHp = function (player) {
    return player.set('hp', player.hp - 1);
};
let isSameTeam = function (player1, player2) {
    return player1 - player2;
};
let punch = function (player, target) {
    if(isSameTeam(player, target)) {
        return target;
    }
    else {
        return decrementHp(target);
    }
};
let jobe = Immutable.Map({name: 'Jobe', hp: 20, team: 'red'});
let michael = Immutable.Map({name: 'Michael', hp: 20, team: 'green'});
punch(jobe, michael);
//很多人相信使用纯函数最大的好处是引用透明性（referential transparency）。如果一段代码可以替换成它执行所得的结果，而且是在不改变整个程序行为的前提下替换的，那么我们就说这段代码是引用透明的。+

