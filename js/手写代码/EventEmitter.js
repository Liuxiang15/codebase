/*
定义 
发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。
 订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel），当发布者（Publisher）发布该事件（Publish Event）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码

实现思路
1、创建一个 EventEmitter 类
2、在该类上创建一个事件中心（Map）
3、on 方法用来把函数 fn 都加到事件中心中（订阅者注册事件到调度中心）
4、emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应事件中心中的函数（发布者发布事件到调度中心，调度中心处理代码）
5、off 方法可以根据 event 值取消订阅（取消订阅）
6、once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）
7、注册一个 newListener 用于监听新的事件订阅
*/

class EventEmitter {

    constructor() {
        // 用来存放注册的事件与回调
        this._events = {}
    }

    on (eventName, callback) {
        // 由于一个事件可以注册多个回调函数，所以使用数组来存储事件队列
        const callbacks = this._events[eventName] || []
        callbacks.push(callback)
        this._events[eventName] = callbacks
    }

    emit (eventName, ...args) {
        const callbacks = this._events[eventName] || []
        callbacks.forEach(cb => cb(...args))
    }

    off (eventName, callback) {
        const callbacks = this._events[eventName] || []
        // 说明：off也可以取消once订阅
        const newCallbacks = callbacks.filter(fn => fn != callback && fn.initialCallback != callback /* 用于once的取消订阅 */)
        this._events[eventName] = newCallbacks
    }
    once (eventName, callback) {
        // 由于需要在回调函数执行后，取消订阅当前事件，所以需要对传入的回调函数做一层包装,然后绑定包装后的函数
        const one = (...args) => {
            // 执行回调
            callback(...args)
            // 取消订阅事件
            this.off(eventName, one)
        }
        // 由于：我们订阅事件的时候，修改了原回调函数的引用，所以，用户触发 off 的时候不能找到对应的回调函数
        // 所以，我们需要在当前函数与用户传入的回调函数做一个绑定，我们通过自定义属性来实现
        one.initialCallback = callback

        // 实际注册的回调函数是one
        this.on(eventName, one)
    }

}

function test () {

    const events = new EventEmitter()

    // events.on("newListener", function(eventName){
    //     console.log(`eventName`, eventName)
    // })

    events.on("hello", function () {
        console.log("hello");
    })

    let cb = function () {
        console.log('cb');
    }
    events.on("hello", cb)
    events.emit("hello")
    events.emit("hello")

    events.off("hello", cb)
    events.emit("hello")
    events.emit("hello")

    // 测试once、emit
    function once () {
        console.log("once");
    }
    events.once("once", once)

    events.emit("once")
    events.emit("once")


}


test()