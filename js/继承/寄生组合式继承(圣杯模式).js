// function inherit(Target, Origin) {
//     function F(){} // 没有必要每次都执行一次
//     F.prototype = Origin.prototype
//     Target.prototype = new F()
//     // 重置constructor
//     Target.prototype.constructor = Target
//     // 记录超类
//     Target.prototype.uper = Origin
// }


// es6有了Object.create()方法，可以改变函数的隐式原型(_proto_)，也可以不用中间函数
function inherit(Target, Origin) {
	Target.prototype = Object.create(Origin.prototype)
	Target.prototype.constructor = Target
	Target.prototype.uber = Origin.prototype
}



var inherit = (function () {
    // F是私有化变量，中间
    var F = function () {}
    return function(Target, Origin) {
        F.prototype = Origin.prototype
        Target.prototype = new F()
        // 重置constructor
        Target.prototype.constructor = Target
        // 记录超类
        Target.prototype.uper = Origin
    }
})()


// test
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

inherit(Child, Parent)

const c = new Child("hello", 18)
c.getName()