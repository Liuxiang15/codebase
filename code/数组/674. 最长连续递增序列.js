/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
 if(nums.length === 1) return 1
 let left = 0, right = 1;
 let maxLen = 1;
 let curLen = 1;
 while(right < nums.length){
     if(nums[right] > nums[left]){
         curLen += 1
         if(curLen > maxLen) {
             maxLen = curLen    
         }
     } else {
         curLen = 1
     }
     right ++
     left++
 }
 return maxLen
};