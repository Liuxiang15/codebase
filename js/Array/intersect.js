Array.prototype.intersect = function (arr2) {
    //先拷贝
    const arr1_copy = [...this], arr2_copy = [...arr2]; 
    //从小到大排序
    arr1_copy.sort((a, b) => a - b)
    arr2_copy.sort((a, b) => a - b)
    let i = j = 0, len1 = this.length, len2 = arr2.length;
    const result = [];
    while (i < len1 && j < len2) {
        // 循环的条件是两个数组都没有遍历完
        if (arr1_copy[i] < arr2_copy[j]) i++
        else if (arr1_copy[i] > arr2_copy[j]) j++
        else {
            result.push(arr1_copy[i])
            i++;
            j++;
        }
    }
    return result;
}

// 给定两个数组，求交集
console.log([3, 5, 8, 1].intersect([2, 3]));