let arr = [1, [2, 3, [4, 5, [12, 3, "zs"], 7, [8, 9, [10, 11, [1, 2, [3, 4]]]]]]];


Array.prototype.myFlat = function (num) {
    //创建一个新数组，用于保存拆分后的数组
    let result = [];
    for (let i = 0; i < this.length; i++){
        if (Array.isArray(this[i])) {
            // 这里要根据num判断是否需要展开
            if (num <= 0) { 
                // 不需要展开，直接push
                result.push(this[i])
            } else {
                // 注意，因为返回的是一个数组，这里push的应该是展开后的数组元素
                result.push(...this[i].myFlat(num-1))
            }            
        } else {
            result.push(this[i])
        }
    }
    return result
}

console.log(arr.flat(Infinity)); //[1, 2, 3, 4, 5, 12, 3, "zs", 7, 8, 9, 10, 11, 1, 2, 3, 4];

console.log(arr.myFlat(Infinity)); //[1, 2, 3, 4, 5, 12, 3, "zs", 7, 8, 9, 10, 11, 1, 2, 3, 4];