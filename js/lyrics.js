export class Lyrics{
  constructor(el){
    this.$el = el 
    this.$el.innerHTML = `<div class="player-lyrics-lines"></div>` //存放歌词
    this.$lines = this.$el.querySelector('.player-lyrics-lines')
    this.text = '' //请求到的歌词数据
    this.index = 0 //当前歌词在哪句
    this.elapsed = 0 //已播放时间
    this.lyrics = [] 
    this.timerId = ''
    this.reset(this.text)
    
  }

  start(){
    this.stop()
    this.timerId = setInterval(this.update.bind(this),1000)
  }

  stop(){
    clearInterval(this.timerId)
  }

  update(){
    this.elapsed += 1
    if(this.index === this.lyrics.length - 1) this.reset()
    for(let i = this.index + 1; i < this.lyrics.length; i++){
      let second = this.getSecond(this.lyrics[i])
      if(this.elapsed === second && (!this.lyrics[i + 1] || this.elapsed < this.getSecond(this.lyrics[i + 1]))) { //!this.lyrics[i + 1]判断最后一句歌词（最后一句歌词的下一句就没有了）
        this.$lines.children[this.index].classList.remove('active')
        this.$lines.children[i].classList.add('active')
        this.index = i
        break
      }
    }

    if(this.index > 2){
      let y = -(this.index - 2) * this.LINE_HEIGHT
      this.$lines.style.transform = `translateY(${y}px)`
    }
  }

  reset(text){
    this.stop()
    this.index = 0
    this.elapsed = 0
    if(text){
      this.text = this.formatText(text)
      this.lyrics = this.text.match(/^\[\d{2}:\d{2}\.\d{2}\].+$/gm) || [] //正则匹配(匹配前面带有时间的歌词，空行的去掉)获得数组
      if(this.lyrics.length){
        this.render()
        this.$lines.children[this.index].classList.add('active')
      }
    }
  }

  render(){
    let html = this.lyrics.map(line =>`
      <div class="player-lyrics-line">${line.slice(10)}</div>
    `).join('')
    this.$lines.innerHTML = html
  }

  restart() {
    this.reset()
    this.start()
  }

  getSecond(line){ //只考虑每行歌词的分和秒，转为秒数
    return +line.replace(/^\[(\d{2}):(\d{2}).+/,(match,p1,p2) => (+p1) * 60 + (+p2))
  }

  formatText(text){  //把歌词文本转为更直观的排版(格式化)
    let div = document.createElement('div')
    div.innerHTML = text
    return div.innerText
  }
}

Lyrics.prototype.LINE_HEIGHT = 42
