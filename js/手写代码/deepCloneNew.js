// 引用数据类型都有哪些：
// ES6之前：Object, Array, Date, RegExp, Error,
// ES6之后：Map, Set, WeakMap, WeakSet,

function deepClone(obj) {
    // 类型判断的通用方法
    function getType (obj) {
        return Object.prototype.toString.call(obj).slice(8, -1)
        // return Object.prototype.toString.call(obj).replaceAll(new RegExp(/\[|\]|object /g), "");
    }
    const type = getType(obj);
    let res = {};
    if (type === "Object") {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                res[key] = deepClone(obj[key]);
            }
        }
    } else if (type === "Array") {
        res = []
        res.forEach((item, i) => { 
            res[i] = deepClone(item)
        })
    }
    else if (type === "Date") {
        res = new Date(obj);
    } else if (type === "RegExp") {
        res = new RegExp(obj);
    } else if (type === "Map") {
        res = new Map(obj);
    } else if (type === "Set") {
        res = new Set(obj);
    } else if (type === "WeakMap") {
        res = new WeakMap(obj);
    } else if (type === "WeakSet") {
        res = new WeakSet(obj);
    }else if (type === "Error") {
        res = new Error(obj);
    }
     else {
        res = obj;
    }
    return res;
}

