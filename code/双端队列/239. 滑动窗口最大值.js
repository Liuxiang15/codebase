// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number[]}
//  */
// var maxSlidingWindow = function(nums, k) {
//     const de que = [] // 存储元素的索引，待会可以找队首索引
//     const res = []
//     // 最大元素始终在队首
//     for(i=0; i<nums.length; i++){
//         // 1、队列为空不比较
//         if(!deque.length){
//             deque.push(i)
//             if(i+1>=k){
//                 res.push(nums[deque[i]])
//             } 
//             continue
//         }
//         // 2、队列不为空需要比较
//         let tail = nums[deque[deque.length-1]]  // 队尾元素
//         const cur = nums[i]
       
//         // 处理大的情况,把队尾比我小的数字全部出队
//         while(cur > tail){
//             deque.pop()
//             if(!deque.length) {
//                 break
//             }
//             tail = nums[deque[deque.length-1]]  // 队尾元素
//         }

//         // 当前元素是一定要入队的
//         deque.push(i)
        
//         // 判断队列里维护的索引相差是否超过k，是的话需要队首出队
//         if(i-deque[0] >= k){
//             deque.shift() // 出队
//         }
//         // 判断什么时候够k个数据了
//         if(i+1>=k){
//             res.push(nums[deque[0]])
//             // deque.shift() // 出队
//         } 
//         console.log(i, deque, res)  
//     }
//     return res;
// };

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    // https://blog.csdn.net/weixin_45142754/article/details/108533193

    if (k > nums.length) return [] // 可删除
    let deque = [], res = [] 
    for (let i = 0; i < nums.length; i++) {
      // 如果nums[i]比栈尾的数大，则弹出
      while (deque.length && deque[deque.length - 1] < nums[i]) {
        deque.pop()
      }
      // nums[i]入队
      deque.push(nums[i])
      // 删除离开窗口的元素，认为此时队首已经超出了k个
      if(deque[0] === nums[i - k]) deque.shift()
      // 推入最大值
      if(i+1 >= k ) res.push(deque[0]) 
  }
  return res

};



