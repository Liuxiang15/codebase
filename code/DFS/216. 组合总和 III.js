/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    const res = []
    const box = new Array(k+1).fill(0); 
    const visited = new Array(n+1).fill(false); 
    dfs(1, n, k, res, box, visited);
    return res;
};
const sum = lst => lst.reduce((cur, prev)=> cur+prev)
function dfs(step, n, k, res, box, visited){
    if(step > k){
        if(sum(box) === n) {
            res.push([...box].slice(1))
        }
        return
    }
    for(let i = box[step-1]+1; i <= n; i++){
        if(i > 9) return
        if(visited[i]) continue
        box[step] = i
        visited[i] = true
        dfs(step+1, n, k, res, box, visited) 
        box[step] = i
        visited[i] = false
    }
}