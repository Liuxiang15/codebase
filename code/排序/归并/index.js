
/**
 * 
 * @param {*} arr1 
 * @param {*} arr2 
 * @returns 从小到大的正序数组
 */
function merge (arr1, arr2) {
    const result = []
    while (arr1.length && arr2.length) {
        result.push(arr1[0] > arr2[0] ? arr2.shift() : arr1.shift())
    }
    return [...result, ...arr1, ...arr2]
}
// const res = merge([1, 3, 4], [2, 5, 6])
// console.log(res);

function mergeSort (arr) {
    if (!arr.length) { return arr}
    if (arr.length == 1) return arr[0]
    while (arr.length >= 2) {
        const arr_item1 = arr.shift()
        const arr_item2 = arr.shift()
        const mergeArr = merge(arr_item1, arr_item2)
        arr.push(mergeArr)
    }
    return arr[0]
    
}

let arr1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 2, 3], [4, 5, 6]];
let arr2 = [[1, 4, 6], [7, 8, 10], [2, 6, 9], [3, 7, 13], [1, 5, 12]];
console.log(mergeSort(arr1))
console.log(mergeSort(arr2))
