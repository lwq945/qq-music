export class Slider {
    constructor(option = {}){
        this.$el = option.el
        this.slides = option.slides
        this.interval = option.interval || 3000
        this.index = 0;
        this.render()
        this.start() 
    }

    render() {
        this.$el.innerHTML = `<div class="qq-slider-wrap"></div>`
        this.$el.innerHTML+=`
            <ul class="qq-slider-dots">
                <span class="qq-state-active"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </ul>
        `
        this.$wrap = this.$el.firstElementChild
        this.$wrap.style.width = `${this.slides.length * 100}%`
        
        let tpl = this.slides.map(item =>    //map返回新的数组，forEach没有返回数组，操作数据
            `<div class="qq-slider-item"> 
                <a href="${item.link}">
                    <img src="${item.image}" alt="">
                </a>
            </div>`
        ).join('')
        this.$wrap.innerHTML = tpl;
        [].forEach.call(this.$wrap.children,item=>{
            item.style.width = `${100/this.slides.length}%`
        })
        // Array.prototype.forEach.call(this.$wrap.children,item=>{
        //     item.style.width = `${100/this.slides.length}%`
        // }) 
        
        //console.log(tpl)
        // console.log(this.$wrap.children);
    }

    start(){
        setInterval(()=>{
            this.index++
            this.next()
        },this.interval)
    }

    next(){
        if(this.index === this.slides.length){
            this.index = 0
            this.$wrap.style.left = 0
        }
        this.$wrap.style.left = `-${this.index* 100}%`;
        
        [].forEach.call(this.$el.children[1].children,(item)=>{
            item.classList.remove('qq-state-active')
        })
        this.$el.children[1].children[this.index].classList.add('qq-state-active');
    }
    
}