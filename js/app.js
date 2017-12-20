import { Recommend } from './recommend.js'
import { TopList } from './topList.js'
import { Search } from './search.js'
import { HotKey } from './hotkey.js'
import { Player } from './player.js'
import './tab.js'


let recommend = new Recommend(document.querySelector('.rec-view')).getData()
let topList = new TopList(document.querySelector('.rank-view')).getData()
let search = new Search(document.querySelector('.search-view'))
let hotkey = new HotKey(document.querySelector('.hot-result')).getData()
let player = new Player(document.querySelector('#player'))

onHashChange()
addEventListener('hashchange',onHashChange)

function onHashChange(){
  let hash = location.hash
  if(/^#player\?.+/.test(hash)){
    let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g) //[^&]是匹配除了&字符，都可以匹配
    let options = matches && matches.reduce((res,cur) => {  //数组变成对象{artist: "李荣浩", songid: "210265478", songname: "少年", albummid: "003PTZBu0IXqg2", duration: "301"}
      let arr = cur.split('=')
      res[arr[0]] = decodeURIComponent(arr[1])
      return res
    },{})
    player.play(options)
  }else{
    player.hide()
  }
}





