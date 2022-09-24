// ES6提供的Set结构 new Set() 简单好用 强烈推荐
function noRepeat (arr) {
    return [...new Set(arr)]
}
// ES6提供的Set结构 new Set() 简单好用 强烈推荐
function noRepeat1 (arr) {
    return Array.from(new Set(arr))
}

// filter() 去重
function noRepeat2 (arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

// for 循环 搭配 indexOf 去重
function noRepeat3 (arr) {
    const newArr = []
    for (let i = 0; i < arr.length; i++){
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
        }
    }
    return newArr
}

// for 循环 搭配 includes 去重
function noRepeat4 (arr) {
    const newArr = []
    for (let i = 0; i < arr.length; i++){
        if (!newArr.includes(arr[i])) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
const arr = [1,2,3,4,1,2,3]
console.log(noRepeat(arr))
console.log(noRepeat1(arr))
console.log(noRepeat2(arr))
console.log(noRepeat3(arr))
console.log(noRepeat4(arr))