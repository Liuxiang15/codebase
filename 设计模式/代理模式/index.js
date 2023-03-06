// 本体
var domImage = (function () {
  var imgEle = document.createElement('img');
  document.body.appendChild(imgEle);
  return {
    setSrc: function (src) {
      imgEle.src = src;
    }
  };
})();

// 代理
var proxyImage = (function () {
  var img = new Image();
  img.onload = function () {
    domImage.setSrc(this.src); // 图片加载完设置真实图片src
  };
  return {
    setSrc: function (src) {
      domImage.setSrc('./loading.gif'); // 预先设置图片src为loading图
      img.src = src;
    }
  };
})();

// 外部调用
proxyImage.setSrc('./product.png');