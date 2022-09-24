// class 是如何实现的？
// class 是 ES6 新推出的关键字，它是一个语法糖，本质上就是基于这个原型实现的。只不过在以前 ES5 原型实现的基础上，添加了一些 *_classCallCheck、defineProperties、createClass*等方法来做出了一些特殊的处理。

class Hello {
   constructor(x) {
       this.x = x;
   }
   greet() {
       console.log("Hello, " + this.x)
   }
}



"use strict";

function _classCallCheck(instance, Constructor) {
     if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
     }
}

function _defineProperties(target, props) {
     for (var i = 0; i < props.length; i++) {
         var descriptor = props[i];
         descriptor.enumerable = descriptor.enumerable || false;
         descriptor.configurable = true;
         if ("value" in descriptor)
             descriptor.writable = true;
         Object.defineProperty(target, descriptor.key, descriptor);
     }
}

function _createClass(Constructor, protoProps, staticProps) {
     console.log("Constructor::",Constructor);
     console.log("protoProps::",protoProps);
     console.log("staticProps::",staticProps);
     if (protoProps)
         _defineProperties(Constructor.prototype, protoProps);
     if (staticProps)
         _defineProperties(Constructor, staticProps);
     return Constructor;
}

var Hello = /*#__PURE__*/function () {
   function Hello(x) {
       _classCallCheck(this, Hello);

       this.x = x;
   }

   _createClass(Hello, [{
       key: "greet",
       value: function greet() {
         console.log("Hello, " + this.x);
       }
 	}]);

 	return Hello;
}();