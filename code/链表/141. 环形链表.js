/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if(!head || !head.next) return false
    let slower = head, faster = head;
    while(faster && faster.next){
        slower = slower.next;
        faster = faster.next.next;
        if(slower == faster){
            // 快指针追上了慢指针
            return true
        }
    }
    return false
};