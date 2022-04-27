/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let originHeadA = headA,
    originHeadB = headB;
    let flagA = false, flagB = false // 表明是否换到另外一个链表
    if(!headA || !headB){
        return null
    }
    // 链表A和链表B加起来是一样长的
    while(true){
        if(headB === headA){
            return headB
        }
        if(headA && headA.next == null){
            if(flagA){
                return null
            } else {
                headA = originHeadB
                flagA = true
            }
        } else {
            headA = headA.next
        }
        if(headB && headB.next == null){
            if(flagB){
                return true
            } else {
                 headB = originHeadA
                 flagB = true
            }
        } else {
            headB = headB.next
        }
    }
    return null
};


// var getIntersectionNode = function(headA, headB) {
//     let reverseA = reverse(headA)
//     let reverseB = reverse(headB)
//     if(reverseA !== reverseB)return null
//     let temp = null
//     while(reverseA){
//         temp = reverseA
//         reverseA = reverseA.next
//         reverseB = reverseB.next
//     }
//     return temp
// };

/**
反转
 */
// function reverse(head){
//     let prev=null, cur = head, next = head;
//     while(cur){
//         next = cur.next
//         cur.next = prev
//         prev = cur
//         cur = next
//     }
//     return prev
// }