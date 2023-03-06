// JavaScript中的单例模式

// 前面的几种实现方式,他们更多接近的传统面向对象语言的实现,对于JavaScript这种无类语言来说有点穿棉衣洗澡,因为传统面向对象语言单例对象从"类"中创建而来
// 而我们天生拥有极简的对象创建方式, 大可不必模仿强类型语言去实现单例, 对没错!

// 我们只需要直接创建对象就是单例模式, 只要做好以下两点
// 1、保证创建的对象是唯一
// 2、并且提供方法给全局使用

// 1.使用命名空间
let MyApp = {
    a:function(){
        console.log('a')
    },
    b:function(){
        console.log('b')
    }
}



// 2.使用闭包特性+命名空间实现变量私有化
let MyApp2 = (function () {
  let _name = 'sven',
    _age = 18
  return {
    getUserInfo () {
      return _name + '-' + _age
    }
  }
})()

MyApp2._name = 'sb' // 尝试修改
console.log(MyApp2.getUserInfo()) // sven-18  没修改成功

