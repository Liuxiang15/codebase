setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})

console.log('console');

// promise
// console
// setTimeout
// 易错点：then没有被输出，因为Promise的参数中没有resolve
