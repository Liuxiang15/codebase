/**
 * @param {number} n
 * @return {string[]}
 */
var findStrobogrammatic = function(n) {
    const result = helper(n, n)
    return result
};
function helper(n, m){
    if(m==0){
        return [""]
    }
    if(m===1){
        return ["0","1","8"]
    }
    const lowerResult = helper(n, m-2)
    const result = []
    for(let item of lowerResult){
        if(m !== n){
            result.push("0"+item+"0")
        }
        result.push("1"+item+"1")
        result.push("6"+item+"9")
        result.push("8"+item+"8")
        result.push("9"+item+"6")
    }
    return result
}