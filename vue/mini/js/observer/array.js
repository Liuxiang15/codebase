const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
  // 缓存原始方法
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      const ob = this.__ob__
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }
      if (inserted) {
        ob.observeArray(inserted)
      }

      // ob.dep.notify()
      // alert(`Array的${method}方法被访问`)
      const res = original.apply(this, args)
      ob.dep.notify()
      return res // 保证数组更新后再通知
      // return original.apply(this, args)
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})