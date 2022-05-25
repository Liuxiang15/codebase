function handleFetchQueue (urls, max, callback) { 
    console.log('enter handleFetchQueue')
    const curRequestArr = [] // 实际请求的数组
    const results = []
    let i = 0
    // 使用递归，而非for循环
    const handleOneRequest = (url) => { 
        i++;
        // 刚进入加进队列
        curRequestArr.push(url)
        console.log('start', i)
        fetch(url).then(res => { 
            results.push(res)
        }).catch(err => { 
            results.push(err)
        }).finally(() => { 
            console.log('end', i)
            // 请求全部完成
            if (results.length === urls.length) {
                callback(results)
                console.log("请求全部完成")
            }
            // 完成1个请求，队列中随便退出一个
            curRequestArr.shift()
            if (curRequestArr.length < max && urls.length) {
                handleOneRequest(urls.shift())
            }
        })
    }
    
    handleOneRequest(urls.shift())
    
}