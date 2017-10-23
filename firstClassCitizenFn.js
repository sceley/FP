//函数是一等公民
//fn=任何的数据类型，可以存放于内存，当做参数传递，赋值给变量等等。
//a bad example
//集体无视
let hi = function () {
    return 'Hi' + name;
};
let greeting = function (name) {
    return hi(name);
};
//greeting指向的那个把hi包了一层的包裹函数完全是多余的，JavaScript函数是可调用的，当hi后面紧跟()的时候就会运行并返回一个值，如果没有(),hi就能简单地返回存在这个变量里的函数。
hi
// function (name) {
//     return 'Hi' + name;
// };
hi('peter');
//'Hi peter'
//greeting只不过是转个身然后以相同的参与调用了hi函数而已，
//改进
greeting = hi;
greeting('times');
//=>'Hi times'
//npm上的模块包
//太傻了
let getServerStuff = function (callback) {
    return ajaxCall(function (json){
        return callback(json);
    });
};
//这才像样
let getStuff = ajaxCall;
//世界上到处都充斥着这样的垃圾ajax代码。以下是上述两种写法等效的原因
//这行
return ajaxCall(function (json){
    return callback(json);
});
//等价于这行
return ajaxCall(callback);
//那么,重构下getServerStuff
let getServerStuff = function (callback) {
    return ajaxCall(callback);
};
//...就等于
let getServerStuff = ajaxCall;


// next example
let BlogController = (function () {
    let index = function (posts) {
        return Views.index(post);
    };
    let show = function (post) {
        return Views.show(post);
    };
    let create = function (attrs) {
        return Db.create(attrs);
    };
    let update = function (post, attrs) {
        return Db.update(post, attrs);
    };
    let destroy = function (post) {
        return Db.destroy(post);
    };
    return {
        index: index,
        show: show,
        create: create,
        update: update,
        destroy: destroy
    };
});
//这个控制器99%都是垃圾代码
//重写
let BlogController = {index: View.index, show: Views.show, create: Db.create, update: Db.update, destroy: Db.destroy};
//为何如此钟爱一等公民
//如果一个函数被不必要地包裹起来了，而且发生了改动，那么包裹它的那个函数也要做相应的变更。
//httpGet('/post/2', function (json) {
    //return renderPost(json);
//});
//如果httpGet要改成可以抛出一个可能出现的err异常，那我们还要回头去把“胶水”函数也改了。
httpGet('/post/2', function (json, err) {
    return renderPost(json, err);
});
//写成一等公民函数的形式，要做的改动会少很多
//httpGet('/post/2', renderPost);//renderPost将在httpGet中调用，想要多少参数都行。
//除了删除不必要的函数，正确地为参数命名也必不可少。
//如果，下面的两个函数做的事情一模一样，但后一个就显得更加通用，可重用性也更高。
//只针对当前的博客
let validArticles = function (articles) {
    return aticles.filter(function (article) {
        return article !== null && article !== undefined;
    });
};
//对未来的项目友好太多
let compact = function (xs) {
    return xs.filter(function (x) {
        return x !== null && x !== undefined;
    });
}
//在命名的时候，我们特别容易把自己限定在特定的数据上
//有一点我必须得指出，你一定要非常小心 this 值，别让它反咬你一口，这一点与面向对象代码类似。如果一个底层函数使用了 this，而且是以一等公民的方式被调用的，那你就等着 JS 这个蹩脚的抽象概念发怒吧。
let fs = require('fs');
//太可怕了
fs.readFile('freakly.txt', Db.save);
//好一点点
fs.readFile('freadkly.txt', Db.save.bind(Db));
//this 就像一块脏尿布，我尽可能地避免使用它，因为在函数式编程中根本用不到它
//函数仅仅只是输入到输出的映射而已，所以简单地写入一个对象就能“运行”它，使用[]代替