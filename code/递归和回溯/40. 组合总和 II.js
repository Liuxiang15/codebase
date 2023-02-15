/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    candidates = candidates.sort((a, b)=>(a-b)) // 从小到大排序
    const ans = []
    dfs(0, [], target, ans, candidates)
    return ans
};
const sum = lst => lst.reduce((preValue, curValue, curIndex, array)=> preValue+curValue)
function dfs(curIndex, curList, target, ans, candidates){
    const curTotal = curList.length ? sum(curList) : 0
    if (curTotal > target){
        return
    }
    if(curTotal == target){
        ans.push([...curList])
        return
    }
    let i = curIndex
    while(i < candidates.length){
        dfs(i+1, [...curList, candidates[i]], target, ans, candidates)
        while(i+1 < candidates.length && candidates[i] == candidates[i+1]){
            i++
        }
        i++
    }

}