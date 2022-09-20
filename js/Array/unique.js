/**
 * 数组去重(简单写法)
 */
Array.prototype.myunique = function () {
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
 * 数组去重(简单写法)
 * 数字或字符串数组去重，效率高
 * 缺点：数组元素为字符串和数字混搭时会混淆
 */
Array.prototype.myunique2 = function () {
    var result = {};
    for (var i = 0; i < arr.length; i++) {
        if (!result[this[i]]) {
            result[this[i]] = true
        }
    }
    // 这里返回的数组元素都是字符串
    return  Object.keys(result); // 获取对象所有属性名的数组
}

/**
 * 数组去重(简单写法)
 * 任意数组去重，适配范围广，效率低
 */
Array.prototype.myunique4 = function () {
    var result = []; // 结果数组
    for (var i = 0; i < arr.length; i++) {
        if (!result.includes(this[i])) {
            result.push(this[i])
        }
    }
   return result;
}



/**
 * 数组去重
 * 利用ES6的Set去重，适配范围广，效率一般，书写简单
 */
Array.prototype.myunique3 = function () {
     return [...new Set(this)]
}
let arr = [1, 1, 2, 3, 3, 2, 2, 3]
console.log(arr.myunique())
console.log(arr.myunique2())
console.log(arr.myunique3())
console.log(arr.myunique4())