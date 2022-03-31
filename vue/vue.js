/* vue.js */
class Vue { 
    constructor(options) {
        this.$options = options || {}
        //获取el,支持传入选择器和dom
        this.$el = typeof options.el === 'string'
            ? document.querySelector(options.el)
            : options.el
        // 获取data
        this.$data = options.data || {}
        // 调用_proxyData处理data中的属性
        this._proxyData(this.$data)
    }
    // 将data中的属性注册到Vue
    _proxyData () { 
        Object.keys(data).forEach(key => { 
            // 数据劫持
            // 把每个data的属性，添加到Vue转化为getter setter
            Object.defineProperty(this, key, {
                // 可枚举
                enumerable: true,
                // 可配置
                configurable: true,
                get () { 
                    return data[key]
                },
                set (newValue) { 
                    if (newValue === data[key]) return
                    data[key] = newValue
                }

            })
        })
    }
}