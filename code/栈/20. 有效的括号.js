/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = []
    const leftOperators = ['(', '[', '{']
    const rightLeftMap = {
        ')':'(', 
        ']':'[',
        '}':'{'
    }
    for(let i = 0 ; i < s.length; i++){
        if(leftOperators.includes(s[i])){
            stack.push(s[i])
        } else {
            if(stack[stack.length-1] !== rightLeftMap[s[i]]){
                return false
            } 
            stack.pop()
        }
    }
    return stack.length === 0
};