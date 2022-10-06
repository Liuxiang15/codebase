console.log(1); 
setTimeout(() => {
    console.log(2); // 宏
    process.nextTick(() => {
        console.log(3); // 宏+微
    });
    new Promise((resolve) => {
        console.log(4); // 宏
        resolve();
    }).then(() => {
        console.log(5);// 宏+微
    });
});
new Promise((resolve) => {
    console.log(7); 
    resolve();
}).then(() => {
    console.log(8);// 微
});
process.nextTick(() => {
    console.log(6);// 微
});
setTimeout(() => {
    console.log(9);// 宏
    process.nextTick(() => {
        console.log(10); // 宏+微
    });
    new Promise((resolve) => {
        console.log(11);// 宏
        resolve();
    }).then(() => {
        console.log(12);//// 宏+微
    });
});
// 我的回答（❌）
// 错误分析：微任务队列追加在 process.nextTick 队列的后面，也属于本轮循环。
// 可以认为process.nextTick的执行快于微队列
// // 同步
// 1
// 7
// // 微任务
// 8
// 6
// // 宏任务
// 2
// 4
// // 当前所有微任务
// 3
// 5
// // 宏任务
// 9
// 11
// // 当前所有微任务
// 10
// 12

// ✅答案
// 7
// 6
// 8
// 2
// 4
// 3
// 5
// 9
// 11
// 10
// 12

// Promise.resolve().then(() => console.log(4));

// process.nextTick(() => console.log(3));
// // 3// 4
