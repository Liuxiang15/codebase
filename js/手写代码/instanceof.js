function myInstanceof (A, B) { 
    let proto = A.__proto__;
    const prototype = B.prototype
    while(proto){
        if (proto == prototype) {
            return true
        }
        proto = proto.__proto__
    }
    return false
}

//下面开始验证一下
function Foo() {}
var f1 = new Foo();
console.log(myInstanceof(f1, Foo)) //true
console.log(myInstanceof(f1, Object)) //true
console.log(myInstanceof(Object, Function)) //true
console.log(myInstanceof(Object, Object)) //true
console.log(myInstanceof(Function, Object)) //true
console.log(myInstanceof(Function, Function)) //true
console.log(myInstanceof(Object, Foo)) //false
//ok，验证成功，完美

// 作者：luckxl
// 链接：https://juejin.cn/post/7110577218812084261
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。