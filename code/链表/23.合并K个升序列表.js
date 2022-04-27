/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if(!lists.length) return null
    if(lists.length == 1){
        return lists[0]
    }
    let new_head = lists[0]
    for(let i = 0; i < lists.length-1; i++){
        new_head =  merge(new_head, lists[i+1])
    }
    return new_head

};

function merge(l1, l2){
    // 处理l1为空
    if(!l1){
        return l2
    }
    // 处理l2为空
    if(!l2){
        return l1
    }
    let new_head = null, head = null;
    // 处理l1, l2都不为空
    while(l1 && l2){
        if(l1.val < l2.val){
            if(!head){
                new_head = l1;
                head = l1;
            } else {
                new_head.next = l1
                new_head = new_head.next
            }
            l1 = l1.next
        } else {
            if(!head){
                new_head = l2;
                head = l2;
            } else {
                new_head.next = l2;
                new_head = new_head.next
            }
            l2 = l2.next
        }
    }
    new_head.next = l1 ? l1 : l2
    return head
}