import { searchUrl } from './helper.js'

export class Search {
  constructor(el){
    this.$el = el
    this.$input = this.$el.querySelector('#search')
    this.$songs = this.$el.querySelector('.song-list')
    this.$loading =this.$el.querySelector('.search-loading')
    this.$cancel = this.$el.querySelector('.search-cancel')
    this.$delBtn = this.$el.querySelector('.icon-delete')
    this.$hotkey = this.$el.querySelector('.hot-keys')
    this.keyword = ''
    this.page = 1
    this.songs = []
    this.nomore = false
    this.fetching = false
    this.perpage = 20 
    this.onscroll = this.onScroll.bind(this)
    window.addEventListener('scroll',this.onscroll)
    this.$input.addEventListener('keyup',this.onKeyUp.bind(this))
    this.$input.addEventListener('focus',this.onFocus.bind(this))
    this.$input.addEventListener('input',this.onChange.bind(this))
    this.$delBtn.addEventListener('click',this.delBtnClick.bind(this))
    this.$cancel.addEventListener('click',this.onClick.bind(this))
  }

  onKeyUp(event){
    let keyword = event.target.value.trim() //trim()从一个字符串的两端删除空白字符,不影响原字符串本身，它返回的是一个新的字符串
    if(!keyword) return this.reset()
    if(event.keyCode !== 13) return
    this.getData(keyword)
  }

  onFocus(event){
     this.$cancel.style.display = 'block'
     this.$hotkey.style.display = 'none'
  }

  onChange(event) {
    this.$delBtn.style.display = 'inline'
    
  }
  delBtnClick(event) {
    this.$delBtn.style.display = 'none'
    this.$input.value = ''
    this.$songs.innerHTML = ''
  }
  onClick(event){
    this.$cancel.style.display = 'none'
    this.$hotkey.style.display = 'block'
  }
  onScroll(event){ //滚动加载
    if(this.nomore) return window.removeEventListener('scroll', this.onscroll)
    if(pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight - 50){
      this.getData(this.keyword,this.page + 1)
    }
  }

  reset() {
    this.keyword = ''
    this.page = 1
    this.songs = []
    this.nomore = false
    this.$songs.innerHTML = ''
  }

  getData(keyword,page){
    if (this.keyword === keyword && this.songs[page || this.page]) return
    if(this.fetching || this.nomore) return //不让频繁请求
    if (this.keyword !== keyword) this.reset()
    this.keyword = keyword
    this.loading()
    fetch(searchUrl(this.keyword,page || this.page))
    .then(res => res.json())
    .then(json => {
      this.page = json.data.song.curpage  //请求成功后page变为切确的值
      this.nomore = (json.message === 'no results') //nomore变为true，没有数据，不在请求
      this.songs.push =[...json.data.song.list] //缓存请求数据
      return json.data.song.list
    })
    .then(songs => this.append(songs))
    .then(() => this.done())
    .catch(() => this.fetching = false)
  }

  append(songs){
    let html = songs.map(song => {
      let artist = song.singer.map(s => s.name).join(' ')
      return `
      <a class="song-item" href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
        <i class="icon icon-music"></i>
        <div class="song-name ellipsis">${song.songname}</div>
        <div class="song-artist ellipsis">${artist}</div>
      </a>`}).join('')
      this.$songs.insertAdjacentHTML('beforeEnd',html) 
      //hash 属性是一个可读可写的字符串，该字符串是 URL 的锚部分（从 # 号开始的部分）。
      //http://127.0.0.1:8080/#player?artist=李荣浩&songid=210265478&songname=少年&albummid=003PTZBu0IXqg2&duration=301
      //location.hash可以获取到'#player?artist=李荣浩&songid=210265478&songname=少年&albummid=003PTZBu0IXqg2&duration=301'

      /**
       * 在指定的地方插入html标签语句 insertAdajcentHTML(swhere,stext)
       * 参数：
        swhere: 指定插入html标签语句的地方，有四种值可用：
        1.beforeBegin: 插入到标签开始前
        2.afterBegin:插入到标签开始标记之后
        3.beforeEnd:插入到标签结束标记前
        4.afterEnd:插入到标签结束标记后
        stext：要插入的内容
       */
  }

  loading() {
    this.fetching = true
    this.$loading.classList.add('show')
  }

  done() {
    this.fetching = false
    if (this.nomore) {
        this.$el.querySelector('.loading-icon').style.display = 'none'
        this.$el.querySelector('.loading-text').style.display = 'none'
        this.$el.querySelector('.loading-done').style.display = 'block'
        this.$el.querySelector('.search-loading').classList.add('show')
    } else {
        this.$loading.classList.remove('show')
    }
  }
}

//https://y.gtimg.cn/music/photo_new/T001R68x68M000000aHmbL2aPXWH.jpg?max_age=2592000