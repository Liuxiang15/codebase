/**
 * observer.js
 * 在这里把 data 中的 属性变为响应式加在自身的身上
 * 新增：在 obsever.js 中使用Dep
 */

import {
    arrayMethods
} from './array.js'
import {
    def
} from "../util";
// __proto__是否可用
const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

export class Observer {
    constructor(data) {
        this.data = data;
        this.dep = new Dep();

        if (!Array.isArray(this.data)) {
            // 遍历data
            this.walk(data)
        } else {
            // data.__proto__ = arrayMethods
            const augment = hasProto ? protoAugment : copyAugment
            augment(value, arrayMethods, arrayKeys)

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
    // 创建Dep对象
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            // 添加观察者对象 Dep.target 表示观察者
            dep.depend()
            // 这里收集Array的依赖
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