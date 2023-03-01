/**
 * observer.js
 * 在这里把 data 中的 属性变为响应式加在自身的身上
 * 新增：在 obsever.js 中使用Dep
 */

import {
    arrayMethods
} from './array.js'
import {
    def,
    hasOwn
} from "../util/index.js";
// __proto__是否可用
const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        def(value, '__ob__', this)
        // 1、_ob__的作用不仅仅是为了在拦截器中访问 Observer实例这么简单
        // 2、还可以用来标记当前value是否已经被 Observer转换成了响应式数据。

        if (!Array.isArray(this.value)) {
            // 遍历data
            this.walk(value)
        } else {
            // data.__proto__ = arrayMethods
            const augment = hasProto ? protoAugment : copyAugment
            augment(value, arrayMethods, arrayKeys)
            this.observeArray(value)

        }
    }
    /**
     * 遍历data转为响应式
     * walk会将每一个属性都转换成getter/setter的形式来侦测变化
     * 这个方法只有在数据类型为Object 时被调用
     * @param {*} data 
     */
    walk(data) {
        // 空和基本类型
        if (!data || typeof data !== 'object') return
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(data, keys[i], data[keys[i]])
        }
    }

    /**
     * 侦测Array中的每一项
     */
    observeArray(items) {
        for (let i = 0; i < items.length; i++) {
            observe(items[i])
        }
    }
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
function defineReactive(data, key, val) {
    // 递归子属性
    if (typeof val === 'object') {
        new Observer(val)
    }
    let childOb = observe(val)

    // 创建Dep对象
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            // 添加观察者对象 Dep.target 表示观察者
            dep.depend()
            // 这里收集Array的依赖
            if (childOb) {
                childOb.dep.depend()
            }
            return val
        },
        set(newVal) {
            if (newVal === val) return
            val = newVal
            // 触发通知 更新视图
            dep.notify()
        }
    })
}

function protoAugment(target, src, keys) {
    target.__proto__ = src
}

function copyAugment(target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}
/*** 
 * 尝试为value 创建一个Observer实例
 * 如果创建成功，直接返回新创建的 Observer 实例。
 * 如果value已经存在一个 Observer 实例，则直接返回它
 **/
export function observe(value, asRootData) {
    // !isObject(value)
    if (typeof value !== 'object') {
        return
    }
    let ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)

    }
    return ob
}