/**
 * 如果期望代码的输出变成 0 -> 1 -> 2 -> 3 -> 4 -> 5，
 * for (var i = 0; i < 5; i++) {
        setTimeout(function() {
            console.log( i);
        }, 1000);
    }

    console.log(i);
 * 并且要求原有的代码块中的循环和两处 console.log 不变，
 * 该怎么改造代码？
 * 新的需求可以精确的描述为：代码执行时，立即输出 0，之后每隔 1 秒依次输出 1,2,3,4，循环结束后在大概第 5 秒的时候输出 5

作者：王仕军
链接：https://juejin.cn/post/6844903474212143117
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
const tasks = []

const output = (i) => new Promise(resolve => { 
    setTimeout(() => { 
        console.log(i)
        resolve()
    }, 1000)
})




async function runTasks () { 
    for (var i = 0; i < 5; i++) {
        // tasks.push(output(i))
        await output(i)
    }
    await output(i)
}
runTasks()



// Promise.all(tasks).then(() => { 
//     setTimeout(() => { 
//         console.log(i)
//     }, 1000)
// })