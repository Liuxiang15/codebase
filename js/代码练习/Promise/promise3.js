const p = Promise.resolve(1)
const callback1 = () => {console.log(1) }
const callback2 = () => { console.log(2);}
const callback3 = () => {console.log(3); }
const a = p.then(callback1)
const b = p.then(callback2)
const c = p.then(callback3)
console.log(a === b)
// 输出
// false
// 1
// 2
// 3
// 易错点：一个Promise可以有多个.then进行处理，并且每个.then的Promise都是不同的
