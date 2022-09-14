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
let arr = [1, 1, 2, 3, 3, 2, 2, 3]
console.log(arr.myunique())