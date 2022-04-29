/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // 记录父指针
    const father_map = new Map()
   function deps(root){
        if(root.left){
            // father_map[root.left] = root
            father_map.set(root.left, root)
            deps(root.left)
        }
        if(root.right){
            father_map.set(root.right, root)
            // father_map[root.right] = root
            deps(root.right)
        }
    }
    deps(root)
    // 找p的祖先
    const pParents = []
    while(p){
        console.log('p1', p.val)
        pParents.push(p)
        // p = father_map[p]
        p = father_map.get(p)
    }
    console.log(pParents)
    while(q){
        if(pParents.includes(q)) return q
        q = father_map.get(q)
    }
    return null
};

// function deps(root){
//     // 记录父指针
//     const father_map = {}
//     if(root.left){
//         father_map[root.left] = root
//         deps(root.left)
//     }
//     if(root.right){
//         father_map[root.right] = root
//         deps(root.right)
//     }
// }

// function deps(root, p){
//     const visited = []
//     let temp = root
//     while(temp){
//         visited.push(temp)
//         console.log(temp.val)
//         if(p.val > temp.val){
//             temp = temp.left;
//         } else if(p.val < temp.val){
//             temp = temp.right
//         } else {
//             return visited
//         }
//     }
//     return visited
    
// }