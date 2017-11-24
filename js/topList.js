import { TOPLIST_URL } from './constant.js'
import { lazyload } from './lazyload.js'

export class TopList{
  constructor(el){
    this.$el = el
  }

  getData(){
    fetch(TOPLIST_URL)
    .then(res => res.json())
    .then(json => this.render(json.data.topList))
    return this
  }

  render(list){
    this.$el.querySelector(".top-list").innerHTML= list.map(item =>
      `<li class="top-item">
        <div class="top-item-media">
          <img class="lazyload" data-src="${item.picUrl}" alt="">
          <span class="listen-count">
            <i class="icon icon-listen"></i>
            ${(item.listenCount/10000).toFixed(1)}万
          </span>
        </div>   
        <div class="top-item-songinfo">
          <h3 class="top-item-title">${item.topTitle}</h3>
          <ul class="top-item-list">
          ${this.songlist(item.songList)}
          </ul>
        </div>
      </li>`   
    ).join('')

    lazyload(this.$el.querySelectorAll(".lazyload"))
  }

  songlist(songs){
    return songs.map((song,index) =>`
      <li class="top-item-song">
        ${index + 1}
        <span class="song-name">${song.songname}</span>- ${song.singername}
      </li>`
    ).join('')
  }
  
}
