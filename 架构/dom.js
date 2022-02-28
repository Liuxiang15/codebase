(function (window) {
    window.$ = jquery = function (nodeSelector) {
        let nodes = {}
        // 存放东西 node
        let temp = document.querySelectorAll(nodeSelector)
        for (let i = 0; i < temp.length; i++) {
            nodes[i] = temp[i]
        }
        // 类数组
        nodes.length = temp.length
        nodes.addClass = function (classes) {
            let className = classes.split(' ')
            // 循环class
            className.forEach(value => {
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].classList.add(value)
                }
            })
        }
        // 修改text
        nodes.setText = function (text) {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].textContent = text
            }
        }
        return nodes
    }
}(window))