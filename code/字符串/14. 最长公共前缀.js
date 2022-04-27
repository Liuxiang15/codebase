/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let commonStr = strs[0]
    for(let i = 0; i < strs.length-1; i++){
        commonStr = longestCommonPrefixIn2(commonStr, strs[i+1]) 
    }
    return commonStr
};

function longestCommonPrefixIn2(str1, str2){
    let i = 0, j = 0;
    while(i < str1.length && j < str2.length && str1[i] === str2[j]){
        i++;
        j++
    }
    return str1.slice(0, i)
}
