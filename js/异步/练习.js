function test1 () { 
    setTimeout(function () {
        // 宏任务1
        console.log("set1");
        new Promise(function (resolve) {
            resolve();
        }).then(function () {
            new Promise(function (resolve) {
                resolve();
            }).then(function () { // 第二轮微任务1
                console.log("then4");
            })
            console.log('then2');
        })
    });

    new Promise(function (resolve) {
        console.log('pr1'); // pr1
        resolve();
    }).then(function () {
        console.log('then1'); // 微任务1
    });

    setTimeout(function () {
        console.log("set2"); // 宏任务2
    });
    console.log(2);  // 2

    new Promise(function (resolve) {
        resolve(); 
    }).then(function () {
        console.log('then3');// 微任务2
    })
    // 错误答案
    // 第一轮
    // pr1
    // 2
    // // 微任务
    // then1
    // then3
    // // 宏任务
    // set1
    // set2

    // then2
    // then4

    // 这里注意，一个宏任务执行完后，检查当前所有的微任务执行完后，再去执行下一个宏任务

    // 正确输出
    // pr1
    // 2
    // then1
    // then3
    // set1
    // then2
    // then4
    // set2
}

// test1()


function test2 () { 
    async function async1() {
        console.log('async1 start');
        await async2();
        console.log('async1 end');
    }
    async function async2() {
        console.log('async2');
    }
    console.log('script start'); // 同步代码
    setTimeout(function () {
        console.log('setTimeout'); // 宏任务
    }, 0);
    async1();
    new Promise(function (resolve) {
        console.log('promise1'); // 同步代码
        resolve();
    }).then(function () {
        console.log('promise2');  // 微任务
    });
    console.log('script end'); // 同步代码

    // 回答
    // 第一轮
    // 同步代码
    // script start
    // async1 start
    // promise1
    // script end

    // 微任务
    // async2
    // promise2
    // async1 end

    // 宏任务
    // setTimeout

    // 正确答案
    // 同步代码
    // script start
    // async1 start
    // async2
    // promise1
    // script end

    // 微任务
    // async1 end
    // promise2

    // setTimeout

    // 分析
    // 之前我们需要知道以下几点：
    
    // 1、setTimeout 属于宏任务
    // 2、Promise 本身是同步的立即执行函数，Promise.then 属于微任务
    // 3、（重要！！！）async 方法执行时，遇到 await 会立即执行表达式，表达式之后的代码放到微任务执行
    // 联想async和await的原理


}

test2()