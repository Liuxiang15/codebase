// 我的写法，只能对196/201
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
 * @return {number}
 */
var countUnivalSubtrees = function(root) {
    if(!root) return 0;
    const total_dict = {total:0}
    root.left && countUnivalSubtrees(root.left)
    root.right && countUnivalSubtrees(root.right)
    isUnivalTree(root, total_dict)
    return total_dict.total
};

/**
 * @param {TreeNode} root
 * @return {Array} [true, val] 第一个元素表示是否是同值子树，第二个参数表示这个相同的值
 */
function isUnivalTree(root, total_dict){
    if(!root){
        return [true, -1]
    }
    if(!root.left && !root.right){
        total_dict.total += 1
        return [true, root.val]
    }
    // if(!root.left && root.right && root.val===root.right.val){
    //     total_dict.total += 1
    //     return [true, root.val]
    // }
    // if(!root.right && root.left && root.val===root.left.val){
    //     total_dict.total += 1
    //     return [true, root.val]
    // }

    const [leftIsUnivalTree, leftComVal] = isUnivalTree(root.left, total_dict)
    const [rightIsUnivalTree, rightComVal] = isUnivalTree(root.right, total_dict)
    if(leftIsUnivalTree && rightIsUnivalTree && leftComVal===rightComVal && leftComVal===root.val){
        total_dict.total += 1
        return [true, root.val]
    } 
    return [false, -2]
    
}

// 全部通过代码1(推荐)
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countUnivalSubtrees = function(root) {
    const total_dict = {total:0}
    dfs(root,  total_dict);
    return total_dict.total
};

/**
 * @param {TreeNode} root
 * @return {Boolean} 
 */
function dfs(root,  total_dict){
    if(!root) return true
    const leftIsUnivalTree = dfs(root.left, total_dict);  
    const rightIsUnivalTree = dfs(root.right, total_dict);  
    // cur指以root为根的树是不是所有值相同
    let cur = true;
    // 判断不为空的子树的值
    if (root.left != null && root.left.val != root.val) cur = false;
    if (root.right != null && root.right.val != root.val) cur = false;
    cur = cur && leftIsUnivalTree && rightIsUnivalTree;
    if (cur) total_dict.total+=1;
    return cur;
}




// 全部通过代码2
/**
 * @param {TreeNode} root
 * @return {Boolean} 
 */
function dfs(root, preVal, total_dict){
    if(!root) return true
    // leftIsUnivalTree不仅指的是左子树是否是同值子树，同时是否与上层根节点是否相同
    // 全部相同才返回true
    const leftIsUnivalTree = dfs(root.left, root.val, total_dict);  
    const rightIsUnivalTree = dfs(root.right, root.val, total_dict);  
    if (leftIsUnivalTree && rightIsUnivalTree) {
        total_dict.total++;
        // 注意：这里left && right的时候，只加了一次，是因为在叶子结点的时候已经加过了
        // 返回的boolean表示上层根节点与当前子树是否一致
        return root.val == preVal;
    }
    return false;
}