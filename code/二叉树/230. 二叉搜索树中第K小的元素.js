// 题目链接：https://leetcode.cn/problems/kth-smallest-element-in-a-bst/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    const middleTraverseArr = []
    middleTraverse(root, middleTraverseArr)
    return middleTraverseArr[k-1]

};
function middleTraverse(root, middleTraverseArr){
    if(root.left) middleTraverse(root.left, middleTraverseArr)
    middleTraverseArr.push(root.val)
    if(root.right) middleTraverse(root.right, middleTraverseArr)
}