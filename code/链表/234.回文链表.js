/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    const arr = []
    let p = head
    while(p){
        arr.push(p.val)
        p = p.next
    }

    while(arr.length > 1){
        let first = arr.shift()
        let last = arr.pop()
        if(first !== last){
            return false
        }
    }
    return true
};