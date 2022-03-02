var obj = {
    value: "vortesnail",
    num:1
};

function fn(num) {
    console.log(this.value);
    console.log(this.num+num);
}

let bindFn = fn.bind(obj, 2); // vortesnail
bindFn()

Function.prototype.myBind = function (context) { 
    var self = this;
    var args = [...arguments].slice(1)
    var f = function () {
        // 真正执行的是self，也就是外面的this
        // 这里面的this是window
        return self.apply(context || window, args)
    }
    return f
}

bindFn2 = fn.myBind(obj, 2); // vortesnail
bindFn2()