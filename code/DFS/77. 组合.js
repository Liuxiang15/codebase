/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const res = []
    const box = new Array(k+1).fill(0); 
    const visited = new Array(n+1).fill(false); 
    dfs(1, n, k, res, box, visited);
    return res;
};

const sum  = lst => lst.reduce((cur, prev) => cur+prev)
function dfs(step, n, k, res, box, visited){
    if(step > k){
        res.push([...box].slice(1))
        return
    }
    for(let i = box[step-1]+1; i <= n; i++){
        if(visited[i]) continue
        box[step] = i
        visited[i] = true
        dfs(step+1, n, k, res, box, visited) 
        box[step] = i
        visited[i] = false
    }
}