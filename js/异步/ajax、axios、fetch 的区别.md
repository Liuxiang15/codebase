*ajax、axios、fetch* 的区别

> 参考答案：
>
> *ajax* 是指一种创建交互式网页应用的网页开发技术，并且可以做到无需重新加载整个网页的情况下，能够更新部分网页，也叫作局部更新。
>
> 使用 *ajax* 发送请求是依靠于一个对象，叫 *XmlHttpRequest* 对象，通过这个对象我们可以从服务器获取到数据，然后再渲染到我们的页面上。现在几乎所有的浏览器都有这个对象，只有 *IE7* 以下的没有，而是通过 *ActiveXObject* 这个对象来创建的。
>
> *Fetch* 是 *ajax* 非常好的一个替代品，基于 *Promise* 设计，使用 *Fetch* 来获取数据时，会返回给我们一个 *Pormise* 对象，但是 *Fetch* 是一个低层次的 *API*，想要很好的使用 *Fetch*，需要做一些封装处理。
>
> 下面是 *Fetch* 的一些缺点
>
> - *Fetch* 只对网络请求报错，对 *400，500* 都当做成功的请求，需要封装去处理
 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false），仅当网络故障时或请求被阻止时，才会标记为 reject。
> - *Fetch* 默认不会带 *cookie*，需要添加配置项。
fetch 不会发送跨域 cookie，除非你使用了 credentials 的初始化选项。
> - *Fetch* 不支持 *abort*，不支持超时控制，使用 *setTimeout* 及 *Promise.reject* 的实现超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费。
> - *Fetch* 没有办法原生监测请求的进度，而 *XHR* 可以。
>
> *Vue2.0* 之后，*axios* 开始受到更多的欢迎了。其实 *axios* 也是对原生 *XHR* 的一种封装，不过是 *Promise* 实现版本。它可以用于浏览器和 *nodejs* 的 *HTTP* 客户端，符合最新的 *ES* 规范。

