/**
 * 解析简单路径
 */

function parsePath(path) {
    const bailRE = /[^\w.$]/
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
/**
 * compiler.js
 * 实现对文本节点 和 元素节点指令编译
 * feat:在编译完文本节点后 在这里添加一个 Watcher
 * feat:v-text v-model 指令 当编译的是元素节点 就添加一个 Watcher
 */
class Compiler {
    constructor(vm) {
        console.log('Compiler constrcutor', vm)
        this.vm = vm
        this.el = vm.$el
        // 编译模板
        this.compile(this.el)
    }
    /**
     * 编译模板
     * @param {*} el 
     */
    compile(el) {
        // childNodes：获取节点，不同浏览器表现不同；IE：只获取元素节点；非IE：获取元素节点与文本节点；
        // children：获取元素节点
        let childNodes = [...el.childNodes]
        childNodes.forEach(node => {
            // 判断节点类型
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                this.compileElement(node)
            }
            // 判断是否存在子节点递归
            if (node.childNodes && node.childNodes.length) {
                // 继续递归编译模板
                this.compile(node)
            }
        })
    }

    /**
     * 编译文本节点（简单实现）
     * @param {*} node 
     */
    compileText(node) {
        console.log('compileText', node)
        // 核心思想利用把正则表达式把{{}}去掉找到里面的变量
        // 再去Vue找这个变量赋值给node.textContent
        let reg = /\{\{(.+?)\}\}/
        // 获取节点的文本内容
        let val = node.textContent
        // 判断文本节点中是否有{{}}
        if (reg.test(val)) {
            // 获取分组1，也就是{{}}里面的内容， 去除前后空格
            let key = RegExp.$1.trim()
            console.log('key', key)
            // key的格式可能是info.hobby,所以不能直接this.vm[key]
            const getter = parsePath(key)
            const value = getter.call(this.vm, this.vm)
            // 进行替换再赋值给node
            node.textContent = val.replace(reg, value)
            // 创建观察者
            new Watcher(this.vm, key, newValue => {
                node.textContent = newValue
            })
        }
    }
    /**
     * 编译元素节点（只处理指令）
     * @param {*} node 
     */
    compileElement(node) {
        // 获取到元素节点上面的所有属性进行遍历
        [...node.attributes].forEach(attr => {
            let attrName = attr.name
            if (this.isDerective(attrName)) {
                // 去除v-
                attrName = attrName.substr(2)
                // 获取 指令的值就是  v-text = "msg"  中msg
                // 'msg' 作为 key 去Vue 找这个变量
                let key = attr.value
                this.update(node, key, attrName)
            } else if (this.isEvent(attrName)) {
                const event = attrName.substring(1); // 获取到事件名
                const handlerName = node.getAttribute(attrName)
                // console.log('事件处理函数名', handlerName)
                // 看看是否是合法函数名，如果是则执行处理函数
                this.eventHandler(node, event, handlerName)

            }
        })
    }
    /**
     * 添加指令方法，并且执行
     * @param {*} node 
     * @param {*} key 
     * @param {*} attrName 
     */
    update(node, key, attrName) {
        // 比如添加 textUpdater 就是用来处理 v-text 方法
        // 我们应该就内置一个 textUpdater 方法进行调用
        // 加个后缀加什么无所谓但是要定义相应的方法
        let updateFn = this[attrName + 'Updater']
        // 如果存在这个内置方法 就可以调用了
        // console.log('update',node, key, attrName )
        updateFn && updateFn.call(this, node, key, this.vm[key])
    }
    /**
     * v-text
     * @param {*} node 
     * @param {*} key 
     * @param {*} value 
     */
    textUpdater(node, key, value) {
        node.textContent = value
        // 创建观察者2
        new Watcher(this.vm, key, newValue => {
            node.textContent = newValue
        })
    }
    /**
     * v-model
     * @param {Node} node 
     * @param {*} key 
     * @param {*} value 
     */
    modelUpdater(node, key, value) {
        node.value = value
        // 踹那个键观察者
        new Watcher(this.vm, key, newValue => {
            node.value = newValue
        })
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })

    }
    // k-html
    // html (node, exp) {
    //     this.update(node, exp, "html");
    // }
    /**
     * v-html
     * @param {*} node 
     * @param {*} val 
     */
    htmlUpdater(node, key, value) {
        new Watcher(this.vm, key, newValue => {
            node.innerHTML = newValue
        })
        node.innerHTML = value;
    }
    /**
     * 判断元素的属性是否是vue指令
     * @param {String} attr 
     */
    isDerective(attr) {
        return attr.startsWith('v-')
    }
    // Node对象中的nodeType获取指定节点的节点类型
    // nodeType 属性返回以数字值返回指定节点的节点类型
    // 元素节点 1
    // 属性节点 2
    // 文本节点 3
    isElementNode(node) {
        return node.nodeType === 1
    }
    isTextNode(node) {
        return node.nodeType === 3
    }

    isEvent(attrName) {
        return attrName.startsWith("@");
    }

    eventHandler(node, event, handlerName) {
        console.log('handlerName', handlerName)
        const fn = this.vm[handlerName]
        if (fn) {
            // node.addEventListener(event, () => {
            //   this.$vm[handlerName].call(this.$vm)
            // })
            node.addEventListener(event, fn.bind(this.vm))
        } else {
            console.error(`${event}函数不存在！`)
        }

    }
}