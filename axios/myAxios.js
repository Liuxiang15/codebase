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

    request (config) { 
        return new Promise(resolve => { 
            const { url = '', method = 'get', data = {} } = config
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

function CreateAxiosFn () { 
    let axios = new Axios()
    // 问题：为啥导出的是axios的request方法，而不是单独写一个？
    let req = axios.request.bind(axios)
    return req
}

// 得到最后的全局变量axios
let axios = CreateAxiosFn();