import { lyricsUrl, songUrl, albumCoverUrl } from './helper.js'
import { Lyrics } from './lyrics.js'
import { Progress } from './progress_bar.js'

export class Player{
  constructor(el){
    this.$el = el
    this.songmid = ''
    this.$btnShow = document.querySelector('.btn-player')
    this.$btnShow.addEventListener('click',this.show.bind(this))
    this.$el.addEventListener('click',this)
    this.progress = new Progress(this.$el.querySelector('.progress'))
    this.lyrics = new Lyrics(this.$el.querySelector('.player-lyrics'),this.$audio)
    this.$audio = this.createAudio()
    this.fecting = false
  }

  createAudio(){ //创建audio元素
    let audio = document.createElement('audio')
    audio.addEventListener('ended',() => {
      this.$audio.play()
      this.lyrics.restart()
      this.progress.restart()
    })
    document.body.appendChild(audio)
    return audio
  }
   
  handleEvent(event){  //定制函数
    let target = event.target
    switch(true){
      case target.matches('.icon-play'): //matches()选择指定选择器的元素
        this.onPlay(event)
        break
      case target.matches('.icon-pause'):
        this.onPause(event)
        break
      case target.matches('.icon-list'):
        this.hide(event)
        break
    }
  }

  play(options = {}){
    if(!options) return 
    console.log(options)
    this.$el.querySelector('.song-name').innerText = options.songname
    console.log(options.songname)
    this.$el.querySelector('.singer-name').innerText = options.artist
    console.log(options.artist)
    this.progress.reset(options.duration)

    let url = albumCoverUrl(options.albummid)
    this.$el.querySelector('.album-cover-img').src = url
    this.$el.querySelector('.bg-cover').style.backgroundImage =`url(${url})` 

    if(options.songid){
      this.songid = options.songid
      this.$audio.src = songUrl(this.songid)
      this.fecting = true
      fetch(lyricsUrl(this.songid))
      .then(res => res.json())
      .then(json => json.lyric)
      .then(text => this.lyrics.reset(text))
      .catch(() =>{})
      .then(() => this.fetching = false)
    }
    this.show()
  }

  onPlay(event){
    this.$audio.play()
    this.lyrics.start()
    this.progress.start()
    event.target.classList.remove('icon-play')
    event.target.classList.add('icon-pause')
  }
  onPause(event){
    this.$audio.pause()
    this.lyrics.stop()
    this.progress.stop()
    event.target.classList.remove('icon-pause')
    event.target.classList.add('icon-play')
  }
  
  show(event){
    this.$el.classList.add('show')
    document.body.classList.add('noscroll')
  }

  hide(event){
    this.$el.classList.remove('show')
    document.body.classList.remove('noscroll')
  }
}