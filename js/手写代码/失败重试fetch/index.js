// 实现一个函数,对一个url进行请求,失败就再次请求,超过最大次数就走失败回调,任何一次成功都走成功回调
/**
    @params url: 请求接口地址;
    @params body: 设置的请求体;
    @params succ: 请求成功后的回调
    @params error: 请求失败后的回调
    @params maxCount: 设置请求的数量
*/

// function request_try_max_times (url, body = {}, succ, error, maxCount = 5) {
//     if (maxCount <= 0) return error(`到达超过重试次数`)
//     console.log('request_try_max_times');
//     return fetch(url, body).then(res => succ(res)).catch(err => { 
//         console.log(`尝试1次`)
//         return request_try_max_times (url, body, succ, error, maxCount-1)
//     })
// }

/**
    @params url: 请求接口地址;
    @params body: 设置的请求体;
    @params succ: 请求成功后的回调
    @params error: 请求失败后的回调
    @params maxCount: 设置请求的数量
*/

function request_try_max_times (url, body = {}, succ, error, maxCount = 5) {
    maxCount-=1
    return fetch(url, body)
        .then(res => succ(res))
        .catch(err => {
            return (maxCount <= 0) ? error('请求超时') : request_try_max_times(url, body, succ, error, maxCount);
        });
}
// 调用请求函数
request_try_max_times('https://java.some.com/pc/reqCount', {method: 'GET' },
    (res) => {
        console.log(res.data);
    },
    (err) => {
        console.log(err);
    })