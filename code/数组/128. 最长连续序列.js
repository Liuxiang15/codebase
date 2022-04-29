/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    const map = {};
    nums.forEach(num=>{
        map[num] = true
    })
    const uniqueNums = Array.from(new Set(nums))
    let maxLen = 0
    for(let i = 0; i < uniqueNums.length;i++){
        // 前一位不在的话从这位开始往上加
        if(!map[uniqueNums[i]-1]){
            let curLen = 0
            let curNum = uniqueNums[i]
            while(map[curNum]){
                curLen ++;
                curNum ++;
            }
            if(curLen > maxLen){
                maxLen = curLen
            }
        } 
    }
    return maxLen
    
};