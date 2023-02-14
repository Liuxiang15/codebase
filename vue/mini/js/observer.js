/**
 * observer.js
 * 在这里把 data 中的 属性变为响应式加在自身的身上
 * 新增：在 obsever.js 中使用Dep
 */

class Observer {
    constructor(data) {
        // 遍历data
        this.walk(data)
    }
    /**
     * 遍历data转为响应式
     * @param {*} data 
     */
    walk(data) {
        // 空和基本类型
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    /**
     * 转为响应式
     * 要注意的 和vue.js 写的不同的是
     * vue.js中是将 属性给了 Vue 转为 getter setter
     * 这里是 将data中的属性转为getter setter
     * @param {*} data 
     * @param {*} key 
     * @param {*} val 
     */
    defineReactive(data, key, val) {
        // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
        this.walk(val)
        // 保存this
        const self = this
        // 创建Dep对象
        let dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 添加观察者对象 Dep.target 表示观察者
                dep.depend()
                return val
            },
            set(newVal) {
                if (newVal === val) return
                val = newVal
                // 赋值的话如果是newVal是对象，对象里面的属性也应该设置为响应式的
                self.walk(newVal)
                // 触发通知 更新视图
                dep.notify()
            }
        })
    }
}