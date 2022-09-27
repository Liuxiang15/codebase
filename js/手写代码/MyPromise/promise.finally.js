// finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
 
// finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

// finally本质上是then方法的特例。


// promise
// .finally(() => {
//   // 语句
// });

// // 等同于
// promise
// .then(
//   result => {
//     // 语句
//     return result;
//   },
//   error => {
//     // 语句
//     throw error;
//   }
// );

// promise
// .then(result => {···})
// .catch(error => {···})
// .finally(() => {···});

// 上面代码中，如果不使用finally方法，同样的语句需要为成功和失败两种情况各写一次。有了finally方法，则只需要写一次。


Promise.prototype.finally = function (callback) {
    let P = this.constructor; // ???
    return this.then
        (value => P.resolve(callback()).then(() => value),
            reason => P.resolve(callback()).then(() => { throw reason})
    )
}

// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {}).catch(err=>console.log(err))

// reject 的值是 3
Promise.reject(3).finally(() => {}).catch(err=>console.log(err))

