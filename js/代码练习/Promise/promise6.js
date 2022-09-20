new Promise((resolve, reject) => {
    reject(1);
    console.log(2);
    resolve(3);  // 不会执行
    console.log(4);
}).then((res) => { console.log(res) })
    .catch(res => { console.log('reject1') })  // reject1 微队列
try {
    new Promise((resolve, reject) => {
        throw 'error'
    }).then((res) => { console.log(res) })
        .catch(res => { console.log('reject2') })// reject1 微队列
} catch (err) {
    console.log(err)
}
// 回答
// 同步输出
// 2
// 4
// reject1
// reject1


// 答案
// 2
// 4
// reject1
// reject2