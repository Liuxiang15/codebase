let $ = jquery =  (function (window) {
    let jquery = function (nodeSelector) {
        this.nodes = document.querySelectorAll(nodeSelector)
    }
    // 原型方法
    jquery.prototype = {
        each: function (callback) {
            for (let i = 0; i < this.nodes.length; i++) {
                callback.call(this, i, this.nodes[i])
            }
        },
        addClass: function (classes) {
            let className = classes.split(' ')
            // 循环class
            className.forEach(value => {
                this.each(function (index, obj) {
                    obj.classList.add(value)
                })
            })
        },
        setText: function (text) {
            this.each(function (index, obj) {
                obj.textContent = text
            })
        }
    }   
    return function (nodeSelector) {
        return new jquery(nodeSelector)
    }
}(window))