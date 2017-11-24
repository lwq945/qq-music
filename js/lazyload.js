export function lazyload(images){
    let imgs = [].slice.call(images || document.querySelectorAll('.lazyload')) //Array.from(images)转为数组

    if('IntersectionObserver' in window){
        let observer = new IntersectionObserver(function(entries){  //观察器(兼容性较差),图片出现在视口0.01就观察
            entries.forEach(entry => {
                if(entry.intersectionRatio > 0){ //图片出现在视口，就加载，加载完回调就不再观察
                    loadImage(entry.target,()=>{
                        observer.unobserve(entry.target)
                    })
                }
            })
        },{threshold: 0.01})
    
        imgs.forEach(img =>observer.observe(img)) //观察每张图片
    }else {
        let onscroll = throttle(function(){
            console.log(new Date())
            if(imgs.length === 0) {
                return window.removeEventListener('scroll',onscroll)
            }
            imgs = imgs.filter(img => img.classList.contains('lazyload')) //筛选出有class为lazyload
            imgs.forEach(img => {
                if(inViewport(img)) {
                    loadImage(img)
                }
            })
        },500)
    
        window.addEventListener('scroll',onscroll)
        //dispatchEvent事件触发器，向一个指定的事件目标派发一个事件, 以合适的顺序触发受影响的事件目标。
        window.dispatchEvent(new Event('scroll')) //一进页面就触发滚动事件，加载第一屏的图片
    }   
}
  function throttle(func,delay) {  //节流函数
      let prev, timer
      return function fn(){
          let now = new Date()  
          let diff = now - prev  //时间差，当前的毫秒数减去前一次调用的毫秒数
          if(!prev || diff > delay){
              func()
              prev = now
          }else if(diff < delay){
              clearTimeout(timer)
              timer = setTimeout(fn,delay-diff)
          }
      }  
  }

  function inViewport(img){
      let {top,left,right,bottom } = img.getBoundingClientRect() //getBoundingClientRect()用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
      let vpHeight = document.documentElement.clientHeight
      let vpWidth = document.documentElement.clientWidth
      return (
          (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) && 
          (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
      )
  }

  function loadImage(img,callback) {
      let image = new Image()
      image.src = img.dataset.src
      image.onload = function(){
          img.src = image.src
          img.classList.remove('lazyload')
          if(typeof callback === "function") callback()
      }
  }