/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    let a = b =  head;
    // 一定是k的倍数
    for(let i = 0; i < k; i++){
        // 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
        // 所以这个判断写在b = b.next前面
        if(!b)return head
        // 让b后移k位
        b = b.next
    }
    // k个1组的头指针newHead
    const newHead = reverse(a, b)
    // 注意 a此时变成了当前k个中的最后一个
    a.next = reverseKGroup(b, k)
    return newHead
};
/**
 * 在a-b直接的节点进行反转，不包括b
 */
function reverse(a, b){
    let prev=null, cur = a, next = a;
    while(cur != b){
        next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next
    }
    return prev
}