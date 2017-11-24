export class Progress{
  constructor(el,duration,start){
    this.$el = el
    this.elapsed = 0  //已播放的时间
    this.duration = duration || 0  //总时间
    this.progress = 0  //进度
    this.timerId = ''
    this.render()
    this.$progress = this.$el.querySelector('.progress-bar-progress')
    this.$elapsed = this.$el.querySelector('.progress-elapsed')
    this.$duration = this.$el.querySelector('.progress-duration')
    this.$elapsed.innerText = this.formatTime(this.elapsed)
    this.$duration.innerText = this.formatTime(this.duration)
    if(start) this.start()
  }

  start(){
    this.timerId = setInterval(this.update.bind(this),50)
  }

  stop(){
    clearInterval(this.timerId)
  }

  update(){
    this.elapsed += 0.05
    if(this.elapsed >= this.duration) this.reset(this.duration)
    this.progress = this.elapsed / this.duration
    this.$progress.style.transform = `translateX(${this.progress * 100 - 100}%)`
    this.$elapsed.innerText = this.formatTime(this.elapsed)
  }

  reset(duration){
    this.stop()
    this.elapsed = 0
    this.progress = 0
    if(duration){
      this.duration = +duration
      this.$duration.innerText = this.formatTime(this.duration)
    }
  }

  render(){
    this.$el.innerHTML = 
    `<div class="progress-time progress-elapsed"></div>
    <div class="progress-bar">
      <div class="progress-bar-progress"></div>
    </div>
    <div class="progress-time progress-duration"></div>
    `
  }

  restart() {
    this.reset()
    this.start()
  }


  formatTime(time){
    let minute = Math.floor(time / 60)
    let sencond = Math.floor(time % 60)
    if(minute < 10){
      minute = '0' + minute
    }
    if(sencond < 10){
      sencond = '0' + sencond
    }
    return `${minute}:${sencond}`
  }

}