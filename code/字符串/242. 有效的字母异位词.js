/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    const sCharArr = [];
    const aAscii = "a".charCodeAt(0)
    for(let i = 0; i < s.length; i++){
        const curIndex = s.charCodeAt(i) -aAscii
        sCharArr[curIndex] = sCharArr[curIndex] ? (sCharArr[curIndex]+1) : 1;
    }
    for(let i = 0; i < t.length; i++){
        const curIndex = t.charCodeAt(i)-aAscii
        if(!sCharArr[curIndex]){
            return false;
        }
        sCharArr[curIndex] -= 1;
    }
    return sCharArr.every(item => item==0)
};