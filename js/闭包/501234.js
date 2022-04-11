// 如果期望代码的输出变成：5 -> 0,1,2,3,4
// 方法1
// for (var i = 0; i < 5; i++) {
//     (function (i) {
//         setTimeout(() => {
//             console.log(i)
//         })
//     })(i)
// }

// 方法2
// for (var i = 0; i < 5; i++) {
//     setTimeout((i) => {
//         console.log(i)
//     }, 1000, i)
// }

function output (i) { 
    setTimeout(() => { 
        console.log(i)
    }, 1000)
}
for (var i = 0; i < 5; i++) { 
    output(i)
}

console.log(i);
// 输出
// 5  0  1  2  3  4

