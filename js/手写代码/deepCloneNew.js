// 引用数据类型都有哪些：
// ES6之前：Object, Array, Date, RegExp, Error,
// ES6之后：Map, Set, WeakMap, WeakSet,
// 类型判断的通用方法
function getType (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
    // return Object.prototype.toString.call(obj).replaceAll(new RegExp(/\[|\]|object /g), "");
}

function deepClone(obj, hash=new Map()) {
    if (hash.has(obj)) {
        return obj // 解决循环引用的问题
    }
    const type = getType(obj);
    const references = ["Set", "WeakSet", "Map", "WeakMap", "RegExp", "Date", "Error"];
    let res = {};
    if (type === "Object") {
        hash.set(obj);
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                // 多种判断是自身属性的方法
                // Object.hasOwnProperty.call(obj, key)
                // obj.hasOwnProperty(key)
                res[key] = deepClone(obj[key], hash);
            }
        }
    } else if (type === "Array") {
        res = []
        obj.forEach((item, i) => { 
            res[i] = deepClone(item)
        })
    }
    else if (references.includes(type)) {
        res = new obj.constructor(obj);
    } 
     else {
        res = obj;
    }
    return res;
}


const map = new Map();
map.set("key", "value");
map.set("ConardLi", "coder");

const set = new Set();
set.add("ConardLi");
set.add("coder");

const target2 = {
}
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: "child",
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: 2,
    str: '2',
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        let t = 0;
        console.log("coder", t++);
    },
    func2: function (a, b) {
        return a + b;
    },
    target2:target2
};
target2.target = target

//测试代码
const test1 = deepClone(target);
target.field4.push(9);
console.log('test1: ', test1);
console.log(test1.target2.target === target)