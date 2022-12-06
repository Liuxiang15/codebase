/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
    const stack = []
    const returnArr = []
    for(let i = 0; i < temperatures.length; i++){
        returnArr[i] = 0;
    }
    for(let i = 0; i < temperatures.length; i++){
        if(!stack.length){
            stack.push(i)
            continue
        }
        let topIndex = stack[stack.length-1]
        // 这里一直找到不大于的就出栈
        while(temperatures[i] > temperatures[topIndex]){
            stack.pop()
            returnArr[topIndex] = i-topIndex;
            topIndex = stack[stack.length-1]
        }
        stack.push(i)
    }
    
   return  returnArr;
};