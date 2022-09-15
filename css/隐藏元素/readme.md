


### 12. 隐藏页面中的某个元素的方法有哪些？

> 参考答案：
>
> 1. 隐藏类型
>
> 屏幕并不是唯一的输出机制，比如说屏幕上看不见的元素（隐藏的元素），其中一些依然能够被读屏软件阅读出来（因为读屏软件依赖于可访问性树来阐述）。为了消除它们之间的歧义，我们将其归为三大类：
>
> - 完全隐藏：元素从渲染树中消失，不占据空间。
> - 视觉上的隐藏：屏幕中不可见，占据空间。
> - 语义上的隐藏：读屏软件不可读，但正常占据空间。
>
> **完全隐藏**
>
> (1) display 属性
>
> ```css
> display: none;
> ```
>
> (2) hidden 属性
> HTML5 新增属性，相当于 display: none
>
> ```html
> <div hidden>
> </div>
> ```
>
> **视觉上的隐藏**
>
> (1) 设置 posoition 为 absolute 或 fixed，通过设置 top、left 等值，将其移出可视区域。
>
> ```css
> position:absolute;
> left: -99999px;
> ```
>
> (2) 设置 position 为 relative，通过设置 top、left 等值，将其移出可视区域。
>
> ```css
> position: relative;
> left: -99999px;
> height: 0
> ```
>
> (3) 设置 margin 值，将其移出可视区域范围（可视区域占位）。
>
> ```js
> margin-left: -99999px;
> height: 0;
> ```
>
> 结构： 
>        display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，              visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击 
        opacity: 0:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击 
>        继承： 
>        display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 
        visibility:hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。      
>        性能： 
>        displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大 visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility:
        hidden元素内容 opacity: 0 ： 修改元素会造成重绘，性能消耗较少
> 
> **语义上隐藏**
>
> *aria-hidden 属性*
>
> 读屏软件不可读，占据空间，可见。
>
> ```js
> <div aria-hidden="true">
> </div>
> ```

