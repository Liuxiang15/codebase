/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0, right = height.length-1,
    maxVal = 0, temp;
    while(left < right){
        // 双指针向中间移动
        // 移动较小的边
        if(height[left] < height[right]){
            temp = (right-left)*height[left]
            maxVal = Math.max(maxVal, temp)
            left++;
        } else {
            temp = (right-left)*height[right]
            maxVal = Math.max(maxVal, temp)
            right--;
        }
    } 
    return maxVal
};