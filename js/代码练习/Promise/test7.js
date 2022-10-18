// 很难
Promise.resolve().then(() => {
    console.log(0); // 微1
    // return 4

    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);// 微1
}).then(() => {
    console.log(2);// 微2
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

// 解析：
 
// 照着代码，我们先来看初始任务。
 
//  （初始任务）第一部分 Promise.resolve() 返回 「Promise { undefined }」。 
//  （同任务，下同）继续调用 then，then 发现「Promise { undefined }」已解决，直接 enqueue 包含 console.log(0);return Promise.resolve(4) 的任务，之后返回新的「Promise { <pending> }」（设为 promise0）。被 enqueue 的任务之后会引发 promise0 的 resolve/reject，详见 追加任务一 的 2. 3. 。 
//  继续调用 promise0 上的 then，第二个 then 发现 promise0 还在 pending，因此不能直接 enqueue 新任务，而是将包含 console.log(res) 回调追加到 promise0 的 PromiseFulfillReactions 列表尾部，并返回新的「Promise {  }」（设为 promiseRes）（该返回值在代码中被丢弃，但不影响整个过程）。 
//  第二部分 Promise.resolve().then... 同理，只有包含 console.log(1) 的任务被 enqueue。中间结果分别设为 promise1（=Promise.resolve().then(() => {console.log(1);})）, promise2, promise3, promise5, promise6。当前任务执行完毕。 
 
// 此时，任务列队上有两个新任务，分别包含有 console.log(0);return Promise.resolve(4) 和 console.log(1) 。我们用 「Job { ??? }」来指代。
 
// 接下来，「Job { console.log(0);return Promise.resolve(4) }」先被 enqueue，所以先运行「Job { console.log(0);return Promise.resolve(4) }」。
 
//  （追加任务一）此时「0」被 console.log(0) 输出。Promise.resolve(4) 返回已解决的「Promise { 4 }」，然后 return Promise.resolve(4) 将这个「Promise { 4 }」作为最开始的 Promise.resolve().then（对应 promise0）的 onfulfill 处理程序（即 then(onfulfill, onreject) 的参数 onfulfill）的返回值返回。 
//  （同任务，下同）onfulfill 处理程序返回，触发了 promise0 的 Promise Resolve Function（以下简称某 promise（实例）的 resolve）。所谓触发，其实是和别的东西一起打包到「Job { console.log(0);return Promise.resolve(4) }」当中，按流程执行，onfulfill 返回后自然就到它了。（onfulfill 抛异常的话会被捕获并触发 reject，正常返回就是 resolve。） 
//  promise0 的 resolve 检查 onfulfill 的返回值，发现该值包含可调用的「then」属性。这是当然的，因为是「Promise { 4 }」。无论该 Promise 实例是否解决，都将 enqueue 一个新任务包含调用该返回值的 then 的任务（即规范中的 NewPromiseResolveThenableJob(promiseToResolve, thenable, then)）。而这个任务才会触发后续操作，在本例中，最终会将 promise0 的 PromiseFulfillReactions （其中有包含 console.log(res) 回调）再打包成任务 enqueue 到任务列队上。当前任务执行完毕。 
 
// 此时，任务列队上还是有两个任务（一进一出），「Job { console.log(1) }」和「NewPromiseResolveThenableJob(promise0, 「Promise { 4 }」, 「Promise { 4 }」.then)」。接下来执行「Job { console.log(1) }」。
 
//  （追加任务二）「1」被输出。 
//  （同任务，下同）onfulfill 处理程序返回 undefined。（JavaScript 的函数默认就是返回 undefined。） 
//  promise1 的 resolve 发现 undefined 连 Object 都不是，自然不会有 then，所以将 undefined 作为 promise1 的解决结果。即 promise1 从「Promise { <pending> }」变为 「Promise { undefined }」（fulfill）。 
//  resolve 继续查看 promise1 的 PromiseFulfillReactions。（reject 则会查看 PromiseRejectReactions。）有一个之前被 promise1.then 调用追加上的包含 console.log(2) 的回调。打包成任务入列。（如有多个则依次序分别打包入列。）当前任务执行完毕。 
 
// 此时，任务列队上仍然有两个任务（一进一出）。「NewPromiseResolveThenableJob(...)」和 「Job { console.log(2) }」。执行「NewPromiseResolveThenableJob(...)」。
 
//  （追加任务三）调用 「Promise { 4 }」的 then。这个调用的参数（处理程序 onfulfill 和 onreject） 用的正是 promise0 的 resolve 和 reject。 
//  由于「Promise { 4 }」的 then 是标准的，行为和其他的 then 一致。（可参见初始任务的步骤 2. 。）它发现「Promise { 4 }」已解决，结果是 4。于是直接 enqueue 包含 promise0 的 resolve 的任务，参数是 4。理论上同样返回一个「Promise {  }」，由于是在内部，不被外部观察，也不产生别的影响。）当前任务执行完毕。 
 
// 此时，任务列队上依旧有两个任务（一进一出）。「Job { console.log(2) }」和 「Job { promise0 的 resolve }」。执行「Job { console.log(2) }」。
 
// （追加任务四）过程类似「Job { console.log(1) }」的执行。「2」被输出。「Job { console.log(3) }」入列。其余不再赘述。当前任务执行完毕。
 
// 此时，任务列队上依然有两个任务（一进一出）。「Job { promise0 的 resolve }」和「Job { console.log(3) }」。执行「Job { promise0 的 resolve }」。
 
// （追加任务五）promise0 的 resolve 查看 PromiseFulfillReactions 发现有被 promise0.then 追加的回调。打包成任务入列。该任务包含 console.log(res)，其中传递 promise0 解决结果 4 给参数 res。当前任务执行完毕。
 
// 此时，任务列队上还是两个任务（一进一出）。「Job { console.log(3) }」和「Job { console.log(res) }」。
 
// （追加任务六）输出「3」。「Job { console.log(5) }」入列。
 
// 此时，任务列队上还是两个任务（一进一出）。「Job { console.log(res) }」和「Job { console.log(5) }」。
 
// （追加任务七）输出「4」。由于 promiseRes 没有被 then 追加回调。就此打住。
 
// 此时，任务列队上终于不再是两个任务了。下剩「Job { console.log(5) }」。
 
// （追加任务八）输出「5」。「Job { console.log(6) }」入列。
 
// 最后一个任务（追加任务九）输出「6」。任务列队清空。
 
// 因此，输出的顺序是「0 1 2 3 4 5 6」。
 
// 总结一下，除去初始任务，总共 enqueue 了 9 个任务。其中，第一串 Promise + then... enqueue 了 4 个。第二串 Promise + then... enqueue 了 5 个。分析可知，每增加一个 then 就会增加一个任务入列。
 
// 而且，第一串的 return Promise.resolve(4) 的写法额外 enqueue 了 2 个任务，分别在 promise0 的 resolve 时（追加任务一 3.）和调用「Promise { 4 }」的 then 本身时（追加任务三 2.）。
 
// 根据规范，它就该这样。说不上什么巧合，可以算是有意为之。处理程序里返回 thenable 对象就会导致增加两个任务入列。