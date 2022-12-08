// 题目链接：https://leetcode.cn/problems/sort-an-array/
// 通过全部用例
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    insertSort(nums)
    return nums
};

/**
 * 插入排序
 * 每轮排序将元素插入到合适的位置上
 * @param {*} nums 
 * @returns 
 */
function insertSort (nums) { 
    for (let i = 1, len=nums.length; i < len; i++) {  // 注意i从1开始
        const cur = nums[i]
        for (let j = i-1; j>=0 && nums[j] > cur; j--) { 
            nums[j+1] = nums[j]
        }
        nums[j+1] = cur
    }
    return nums
}

