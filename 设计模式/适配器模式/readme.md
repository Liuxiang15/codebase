## 适配器模式
将一个类的接口转化为另外一个接口，以满足用户需求，使类之间接口不兼容问题通过适配器得以解决。

### 优点

可以让任何两个没有关联的类一起运行。
提高了类的复用。
适配对象，适配库，适配数据

### 缺点

额外对象的创建，非直接调用，存在一定的开销（且不像代理模式在某些功能点上可实现性能优化)
如果没必要使用适配器模式的话，可以考虑重构，如果使用的话，尽量把文档完善

### 场景

- 整合第三方SDK
- 封装旧接口

```php
// 自己封装的ajax， 使用方式如下
ajax({
    url: '/getData',
    type: 'Post',
    dataType: 'json',
    data: {
        test: 111
    }
}).done(function() {})
// 因为历史原因，代码中全都是：
// $.ajax({....})

// 做一层适配器
var $ = {
    ajax: function (options) {
        return ajax(options)
    }
}

```

- vue的computed
```vue
<template>
    <div id="example">
        <p>Original message: "{{ message }}"</p>  <!-- Hello -->
        <p>Computed reversed message: "{{ reversedMessage }}"</p>  <!-- olleH -->
    </div>
</template>
<script type='text/javascript'>
    export default {
        name: 'demo',
        data() {
            return {
                message: 'Hello'
            }
        },
        computed: {
            reversedMessage: function() {
                return this.message.split('').reverse().join('')
            }
        }
    }

</script>


```
