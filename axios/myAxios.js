// 分别使用以下方法调用，查看myaxios的效果
// axios.post('/postAxios', {
//     name: '小美post'
// }).then(res => {
//     console.log('postAxios 成功响应', res);
// })

// axios({
//     method: 'post',
//     url: '/getAxios'
// }).then(res => {
//     console.log('getAxios 成功响应', res);
// })



class Axios {
    constructor() {

    }

    request(config) {
        return new Promise(resolve => {
            const {
                url = '', method = 'get', data = {}
            } = config
            // 发送ajax请求
            const xhr = new XMLHttpRequest()
            xhr.open(method, url, true)
            xhr.onload = function () {
                console.log(xhr.responseText)
                resolve(xhr.responseText)
            }
            xhr.send(data)
        })
    }
}
// 定义get,post...方法，挂在到Axios原型上
// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.options(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])
const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post']

methodsArr.forEach(method => {
    Axios.prototype[method] = function (url, data = {}, config = {}) {
        console.log(`执行了${method}方法`)
        // 2个参数(url[, config])
        if (['get', 'delete', 'head', 'options'].includes(method)) {
            // TODO:这里为什么不写data？
            return this.request({
                method,
                url,
                // data
                ...arguments[1] || {}
            })
        } else {
            // 3个参数(url[,data[,config]])
            return this.request({
                method,
                url,
                data,
                ...arguments[2] || {}
            })
        }
    }

})

const utils = {
    extend (target, origin, context) { 
        for (let key in origin) { 
            if (origin.hasOwnProperty(key)) { 
                target[key] = origin[key].bind(context)
            } else {
                target[key] = origin[key]
            }
        }
    }
}

function CreateAxiosFn() {
    let axios = new Axios()
    // 问题：为啥导出的是axios的request方法，而不是单独写一个？
    let req = axios.request.bind(axios)
    utils.extend(req, Axios.prototype, axios)
    return req
}

// 得到最后的全局变量axios
let axios = CreateAxiosFn();