/**
 * 我们来模拟一个场景,我们正在开发一个网站,网站类型是一个视频网站
 * 网站有个登录按钮,点击登录会弹出一个登录框进行登录,
 * 你现在可能已经联想到,这个登录框一定是页面唯一的一个dom节点,一个页面存在两个登录框是不存在的!
 * @returns 
 */

var createDiv = function () {
  var div = document.createElement('div')
  div.innerHTML = '我是登录窗口'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}
button.addEventListener('click', function () {
  let div = createDiv()
  div.style.display = 'block'
})

// 这样我们达成了惰性的特征,及需要的时候才进行创建,但是失去了单例效果,频繁的创建删除dom节点也是不合理的地方!我们再结合之前学过的单例特性运用到createDiv函数上进行修改


var createDiv = (function () {
  var instance
  return function () {
    if (!instance) {
      var div = document.createElement('div')
      div.innerHTML = '我是登录窗口'
      div.style.display = 'none'
      document.body.appendChild(div)
      return instance = div
    }
    return instance
  }
})()


// 现在我们得到了完整的惰性加单例,但是!!!!这种函数行为做法其实又是违背单一职责的,假如我们要在页面上创建一个单例iframe标签,是不是又得复制粘贴createDiv函数的内容?
// 利用闭包在进行变量判断返回我们的单例这个过程其实不变的, 这个过程完全可以剥离开来; 最终我们理想代码如下
// 剥离的惰性单例函数
var getSingle = function (fn) {
  var result
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

var createIframe = function () {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  return iframe
}

var createDiv = function () {
  let div = document.createElement('div')
  div.innerHTML = '我是登录窗口'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

let createDivSingle = getSingle(createDiv)
createDivSingle().style.display = 'block'
createDivSingle().style.display = 'block'
createDivSingle().style.display = 'block'
createDivSingle().style.display = 'block'
// 我们调用了好几次页面上依旧只有一个登陆窗口

