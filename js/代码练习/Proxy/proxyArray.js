function proxyArray (arr) {
    const len = arr.length;
    return new Proxy(arr, {
        get (target, index) {
            index = +index; //转数字
            // index = (index < 0) ? index + len : index
            while (index < 0) {
                index += len
            }
            return target[index]
        }

    })
}

var a = proxyArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(a[1]);  // 2
console.log(a[-10]);  // 9
console.log(a[-20]);  // 8