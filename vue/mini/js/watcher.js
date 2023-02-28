/** watcher.js 
 * 数据更新后 收到通知之后 调用 update 进行更新
 * */
class Watcher {
    /**
     * 初始化
     * @param {*} vm Vue实例
     * @param {*} expOrFn data中的属性
     * @param {*} cb 回调函数，更新视图的具体方法
     */
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.expOrFn = expOrFn
        // 执行this
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }
    get() {
        // 把观察者存放在Dep.target中
        Dep.target = this
        // 旧数据 更新视图的时候要进行比较
        // 还有一点就是 vm[expOrFn] 这个时候就触发了 get 方法
        // 之前在 get 把 观察者 通过dep.addSub(Dep.target) 添加到了 dep.subs中
        // this.oldValue = vm[expOrFn]
        // 注意：执行getter函数的时候，触发了setter
        let value = this.getter.call(this.vm, this.vm)
        // Dep.target不用存在了 因为上面已经操作好了
        Dep.target = null
        return value
    }
    /**
     * 观察者中的必备方法 用来更新视图
     */
    update() {
        // 获取新值
        // let newValue = this.vm[this.expOrFn]
        const oldValue = this.value
        const newValue = this.get()
        // 比较新旧(也可以放在外层进行判断)
        if (newValue === oldValue) return
        this.value = newValue
        // 调用具体的更新方法
        // this.cb(newValue)
        this.cb.call(this.vm, this.value, oldValue)
    }
}

/**
 * 解析简单路径
 */

function parsePath(path) {
    const bailRE = /[^\w.$]/ //防止公共变量名冲突

    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}