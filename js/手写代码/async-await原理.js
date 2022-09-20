// generator + co => async/await

function f1(val) {
    return new Promise(suc => {
        suc(val)
    })
}
function f2(val) {
    return new Promise(suc => {
        suc(val);
    })
}
// generator 生成器，生成迭代器，迭代器为数据提供统一遍历方式for of
function *fn(val) {
    let val1 = yield f1(val);
    let val2 = yield f2(val1);
    console.log(val1, val2);
}
next(fn(1));


// 异步代码同步化
async function _fn(val) {
    let val1 = await f1(val);
    let val2 = await f2(val1);
    console.log(val1, val2);
}
_fn(1);

// const runFn = fn(1);
// const {value, done} = runFn.next();
// console.log(done);
// value.then(val => {
//     const {value, done} = runFn.next(val);
//     console.log(done, value);
//     value.then(val => {
//         const {value, done} = runFn.next(val);
//         console.log(done, value);
//     })
// });

function next(runFn, val) {
    const {value, done} = runFn.next(val);
    if (done) {
        return;
    }
    value.then(val => {
        next(runFn, val);
    })
}

// async/awiat Promise 语法糖
// generator + co(next)