/**
 * 浅拷贝
 */ 
function shallowClone(origin, target) {
    var target = target || {}
    for (var prop in origin) {
        target[prop] = origin[prop]
    }
    return target
}


/**
 * 深拷贝
 */ 
function deepClone(obj) {
    // 过滤特殊情况
    if (obj === null) { return null }
    if (typeof obj !== 'object') { return obj }
    if (obj instanceof Date) {
        return new Date(obj)
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    //  不直接创建空对象，克隆的结果和之前保持相同的所属类
    // 不需要判断是数组还是对象
    let newObj = new obj.constructor
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key])
        }
    }
    return newObj
}
/**
 * 深拷贝
 * 引用数据类型只考虑对象和数组
*/
function deepClone2(origin, target) {
    // 过滤特殊情况
    var target = target || {},
    toStr = Object.prototype.toString,
    arrStr = "[object Array]";
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== null && typeof (origin[prop] === 'object')) {
                // if (toStr.call(origin[prop]) == arrStr) {
                //     target[prop] = []
                // } else {
                //     target[prop]= {}
                // }
                target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {}
                deepClone(origin[prop], target[prop])
            } else {
                target[prop] = origin[prop]
            }
        }
    }
    return target
}

function deepClone3 (obj) { 
    if (obj === null) { return null }
    if (typeof obj !== 'object') { 
        return obj
    }
    if (obj instanceof Date) {
        return new Date(obj)
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    let newObj = new obj.constructor
    for (let key in obj) { 
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone3(obj[key])
        }
    }
    return newObj
}

function test () { 
    var obj = {
        a: 1,
        b: "1",
        c: true,
        d: null,
        e: undefined,
        f: { "a": 1 },
        g: [1, 2, 3],
        h: new Date(),
        i: new RegExp(),
        j: function () { 
            
        }
    }
    const newObj = deepClone3(obj)
    obj.f.b = 1
    obj.g.push(4)
    console.log('new Obj', newObj)

}

test()