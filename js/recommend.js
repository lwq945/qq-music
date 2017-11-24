import { RECOMMEND_URL } from './constant.js'
import { lazyload } from './lazyload.js'
import { Slider } from './slider.js'

export class Recommend{
  constructor(el){
    this.$el = el
  }

  getData(){
    fetch(RECOMMEND_URL)
    .then(res => res.json())
    .then(json => this.render(json))
    return this
  }

  render(json){
    this.renderSlider(json.data.slider)
    this.renderRadio(json.data.radioList)
    this.renderHotsong(json.data.songList)
    lazyload()
  }
  
  renderSlider(slides){
    slides = slides.map(slide =>{
      return {
        link:slide.linkUrl.replace('http://', 'https://'),
        image:slide.picUrl.replace('http://', 'https://')
      }
    })
    new Slider({
      el: this.$el.querySelector("#slider"),
      slides: slides    
    })
  }

  renderRadio(radios){
    this.$el.querySelector(".radio-lists .radio-wrapper").innerHTML = radios.map(item=>
      `<li class="radio-list-item">
        <a href="javascript:;" class="list-main">
          <div class="list-media">
            <img class="lazyload" data-src="${item.picUrl}">
            <span class="icon icon-play"></span>
          </div>
          <div class="list-info">
            <h3>${item.Ftitle}</h3>
          </div>      
          </a>    
      </li>`
    ).join('')
  }

  renderHotsong(hotsongs){
    this.$el.querySelector(".hot-lists .hotsong-wrapper").innerHTML = hotsongs.map(item=>
      `<li class="hotsong-list-item">
        <a href="javascript:;" class="list-main">
          <div class="list-media">
            <img class="lazyload" data-src="${item.picUrl}">
            <span class="listen-count">
              <i class="icon icon-listen"></i>
              ${(item.accessnum/10000).toFixed(1)}万
            </span>
            <span class="icon icon-play"></span>
          </div>
          <div class="list-info">
            <h3>${item.songListDesc}</h3>
            <p>${item.songListAuthor}</p>
          </div>      
        </a>    
      </li>`
    ).join('')
  }
}




