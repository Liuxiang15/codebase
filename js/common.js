
/**
 * 
 * @param {String} fileName 文件名
 * @param {String} blobObj  blob对象
 */
function downloadBlob (fileName, blobObj) {
    const blob = new Blob([res], {
        type: 'application/vnd.ms-excel;charset=utf-8'
    })
    if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}
const { log} = console

/**
 * 检测对象obj是否是数组
 * instanceof
 * constructor
 * Object.prototype.toString
 * Array.isArray()
 * @param {Object} obj 
 */
function isArray (obj) {
    let res
    // 法1：instanceof操作符是检测对象的原型链是否指向构造函数的prototype对象的
    res = obj instanceof Array
    log(res)

    // 法2：每个对象还有constructor的属性
    res = obj.constructor === Array
    log(res)

    // 重要： 每个iframe都有一套自己的执行环境，跨frame实例化的对象彼此是不共享原型链的
    // 法1和法2会检测失败

    // 法3
    // Object.prototype.toString的行为：
    // 首先，取得对象的一个内部属性[[Class]]
    // 然后依据这个属性，返回一个类似于"[object Array]"的字符串作为结果
    // 利用这 个方法，再配合call，我们可以取得任何对象的内部属性[[Class]]
    // 最后把类型检测转化为字符串比较
    res = Object.prototype.toString.call(obj) === '[object Array]'
    log(res)

    // 法4：
    // ECMAScript5将Array.isArray()正式引入JavaScript，目的就是准确地检测一个值是否为数组。
    // IE9+、 Firefox 4+、Safari 5+、Opera 10.5+和Chrome都实现了这个方法。但是在IE8之前的版本是不支持的。 
    res = Array.isArray(obj)
    log(res)

    // 法5：
    if (typeof Array.isArray === "function") {
        res = Array.isArray(obj);
    } else {
        res = Object.prototype.toString.call(obj) === "[object Array]";
    }
    log(res)
    
}
        

function isArrayTest () {
    var arr = [1,2,3,1];
    var arr2 = [{ abac: 1, abc: 2 }];
    isArray(arr)
    isArray(arr2)
    // iframe失败
    // var iframe = document.createElement('iframe'); //创建iframe
    // document.body.appendChild(iframe); //添加到body中
    // xArray = window.frames[window.frames.length-1].Array;
    // var arr = new xArray(1,2,3); // 声明数组[1,2,3]
    // log(arr instanceof Array); // false
    // log(arr.constructor === Array); // false 
       
}

isArrayTest()


/**
 * 获得字符串格式化时间
 * @param {Date} dateObj
 */
getStrTime (dateObj) {
    let year = dateObj.getUTCFullYear() // 获取当前年份(2位)
    let month = ('00' + (dateObj.getUTCMonth() + 1)).slice(-2) // 返回的月份小1
    let day = ('00' + dateObj.getUTCDate()).slice(-2)
    let hour = ('00' + dateObj.getHours()).slice(-2) // 获取当前小时数(0-23)
    let minute = ('00' + dateObj.getUTCMinutes()).slice(-2)// 获取当前分钟数(0-59)
    let second = ('00' + dateObj.getUTCSeconds()).slice(-2)// 获取当前秒数(0-59)
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}


/**
 * 给elem的type事件绑定处理函数handle
 */ 
function addEvent (elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle)
    } else  if (elem.attachEvent) {
        elem.attachEvent('on'+type, function(){
            handle.call(elem)
        }) 
    } else {
        elem['on'+type] = handle;
    }
}

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
    let newObj = new obj.constructor
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = this.deepClone(obj[key])
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

/**
 * 返回数据类型
 * type({}) -- object
 * type([]) -- array
 * type(function) -- function
 * type(123) -- number
 * type(new Number()) -- object Number
*/
function type(target) {
    // 1.如果是原始类型，那么就返回对应的typeof （除了null）
    // 2.否则根据Object.prototype.toString.call()来进行判断
    let retRype = typeof target
    if (target === null) {
        return "null"
    }
    else if (retRype !== "object") {
        // 这里会返回string, boolean, number, undefined, function
        return retRype
    } else {
        return Object.prototype.toString.call(target)
    }
}

/**
 * 数组去重
 */
Array.prototype.unique = function () {
    var keysObj = {},
        retArr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!keysObj[this[i]]) {
            keysObj[this[i]] = true
            retArr.push(this[i])
        }
    }
    // 这里返回的数组元素都是字符串
    return retArr
}

/**
 * 数组添加
 */
Array.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i]
    }
}


/**
 * 手写一个判断NaN 
*/
function myIsNaN(num) {
    return Number(num) + "" == "NaN"
}
function myIsNaN2(num) {
    return typeof NaN === 'number' && num == num
}

/**
 * 原型链继承
 * @param {*} Target 
 * @param {*} Origin 
 */
function inherit(Target, Origin){
    Target.prototype = Origin.prototype
}

function F(){
    F.prototype = Father.prototype
}
Son.prototype = new F()

function inherit(Target, Origin) {
    function F(){}
    F.prototype = Origin.prototype
    Target.prototype = new F()
    // 重置constructor
    Target.prototype.constructor = Target
    // 记录超类
    Target.prototype.uper = Origin
}

var inherit = (function () {
    // F是私有化变量，中间
    var F = function () {}
    return function(Target, Origin) {
        F.prototype = Origin.prototype
        Target.prototype = new F()
        // 重置constructor
        Target.prototype.constructor = Target
        // 记录超类
        Target.prototype.uper = Origin
    }
})

/**
 * 获取文件后缀名
 * @param {String} filename
 */
 export function getExt(filename) {
    if (typeof filename == 'string') {
        return filename
            .split('.')
            .pop()
            .toLowerCase()
    } else {
        throw new Error('filename must be a string type')
    }
}