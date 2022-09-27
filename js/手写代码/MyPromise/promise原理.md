
### 147. *Promise* 有几种状态, *Promise* 有什么优缺点 ? 

> 参考答案：
>
> *Promise* 有三种状态：
>
> *pending、fulfilled、rejected*(未决定，履行，拒绝)，同一时间只能存在一种状态，且状态一旦改变就不能再变。*Promise* 是一个构造函数，*promise* 对象代表一项有两种可能结果（成功或失败）的任务，它还持有多个回调，出现不同结果时分别发出相应回调。
>
> - 初始化状态：*pending*
> - 当调用 *resolve*(成功) 状态：*pengding=>fulfilled*
> - 当调用 *reject*(失败) 状态：*pending=>rejected*
>
> *Promise* 的优点是解决了回调地狱，缺点是代码并没有因为新方法的出现而减少，反而变得更加复杂，同时理解难度也加大。所以后面出现了 *async/await* 的异步解决方案。



### 148. *Promise* 构造函数是同步还是异步执行，*then* 呢 ? *Promise* 如何实现 *then* 处理 ? 

> 参考答案：
>
> *promise* 构造函数是同步执行的，*then* 方法是异步执行，*then* 方法中的内容加入微任务中。
>
> 接下来我们来看 *promise* 如何实现 *then* 的处理。
>
> 我们知道 *then* 是用来处理 *resolve* 和 *reject* 函数的回调。那么首先我们来定义 *then* 方法。
>
> ##### 1、then方法需要两个参数，其中onFulfilled代表resolve成功的回调，onRejected代表reject失败的回调。
>
> ```js
> then(onFulfilled,onRejected){}
> ```
>
> ##### 2、我们知道promise的状态是不可逆的，在状态发生改变后，即不可再次更改，只有状态为FULFILLED才会调用onFulfilled，状态为REJECTED调用onRejected
>
> ```js
> then(onFulfilled, onRejected){
>     if (this.status == Promise.FULFILLED) {
>         onFulfilled(this.value)
>     }
>     if (this.status == Promise.REJECTED) {
>         onRejected(this.value)
>     }
> }
> ```
>
> ##### 3、then方法的每个方法都不是必须的，所以我们要处理当没有传递参数时，应该设置默认值
>
> ```js
> then(onFulfilled,onRejected){
>     if(typeof onFulfilled !=='function'){
>         onFulfilled = value => value;
>     }
>     if(typeof onRejected  !=='function'){
>         onRejected = value => value;
>     }
>     if(this.status == Promise.FULFILLED){
>          onFulfilled(this.value)
>     }
>     if(this.status == Promise.REJECTED){
>         onRejected(this.value)
>     }
> }
> ```
>
> ##### 4、在执行then方法时，我们要考虑到传递的函数发生异常的情况，如果函数发生异常，我们应该让它进行错误异常处理，统一交给onRejected来处理错误
>
> ```js
> then(onFulfilled,onRejected){
> 	if(typeof onFulfilled !=='function'){
>         onFulfilled = value => value;
>     }   
>     if(typeof onRejected  !=='function'){
>         onRejected = value => value;
>     }
>     if(this.status == Promise.FULFILLED){
>         try{onFulfilled(this.value)}catch(error){ onRejected(error) }
>     }
>     if(this.status == Promise.REJECTED){
>         try{onRejected(this.value)}catch(error){ onRejected(error) }
>     }
> }
> ```
>
> ##### 5、但是现在我们自己封装的promise有个小问题，我们知道原生的promise中then方法都是异步执行，在一个同步任务执行之后再调用，而我们的现在的情况则是同步调用，因此我们要使用setTimeout来将onFulfilled和onRejected来做异步宏任务执行。
>
> ```js
> if(this.status=Promise.FULFILLED){
>     setTimeout(()=>{
>         try{onFulfilled(this.value)}catch(error){onRejected(error)}
>     })
> }
> if(this.status=Promise.REJECTED){
>     setTimeout(()=>{
>         try{onRejected(this.value)}catch(error){onRejected(error)}
>     })
> }
> ```
>
> ##### 现在then方法中，可以处理status为FULFILLED和REJECTED的情况，但是不能处理为pedding的情况，接下来进行几处修改。
>
> ##### 6、在构造函数中，添加callbacks来保存pending状态时处理函数，当状态改变时循环调用
>
> ```js
> constructor(executor) {
> 	...
>   this.callbacks = [];
>   ...
> }    
> ```
>
> ##### 7、在then方法中，当status等于pending的情况时，将待执行函数存放到callbacks数组中。
>
> ```js
> then(onFulfilled,onRejected){
>     ...
>     if(this.status==Promise.PENDING){
>         this.callbacks.push({
>             onFulfilled:value=>{
>                 try {
>                   onFulfilled(value);
>                 } catch (error) {
>                   onRejected(error);
>                 }
>             }
>             onRejected: value => {
>             try {
>               onRejected(value);
>             } catch (error) {
>               onRejected(error);
>             }
>           }
>         })
>     }
>     ...
> }
> ```
>
> ##### 8、当执行resolve和reject时，在堆callacks数组中的函数进行执行
>
> ```js
> resolve(vale){
>     if(this.status==Promise.PENDING){
>         this.status = Promise.FULFILLED;
>         this.value = value;
>         this.callbacks.map(callback => {
>           callback.onFulfilled(value);
>         });
>     }
> }
> reject(value){
>     if(this.status==Promise.PENDING){
>         this.status = Promise.REJECTED;
>         this.value = value;
>         this.callbacks.map(callback => {
>           callback.onRejected(value);
>         });
>     }
> }
> ```
>
> ##### 9、then方法中，关于处理pending状态时，异步处理的方法：只需要将resolve与reject执行通过setTimeout定义为异步任务
>
> ```js
> resolve(value) {
>   if (this.status == Promise.PENDING) {
>    	this.status = Promise.FULFILLED;
> 	this.value = value;
>     setTimeout(() => {
>       this.callbacks.map(callback => {
>         callback.onFulfilled(value);
>       });
>     });
>   }
> }
> reject(value) {
>   if (this.status == Promise.PENDING) {
>   	this.status = Promise.REJECTED;
>     this.value = value;
>     setTimeout(() => {
>       this.callbacks.map(callback => {
>         callback.onRejected(value);
>       });
>     });
>   }
> }
> ```
>
> 到此，promise的then方法的基本实现就结束了。

