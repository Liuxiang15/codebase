/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let maxLength=0, curLength = 0, startIndex= 0, map={};
    for(let i = 0; i < s.length; i++){
        if(map[s[i]]===undefined){
            curLength ++
            // 注意这里不是等于1，而是它的下标
            map[s[i]] = i
        } else {
            maxLength =  Math.max(curLength, maxLength)
            // 接着找下一组子串
            // 这里不能直接等于map[i]，因为我们需要的是以startIndex开始算的
            startIndex = Math.max(map[s[i]]+1, startIndex)
            curLength = i - startIndex +1
            map[s[i]] = i
        }
    }
    maxLength = Math.max(curLength, maxLength)
    return maxLength
};