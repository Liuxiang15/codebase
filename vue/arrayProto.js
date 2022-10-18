var ArrayProto = Array.prototype;
var ArrMethods = Object.create(ArrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => { 
    Object.defineProperty(ArrMethods, method, {
        value:function () {
            console.log(`Array的${method}方法被访问`)
            var oroginal = ArrayProto[method]
            oroginal.apply(this, arguments)
        }
    })
})


const a = new ArrMethods()
a.push(1)

