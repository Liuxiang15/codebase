// 数组响应式
// 1、替换数组原型中7个方法
const originProto = Array.prototype;
// 备份一份，修改备份
const arrayProto = Object.create(originProto);
['push', 'pop'].forEach(method => {
  arrayProto[method] = function () {
    // 原始操作
    originProto[method].apply(this, arguments)
    // 覆盖操作：通知更新
    console.log('数组执行' + method + "操作：")

  }
})

function defineReactive (obj, key, val) {
  // 递归
  observe(val);

  const dep = new Dep()

  // 属性拦截
  Object.defineProperty(obj, key, {
    get () {
      // console.log("get", key);
      // 依赖收集建立
      Dep.target && dep.addDep(Dep.target)
      return val;
    },
    set (newVal) {
      if (newVal !== val) {
        // console.log("set", key);
        observe(newVal);
        val = newVal;
        // 通知更新
        dep.notify()
      }
    },
  });
}

// 遍历传入obj的所有属性，执行响应式处理
function observe (obj) {
  //首先判断obj是对象
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  // 判断传入的obj类型
  if (Array.isArray(obj)) {
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto
    // 对数组内部的元素进行响应化
    // const keys = Object.keys(obj)
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i])
    }
  } else {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

// 其他地方写的Observer。也许可以直接替换
/**
 * observer.js
 * 在这里把 data 中的 属性变为响应式加在自身的身上
 * 新增：在 obsever.js 中使用Dep
 */

// class Observer { 
//     constructor(data) { 
//         // 遍历data
//         this.walk(data)
//     }
//     /**
//      * 遍历data转为响应式
//      * @param {*} data 
//      */
//     walk (data) { 
//         // 空和基本类型
//         if (!data || typeof data !== 'object') return
//         Object.keys(data).forEach(key => { 
//             this.defineReactive(data, key, data[key])
//         })
//     }
//     /**
//      * 转为响应式
//      * 要注意的 和vue.js 写的不同的是
//      * vue.js中是将 属性给了 Vue 转为 getter setter
//      * 这里是 将data中的属性转为getter setter
//      * @param {*} obj 
//      * @param {*} key 
//      * @param {*} value 
//      */
//     defineReactive (obj, key, value) { 
//         // 如果是对象类型的 也调用walk 变成响应式，不是对象类型的直接在walk会被return
//         this.walk(value)
//         // 保存this
//         const self = this
//         // 创建Dep对象
//         let dep = new Dep()
//         Object.defineProperty(obj, key, {
//             enumerable: true,
//             configurable: true,
//             get () { 
//                 // 添加观察者对象 Dep.target 表示观察者
//                 // Dep.target其实是watcher
//                 Dep.target && dep.addObs(Dep.target)
//                 return value
//             },
//             set (newValue) {
//                 if (newValue === value) return
//                 value = newValue
//                 // 赋值的话如果是newValue是对象，对象里面的属性也应该设置为响应式的
//                 self.walk(newValue)
//                 // 触发通知 更新视图
//                 dep.notify()
//             }
//         })
//     }
// }

function proxy (vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get () {
        return vm.$data[key];
      },
      set (v) {
        vm.$data[key] = v;
      },
    });
  });
  // 新增methods
  Object.keys(vm.$methods).forEach((key) => {
    Object.defineProperty(vm, key, {
      get () {
        return vm.$methods[key];
      },
      // set(v) {
      //   vm.$data[key] = v;
      // },
    });
  });
}

class KVue {
  constructor(options) {
    // 0.保存选项
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods

    // 1.响应式: 递归遍历data中的对象，做响应式处理
    observe(this.$data);

    // 1.5.代理
    proxy(this);

    // 2.编译模板
    new Compile(options.el, this);
  }
}

// 遍历模板树，解析其中动态部分，初始化并获得更新函数
class Compile {
  constructor(el, vm) {
    // 保存实例
    this.$vm = vm;

    // 获取宿主元素dom
    const dom = document.querySelector(el);

    // 编译它
    this.compile(dom);
  }

  compile (el) {
    // 遍历el
    const childNodes = el.childNodes;
    childNodes.forEach((node) => {
      if (this.isElement(node)) {
        // 元素:解析动态的指令、属性绑定、事件
        // console.log("编译元素", node.nodeName);
        const attrs = node.attributes;
        Array.from(attrs).forEach((attr) => {
          // 判断是否是一个动态属性
          // 1.指令k-xxx="counter"
          const attrName = attr.name;
          const exp = attr.value;
          if (this.isDir(attrName)) {
            const dir = attrName.substring(2);
            // 看看是否是合法指令，如果是则执行处理函数
            this[dir] && this[dir](node, exp);
          } else if (this.isEvent(attrName)) {
            const event = attrName.substring(1); // 获取到事件名
            const handlerName = node.getAttribute(attrName)
            console.log('事件处理函数名', handlerName)
            // 看看是否是合法函数名，如果是则执行处理函数
            this.eventHandler (node, event, handlerName)

          }
        });

        // 递归
        if (node.childNodes.length > 0) {
          this.compile(node);
        }
      } else if (this.isInter(node)) {
        // 插值绑定表达式
        // console.log("编译插值", node.textContent);
        this.compileText(node);
      }
    });
  }

  // 处理所有动态绑定
  // dir指的就是指令名称
  update (node, exp, dir) {
    // 1.初始化
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp]);
    // 2.创建Watcher实例，负责后续更新
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val);
    });
  }

  // k-text
  text (node, exp) {
    this.update(node, exp, "text");
  }
  textUpdater (node, val) {
    node.textContent = val;
  }

  // k-html
  html (node, exp) {
    this.update(node, exp, "html");
  }
  htmlUpdater (node, val) {
    node.innerHTML = val;
  }

  // 解析{{ooxx}}
  compileText (node) {
    this.update(node, RegExp.$1, "text");
    // 1.获取表达式的值
    // node.textContent = this.$vm[RegExp.$1]
  }

  isElement (node) {
    return node.nodeType === 1;
  }

  // {{ooxx}}
  isInter (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  isDir (attrName) {
    return attrName.startsWith("k-");
  }

  isEvent (attrName) {
    return attrName.startsWith("@");
  }

  eventHandler (node, event, handlerName) {
    const fn = this.$vm[handlerName]
    if (fn) {
      // node.addEventListener(event, () => {
      //   this.$vm[handlerName].call(this.$vm)
      // })
      node.addEventListener(event, fn.bind(this.$vm))
    } else {
      console.error(`${event}函数不存在！`)
    }

  }
  /**
   * k-model处理
   * @param {*} node 
   * @param {*} exp 
   */
  model (node, exp) { 
    // update方法只完成赋值和更新
    this.update(node, exp, "model");

    // 事件监听
    node.addEventListener('input', e => { 
      this.$vm[exp] = e.target.value
    })
  }

  modelUpdater (node, value) {
    // 表单元素赋值
    node.value = value

  }
}

// 负责具体节点更新
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm;
    this.key = key;
    this.updater = updater;

    // 读当前值，触发依赖收集
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  // Dep将来会调用update
  update () {
    const val = this.vm[this.key];
    this.updater.call(this.vm, val);
  }
}

// Dep和响应式的属性key之间有一一对应关系
// 负责通知watchers更新
class Dep {
  constructor() {
    this.deps = [];
  }
  addDep (dep) {
    this.deps.push(dep);
  }
  notify () {
    this.deps.forEach((dep) => dep.update());
  }
}
