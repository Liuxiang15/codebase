import {
    Observer
} from "./observer/index.js"
/* vue.js */
export default class Vue {
    constructor(options) {
        this.$options = options || {}
        //获取el,支持传入选择器和dom
        this.$el = typeof options.el === 'string' ?
            document.querySelector(options.el) :
            options.el
        // 获取data
        this.$data = options.data || {}
        // 调用_proxyData处理data中的属性
        this._proxyData(this.$data)
        // 使用 Obsever 把data中的数据转为响应式
        new Observer(this.$data)
        // 这里为什么做了两个重复性的操作呢？重复性两次把 data的属性转为响应式
        // 在obsever.js 中是把 data 的所有属性 加到 data 自身 变为响应式 转成 getter setter方式
        // 在vue.js 中 也把 data的 的所有属性 加到 Vue 上,是为了以后方面操作可以用 Vue 的实例直接访问到 或者在 Vue 中使用 this 访问
        // 编译模板
        new Compiler(this)

    }
    // 将data中的属性注册到Vue
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            // 数据劫持
            // 把每个data的属性，添加到Vue转化为getter setter
            Object.defineProperty(this, key, {
                // 可枚举
                enumerable: true,
                // 可配置
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) return
                    data[key] = newValue
                }

            })
        })
    }
}