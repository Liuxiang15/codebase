function debounce(fun,time){
    let timer
    return function(...args){
        clearTimeout(timer)
        timer=setTimeout(()=>{
          fun.apply(this,args)
        },time)
    }
}
