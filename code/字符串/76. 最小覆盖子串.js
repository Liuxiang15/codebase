/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let sLen = s.length, tLen = t.length;
    // 特殊情况先排除
    if(!sLen|| !tLen || sLen < tLen){
        return ''
    }
    // t的字符是固定的，我们先计算
    const tFreq = getFreq(t)  // t的字符-》次数
    let winFreq = {} // 滑动窗口的字符-》次数
    let left=0, right=0;
    let minContainStr = s+" " // 初始化为原始字符串s,多一个字符
    // 滑动窗口内部包含多少T中的字符
    let distance = 0;
    // 【left, right）左开右闭区间，所以right可以取到s.length
    while(right < s.length){
        // 先右移
        let charRight = s[right]
        // charRight不是字符串t中的
        if(tFreq[charRight] === undefined){
            right++;
            continue
        }
        // charRight是字符串t中
        if(winFreq[charRight]=== undefined){
            // charRight不在winFreq
            distance++;
            winFreq[charRight] = 1
        }  else if(winFreq[charRight] < tFreq[charRight]){
            // charRight在winFreq中但是比t小
            distance++;
            winFreq[charRight] ++
        }
        else {
            winFreq[charRight] ++
        }        
        right++
        
        // 接下来如果distance和t的长度相等则左移
        while(distance == t.length){
            let charLeft = s[left]
            if(right-left < minContainStr.length){
                // 左闭右开
                minContainStr = s.slice(left, right)
            }
            // charLeft不在
            if(tFreq[charLeft] === undefined){
                left++;
                continue
            }

            // 只有相等的时候才减
            if(winFreq[charLeft] == tFreq[charLeft]){
                distance--
            }
            winFreq[charLeft]--
            left++
        }

    }
    return minContainStr.length > s.length ? '' : minContainStr
    
};

/**
 * 获取字符串对应的字符-次数字典
 */
function getFreq(t){
    const freq = {}
    for(let i = 0; i < t.length;i++){
        freq[t[i]] = (freq[t[i]] === undefined) ? 1 : (freq[t[i]]+1)
    }
    return freq
}

