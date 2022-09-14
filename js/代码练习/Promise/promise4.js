const p = Promise.resolve(4)
async function testA() { 
    return p
}
const retP = testA()
console.log('async函数的返回值retP和p4',retP,p,retP===p);
retP.then(res => { 
    console.log(res)
})
// 输出
// async函数的返回值retP和p4 Promise { <pending> } Promise { 4 } false
// 4
// 易错点：异步的函数的返回值是一个pending的Promise