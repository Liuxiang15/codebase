/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(head === null || head.next===null){
        return head
    }
    let new_head = null
    let temp = null
    while(head){
        temp = head
        // head往后移
        head = head.next
        temp.next = new_head
        new_head = temp
    }
    return new_head
};