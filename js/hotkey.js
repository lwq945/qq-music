import { HOTKEY_URL } from './constant.js'

export class HotKey{
  constructor(el){
    this.$el = el
  }

  getData(){
    fetch(HOTKEY_URL)
    .then(res => res.json())
    .then(json => this.render(json.data))
    return this
  }
  
  render(data){
    let datas = data.hotkey
    let html = this.getRandomNum(datas, 6).map(hotKey => `
      <a href="#" class="tag tag-keyword">${hotKey.k}</a>
    `).join('')

    this.$el.innerHTML = `<a href="${data.special_url}" class="tag tag-hot">${data.special_key}</a>` + html

  }

  getRandomNum(array,len) {
    var reslut = [];
    for (let i = 0; i < len; ++i) {
        let random = Math.floor(Math.random() * array.length);
        reslut.push(array[random]);
        array.splice(random,1);
    }
    return reslut;        
  }
}