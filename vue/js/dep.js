/**
 * dep.js
 * 它相当于 观察者中的发布者  每个响应式属性都会创建这么一个 Dep 对象 ，负责收集依赖该属性的Watcher对象 
 *（是在使用响应式数据的时候做的操作）
 * 当我们对响应式属性在 setter 中进行更新的时候，会调用 Dep 中 notify 方法发送更新通知
 * 然后去调用 Watcher 中的 update 实现视图的更新操作（是当数据发生变化的时候去通知观察者调用观察者的update更新视图）
 * 总的来说 在Dep(这里指发布者) 中负责收集依赖 添加观察者(这里指Wathcer)，然后在 setter 数据更新的时候通知观察者
 */
//  5.观察者模式 与 发布订阅 的差异

// 与发布订阅者不同 观察者中 发布者和订阅者(观察者)是相互依赖的 必须要求观察者订阅内容改变事件 ，而发布订阅者是由调度中心进行调度，那么看看观察者模式 是如何相互依赖

// 目标
class Dep {
    constructor() {
        this._observeLists = []
    }
    // 添加观察者
    addObs (obs) {
        if (obs && obs.update) {
            // 添加到观察者列表中
            this._observeLists.push(obs)
        }
    }
    // 通知观察者
    notify () {
        this._observeLists.forEach(obs => {
            // 每个观察者受到通知后 更新事件
            obs.update()
        })
    }
    // 清空观察者-可能用不到
    empty () {
        this._observeLists = []
    }
}

        // class Observer {
        //     // 定义观察者内容更新事件
        //     update () {
        //         console.log('目标更新了')
        //     }
        // }
        // 测试
        // let sub = new Dep()
        // let obs1 = new Observer(),
        //     obs2 = new Observer()
        // sub.addObs(obs1)
        // sub.addObs(obs2)
        // sub.notify()