/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const results = []
    const columns = []
    backtracking(n, 0, columns, results)
    const res = transferToOutput(n, results)
    return res
};

function transferToOutput(n, results){
    const retResults = []
    let singleLine = ""
    for(let i = 0; i < n;i++){
        singleLine += "."
    }
    for(let i = 0; i < results.length; i++){
        const oneResult = []
        for(let i = 0; i < n;i++){
            oneResult.push(singleLine)
        }
        
        // 设置皇后
        for(let j = 0; j < n;j++){
            const curCol = results[i][j]
            // oneResult[j][curCol] = "Q"  // 注意js里面的字符串不能指定位置替换字符
            const temp = oneResult[j].split("")
            temp[curCol] = "Q"
            oneResult[j] = temp.join("")
        }
        retResults.push(oneResult)
    }
    return retResults  
}
/**
 * 通过递归和回溯设定当前行的皇后未知
 * @param {Number} n 共有多少个皇后
 * @param {Number} row 当前的行
 * @param {Array} columns 这行之前的八皇后每行的位置
 */
function backtracking(n, row, columns, results){
    // 是否在前n行都放好了皇后
    if(row===n){
        results.push([...columns]) // 将记录保存起来
        return
    }
    // 尝试着将皇后放置在当前行中的每一列
    for(let col = 0; col < n; col++){
        columns[row] = col;
        // 合法的话就继续到下一行
        if(checkValid(row, col, columns)){
            backtracking(n, row+1, columns, results)
        }
        // 回溯
        columns[row] = -1
    }   
}

/**
 * 检查是否现在合理
 * @param {Number} row 当前的行
 * @param {Number} col 当前的列
 * @param {Array} columns 这行之前的八皇后每行的位置
 */
function checkValid(row, col, columns){
    for(let r = 0; r < row; r++){
        if(columns[r] === col || (row-r)===Math.abs(columns[r]-col)){
            // 当前列已经放了皇后或者有其他行的皇后和当前行在对角线上
            return false
        }
    }
    return true
}