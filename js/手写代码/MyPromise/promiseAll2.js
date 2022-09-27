function promiseAll(promises) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('arguments must be an array'));
        }
        var resolvedCounter = 0;
        var promiseNum = promises.length;
        var resolvedValues = new Array(promiseNum);
        for (var i = 0; i < promiseNum; i++) {
            (function (i) {
                Promise.resolve(promises[i]).then(function (value) {
                    resolvedCounter++
                    resolvedValues[i] = value
                    if (resolvedCounter == promiseNum) {
                        return resolve(resolvedValues)
                    }
                }, function (reason) {
                    return reject(reason)
                })
            })(i)
        }
    })
}

function test1 () {
    let p1 = Promise.resolve(1)
    let p2 = 2
    let p3 = Promise.resolve(3)
    promiseAll([p1, p2, p3])
        .then(val => console.log('resolved', val))
        .catch(err => console.log('rejected', err))
    // 输出
    // resolved [ 1, 2, 3 ]
}

test1()

function test2 () {
    let p1 = Promise.resolve(1)
    let p2 = 2
    let p3 = Promise.reject(3)
    promiseAll([p1, p2, p3])
        .then(val => console.log('resolved', val))
        .catch(err => console.log('rejected', err))
    // 输出：rejected 3
}

test2()
