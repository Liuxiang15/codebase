// 题目链接：https://leetcode.cn/problems/sort-an-array/
// 部分用例会超时
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    bubbleSort(nums)
    return nums
};

function bubbleSort (nums) { 
    let hasSwap = false;
    for (let i = 0, len=nums.length; i < len; i++) {  // 最多n轮
        hasSwap = false; //是否换过顺序
        for (let j = 0; j < len - i - 1; j++) { 
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]  // 交换
                hasSwap = true
            }
        }
        if (!hasSwap) { 
            return nums
        }
    }
    return nums
}

