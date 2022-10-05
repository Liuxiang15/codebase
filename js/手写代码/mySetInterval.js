// mySetInterVal(fn, a, b)
// 每次间隔 a, a + b, a + 2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

// 参考答案：
 
// 该题的思路就是每一次在定时器中重启定时器并且在时间每一次都加 b，并且要把定时器返回回来，可以作为myClear的参数。

function mySetInterVal (fn, a, b) { 
    var timer = null
    function setTimer (fn, a, b) { 
        timer = setTimeout(() => { 
            fn()
            setTimer(fn, a+b, b)
        }, a)
    }
    setTimer(fn, a, b)
    return timer
}

var timer = mySetInterVal(() => { console.log('timer') }, 1000, 1000);
var myClear = function (timer) {
  timer && clearTimeout(timer);
}