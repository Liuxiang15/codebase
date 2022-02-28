HTML\CSS -> 浏览器内核 -》页面

HTML：
定义页面结构

浏览器：
1. shell：外壳
2. core：内核（JS执行引擎、渲染引擎）

IE: Trident
Firefox: Gecko
Chrome: Webkit / Blink
Safari: Presto
Opera: Presto /Blink


## 版本和兼容性
HTML5、CSS3

HTML5： 2014年

CSS3： 目前为止还没有制定完成


XHTML： 可以认为是HTML的一种一个标准

## 插件安装
1. Live Server



## 元素

整体： element （元素、标签、标记）

元素 = 起始标记 + 结束标记 + 元素内容 + 元素属性

属性 = 属性名 + 属性值

属性的分类：

全局属性
局部属性

```html
<meta charset="UTF-8">
<meta charset="UTF-8"/>
```
没有结束标记， **空元素**

## 元素的嵌套

文档声明
```html
<!DOCTYPE html>
```
文档声明告诉浏览器，当前文档使用的标准是HTML5

不写文档声明，将导致 浏览器 进入怪异渲染模式

```html
<html lang="en">
</html>
```
根元素，一个页面最多只能一个
lang属性：全局 language 

cmn-hans 中文的lang
中国大陆官方用语
简体中文汉字

meta charset: 指定网页内容编码

UTF-8 是 Unicode 编码 的一个版本

兼容  适应手机端
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```


ie浏览器内核 建议使用edge的
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```


