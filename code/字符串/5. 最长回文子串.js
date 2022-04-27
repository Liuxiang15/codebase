/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if(s.length === 0) return s;
    let maxStr = '';
    for(let i = 0; i < s.length; i++){
        // 考虑奇数
        let str1 = palindrome(s, i, i)
        // 考虑偶数
        let str2 = palindrome(s, i, i+1)
        if(str1.length > maxStr.length){
            maxStr = str1;
        }
        if(str2.length > maxStr.length){
            maxStr = str2;
        }
    }
    return maxStr
};

function palindrome(str, left, right){
    while(left >=0 && right < str.length && str[left] === str[right]){
        left--;
        right++;
    }
    // 说明要么left、right超出边界，要么就是左右不相等了
    return str.slice(left+1, right)
}

