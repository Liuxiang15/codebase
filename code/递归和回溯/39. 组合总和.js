/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const results = []
    backtracking(candidates, target, 0, [], results)
    return results;
};

function backtracking(candidates, target, start, curSolution, results){
    if(target < 0){
        return
    }
    if(target === 0){
        results.push([...curSolution])
        return
    }
    for(let i = start; i < candidates.length; i++){
        curSolution.push(candidates[i])
        backtracking(candidates, target-candidates[i], i, curSolution, results)
        curSolution.pop()
    }
}