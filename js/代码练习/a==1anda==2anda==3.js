// 方法一：利用 toString()
function test1 () {
    let a = {
    i: 1,
    toString () {
        return a.i++;
    }
    }
    console.log(a==1 && a==2 && a==3);
}
test1()

// 方法二：利用 valueOf()
function test2 () {
    let a = {
        i: 1,
        valueOf () {
            return a.i++
        }
    }
    console.log(a==1 && a==2 && a==3);
}
test2()
// 方法3
function test3 () {
    var a = {
        n:1, // 注意n是数属性
        valueOf:function () {
            return this.n++
        }
    }
    console.log(a==1 && a==2 && a==3);
}
test3();

(function () {
    // 方法三：利用数组（这个是真的骚）
    // 代码分析
    // 上面代码 a.join = a.shift; 数组 a 的 join 被 shift 方法覆盖。
    // 数组引用值和原始值1、2、3比较的时候，规则如下
    // 先调用valueOf, 如果返回原始值，就用它比较，
    // 否则调用toString，如果返回原始值，就用它比较
    // 而数组调用 toString() 会隐含调用 Array.join() 方法。
    var a = [1, 2, 3];
    a.join = a.shift;
    console.log(a == 1 && a == 2 && a == 3);

})();

(function () {
    // 方法四：利用 Symbol (太难)
    let a = { [Symbol.toPrimitive]: ((i) => () => ++i)(0) };
    console.log(a == 1 && a == 2 && a == 3);

})();

(function () { 
    // 方法五：创建属性 defineProperty 的 get
    var val = 0;
    Object.defineProperty(globalThis, "a", {
        get () { 
            return ++val
        }
    })
    console.log(a == 1 && a == 2 && a == 3);
})()