// 方法1
// var a = {
//     n:1, // 注意n是数属性
//     valueOf:function () {
//         return this.n++
//     }
// }

// 方法2
var _a = 0
var a = {
    valueOf: function () {
        _a++
        return _a
    }
}
console.log(a==1 && a==2 && a==3); // true