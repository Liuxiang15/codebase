请简述 ES6 代码转成 ES5 代码的实现思路。

参考答案：
 
说到 ES6 代码转成 ES5 代码，我们肯定会想到 Babel。所以，我们可以参考 Babel 的实现方式。
 
那么 Babel 是如何把 ES6 转成 ES5 呢，其大致分为三步：
 
● 将代码字符串解析成抽象语法树，即所谓的 AST
● 对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
● 根据处理后的 AST 再生成代码字符串
