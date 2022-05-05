function throttle(fn, wait) {
    let timer = null;
    return function(...args) {
        // 如果没有开启定时器，开启一个
        if (!timer) {
            fn.apply(this,args)
            timer = setTimeout(function () {
                // 执行完fn后将定时器timer清空
                timer = null;
            }, wait); 
        }
    }
}
