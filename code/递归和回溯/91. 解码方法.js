/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if (s[0] === "0") {
    return 0
  }
  const historyList = []
  const count = decode(s, s.length - 1, historyList)
  return count
}

function decode(s, index, historyList) {
  // 处理到第一个字符，只有1种解码方法，注意，他不可能为0

  if (index <= 0) {
    return 1
  }
  const curHistory = historyList[index]
  if(curHistory !== undefined){
      return curHistory
  }
  let count = 0
  const curr = s[index],
  prev = s[index - 1]
  // 当前字符比 “0” 大，则直接利用它之前的字符串所求得当前字符单独解码的结果数
  
  if (curr > "0") {
    count += decode(s, index - 1, historyList)
  }
  // 由前一个字符和当前字符所构成的数字，值必须要在 1 到 26 之间，否则无法进行解码
  if (prev === "1" || (prev === "2" && curr <= "6")) {
    count += decode(s, index - 2, historyList)
  }
  historyList[index] = count
  return count
}