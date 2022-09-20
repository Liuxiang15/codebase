const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(1); // 宏队列
        }, 0);
        setTimeout(() => {
            console.log(2);// 宏队列
            resolve(3);   // 不会执行
        }, 0)
        resolve(4);   // resolve只执行一次，这个执行了，10行的就不执行了
    });
    resolve(2);   // 外层promise的返回值为2
    p.then((arg) => {
        console.log(arg, 5); // 4 5 微队列
    });
    setTimeout(() => {
        console.log(6);     // 6 宏队列
    }, 0);
}))

first().then((arg) => {
    console.log(arg, 7); //  2 7 微队列
    setTimeout(() => {
        console.log(8); // 8 宏队列
    }, 0);
});
setTimeout(() => {
    console.log(9);
}, 0);
console.log(10);

// 回答
// 同步代码输出
// 3
// 7
// 10
// // 微队列
// 4 5
// 2 7
// // 宏队列
// 1
// 2
// 6
// 9
// // 宏队列2
// 8

