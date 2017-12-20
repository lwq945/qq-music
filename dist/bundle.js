!function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.RECOMMEND_URL="https://qq-server-kfhdengskt.now.sh/",t.TOPLIST_URL="https://qq-server-kfhdengskt.now.sh/top",t.HOTKEY_URL="https://qq-server-kfhdengskt.now.sh/gotHotkey",t.SEARCH_URL="https://qq-server-kfhdengskt.now.sh/search",t.LYRICS_URL="https://qq-server-kfhdengskt.now.sh/lyrics"},function(e,t,n){"use strict";function i(e){var t=[].slice.call(e||document.querySelectorAll(".lazyload"));if("IntersectionObserver"in window){var n=new IntersectionObserver(function(e){e.forEach(function(e){e.intersectionRatio>0&&o(e.target,function(){n.unobserve(e.target)})})},{threshold:.01});t.forEach(function(e){return n.observe(e)})}else{var i=s(function(){if(console.log(new Date),0===t.length)return window.removeEventListener("scroll",i);t=t.filter(function(e){return e.classList.contains("lazyload")}),t.forEach(function(e){r(e)&&o(e)})},500);window.addEventListener("scroll",i),window.dispatchEvent(new Event("scroll"))}}function s(e,t){var n=void 0,i=void 0;return function s(){var r=new Date,o=r-n;!n||o>t?(e(),n=r):o<t&&(clearTimeout(i),i=setTimeout(s,t-o))}}function r(e){var t=e.getBoundingClientRect(),n=t.top,i=t.left,s=t.right,r=t.bottom,o=document.documentElement.clientHeight,a=document.documentElement.clientWidth;return(n>0&&n<o||r>0&&r<o)&&(i>0&&i<a||s>0&&s<a)}function o(e,t){var n=new Image;n.src=e.dataset.src,n.onload=function(){e.src=n.src,e.classList.remove("lazyload"),"function"==typeof t&&t()}}Object.defineProperty(t,"__esModule",{value:!0}),t.lazyload=i},function(e,t,n){"use strict";function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return a.SEARCH_URL+"?keyword="+e+"&page="+t}function s(e){return a.LYRICS_URL+"?id="+e}function r(e){return"http://ws.stream.qqmusic.qq.com/"+e+".m4a?fromtag=46"}function o(e){return"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+e+".jpg"}Object.defineProperty(t,"__esModule",{value:!0}),t.searchUrl=i,t.lyricsUrl=s,t.songUrl=r,t.albumCoverUrl=o;var a=n(0)},function(e,t,n){"use strict";function i(){var e=location.hash;if(/^#player\?.+/.test(e)){var t=e.slice(e.indexOf("?")+1).match(/(\w+)=([^&]+)/g),n=t&&t.reduce(function(e,t){var n=t.split("=");return e[n[0]]=decodeURIComponent(n[1]),e},{});c.play(n)}else c.hide()}var s=n(4),r=n(6),o=n(7),a=n(8),l=n(9);n(12);var c=(new s.Recommend(document.querySelector(".rec-view")).getData(),new r.TopList(document.querySelector(".rank-view")).getData(),new o.Search(document.querySelector(".search-view")),new a.HotKey(document.querySelector(".hot-result")).getData(),new l.Player(document.querySelector("#player")));i(),addEventListener("hashchange",i)},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Recommend=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(0),o=n(1),a=n(5);t.Recommend=function(){function e(t){i(this,e),this.$el=t}return s(e,[{key:"getData",value:function(){var e=this;return fetch(r.RECOMMEND_URL).then(function(e){return e.json()}).then(function(t){return e.render(t)}),this}},{key:"render",value:function(e){this.renderSlider(e.data.slider),this.renderRadio(e.data.radioList),this.renderHotsong(e.data.songList),(0,o.lazyload)()}},{key:"renderSlider",value:function(e){e=e.map(function(e){return{link:e.linkUrl.replace("http://","https://"),image:e.picUrl.replace("http://","https://")}}),new a.Slider({el:this.$el.querySelector("#slider"),slides:e})}},{key:"renderRadio",value:function(e){this.$el.querySelector(".radio-lists .radio-wrapper").innerHTML=e.map(function(e){return'<li class="radio-list-item">\n        <a href="javascript:;" class="list-main">\n          <div class="list-media">\n            <img class="lazyload" data-src="'+e.picUrl+'">\n            <span class="icon icon-play"></span>\n          </div>\n          <div class="list-info">\n            <h3>'+e.Ftitle+"</h3>\n          </div>      \n          </a>    \n      </li>"}).join("")}},{key:"renderHotsong",value:function(e){this.$el.querySelector(".hot-lists .hotsong-wrapper").innerHTML=e.map(function(e){return'<li class="hotsong-list-item">\n        <a href="javascript:;" class="list-main">\n          <div class="list-media">\n            <img class="lazyload" data-src="'+e.picUrl+'">\n            <span class="listen-count">\n              <i class="icon icon-listen"></i>\n              '+(e.accessnum/1e4).toFixed(1)+'万\n            </span>\n            <span class="icon icon-play"></span>\n          </div>\n          <div class="list-info">\n            <h3>'+e.songListDesc+"</h3>\n            <p>"+e.songListAuthor+"</p>\n          </div>      \n        </a>    \n      </li>"}).join("")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Slider=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.$el=t.el,this.slides=t.slides,this.interval=t.interval||3e3,this.index=0,this.render(),this.start()}return s(e,[{key:"render",value:function(){var e=this;this.$el.innerHTML='<div class="qq-slider-wrap"></div>',this.$el.innerHTML+='\n            <ul class="qq-slider-dots">\n                <span class="qq-state-active"></span>\n                <span></span>\n                <span></span>\n                <span></span>\n                <span></span>\n            </ul>\n        ',this.$wrap=this.$el.firstElementChild,this.$wrap.style.width=100*this.slides.length+"%";var t=this.slides.map(function(e){return'<div class="qq-slider-item"> \n                <a href="'+e.link+'">\n                    <img src="'+e.image+'" alt="">\n                </a>\n            </div>'}).join("");this.$wrap.innerHTML=t,[].forEach.call(this.$wrap.children,function(t){t.style.width=100/e.slides.length+"%"})}},{key:"start",value:function(){var e=this;setInterval(function(){e.index++,e.next()},this.interval)}},{key:"next",value:function(){this.index===this.slides.length&&(this.index=0,this.$wrap.style.left=0),this.$wrap.style.left="-"+100*this.index+"%",[].forEach.call(this.$el.children[1].children,function(e){e.classList.remove("qq-state-active")}),this.$el.children[1].children[this.index].classList.add("qq-state-active")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.TopList=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(0),o=n(1);t.TopList=function(){function e(t){i(this,e),this.$el=t}return s(e,[{key:"getData",value:function(){var e=this;return fetch(r.TOPLIST_URL).then(function(e){return e.json()}).then(function(t){return e.render(t.data.topList)}),this}},{key:"render",value:function(e){var t=this;this.$el.querySelector(".top-list").innerHTML=e.map(function(e){return'<li class="top-item">\n        <div class="top-item-media">\n          <img class="lazyload" data-src="'+e.picUrl+'" alt="">\n          <span class="listen-count">\n            <i class="icon icon-listen"></i>\n            '+(e.listenCount/1e4).toFixed(1)+'万\n          </span>\n        </div>   \n        <div class="top-item-songinfo">\n          <h3 class="top-item-title">'+e.topTitle+'</h3>\n          <ul class="top-item-list">\n          '+t.songlist(e.songList)+"\n          </ul>\n        </div>\n      </li>"}).join(""),(0,o.lazyload)(this.$el.querySelectorAll(".lazyload"))}},{key:"songlist",value:function(e){return e.map(function(e,t){return'\n      <li class="top-item-song">\n        '+(t+1)+'\n        <span class="song-name">'+e.songname+"</span>- "+e.singername+"\n      </li>"}).join("")}}]),e}()},function(e,t,n){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Search=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(2);t.Search=function(){function e(t){s(this,e),this.$el=t,this.$input=this.$el.querySelector("#search"),this.$songs=this.$el.querySelector(".song-list"),this.$loading=this.$el.querySelector(".search-loading"),this.$cancel=this.$el.querySelector(".search-cancel"),this.$delBtn=this.$el.querySelector(".icon-delete"),this.$hotkey=this.$el.querySelector(".hot-keys"),this.keyword="",this.page=1,this.songs=[],this.nomore=!1,this.fetching=!1,this.perpage=20,this.onscroll=this.onScroll.bind(this),window.addEventListener("scroll",this.onscroll),this.$input.addEventListener("keyup",this.onKeyUp.bind(this)),this.$input.addEventListener("focus",this.onFocus.bind(this)),this.$input.addEventListener("input",this.onChange.bind(this)),this.$delBtn.addEventListener("click",this.delBtnClick.bind(this)),this.$cancel.addEventListener("click",this.onClick.bind(this))}return r(e,[{key:"onKeyUp",value:function(e){var t=e.target.value.trim();if(!t)return this.reset();13===e.keyCode&&this.getData(t)}},{key:"onFocus",value:function(e){this.$cancel.style.display="block",this.$hotkey.style.display="none"}},{key:"onChange",value:function(e){this.$delBtn.style.display="inline"}},{key:"delBtnClick",value:function(e){this.$delBtn.style.display="none",this.$input.value="",this.$songs.innerHTML=""}},{key:"onClick",value:function(e){this.$cancel.style.display="none",this.$hotkey.style.display="block"}},{key:"onScroll",value:function(e){if(this.nomore)return window.removeEventListener("scroll",this.onscroll);pageYOffset+document.documentElement.clientHeight>document.body.scrollHeight-50&&this.getData(this.keyword,this.page+1)}},{key:"reset",value:function(){this.keyword="",this.page=1,this.songs=[],this.nomore=!1,this.$songs.innerHTML=""}},{key:"getData",value:function(e,t){var n=this;this.keyword===e&&this.songs[t||this.page]||this.fetching||this.nomore||(this.keyword!==e&&this.reset(),this.keyword=e,this.loading(),fetch((0,o.searchUrl)(this.keyword,t||this.page)).then(function(e){return e.json()}).then(function(e){return n.page=e.data.song.curpage,n.nomore="no results"===e.message,n.songs.push=[].concat(i(e.data.song.list)),e.data.song.list}).then(function(e){return n.append(e)}).then(function(){return n.done()}).catch(function(){return n.fetching=!1}))}},{key:"append",value:function(e){var t=e.map(function(e){var t=e.singer.map(function(e){return e.name}).join(" ");return'\n      <a class="song-item" href="#player?artist='+t+"&songid="+e.songid+"&songname="+e.songname+"&albummid="+e.albummid+"&duration="+e.interval+'">\n        <i class="icon icon-music"></i>\n        <div class="song-name ellipsis">'+e.songname+'</div>\n        <div class="song-artist ellipsis">'+t+"</div>\n      </a>"}).join("");this.$songs.insertAdjacentHTML("beforeEnd",t)}},{key:"loading",value:function(){this.fetching=!0,this.$loading.classList.add("show")}},{key:"done",value:function(){this.fetching=!1,this.nomore?(this.$el.querySelector(".loading-icon").style.display="none",this.$el.querySelector(".loading-text").style.display="none",this.$el.querySelector(".loading-done").style.display="block",this.$el.querySelector(".search-loading").classList.add("show")):this.$loading.classList.remove("show")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.HotKey=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(0);t.HotKey=function(){function e(t){i(this,e),this.$el=t}return s(e,[{key:"getData",value:function(){var e=this;return fetch(r.HOTKEY_URL).then(function(e){return e.json()}).then(function(t){return e.render(t.data)}),this}},{key:"render",value:function(e){var t=e.hotkey,n=this.getRandomNum(t,6).map(function(e){return'\n      <a href="#" class="tag tag-keyword">'+e.k+"</a>\n    "}).join("");this.$el.innerHTML='<a href="'+e.special_url+'" class="tag tag-hot">'+e.special_key+"</a>"+n}},{key:"getRandomNum",value:function(e,t){for(var n=[],i=0;i<t;++i){var s=Math.floor(Math.random()*e.length);n.push(e[s]),e.splice(s,1)}return n}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(2),o=n(10),a=n(11);t.Player=function(){function e(t){i(this,e),this.$el=t,this.songmid="",this.$btnShow=document.querySelector(".btn-player"),this.$btnShow.addEventListener("click",this.show.bind(this)),this.$el.addEventListener("click",this),this.progress=new a.Progress(this.$el.querySelector(".progress")),this.lyrics=new o.Lyrics(this.$el.querySelector(".player-lyrics"),this.$audio),this.$audio=this.createAudio(),this.fecting=!1}return s(e,[{key:"createAudio",value:function(){var e=this,t=document.createElement("audio");return t.addEventListener("ended",function(){e.$audio.play(),e.lyrics.restart(),e.progress.restart()}),document.body.appendChild(t),t}},{key:"handleEvent",value:function(e){var t=e.target;switch(!0){case t.matches(".icon-play"):this.onPlay(e);break;case t.matches(".icon-pause"):this.onPause(e);break;case t.matches(".icon-list"):this.hide(e)}}},{key:"play",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(t){console.log(t),this.$el.querySelector(".song-name").innerText=t.songname,console.log(t.songname),this.$el.querySelector(".singer-name").innerText=t.artist,console.log(t.artist),this.progress.reset(t.duration);var n=(0,r.albumCoverUrl)(t.albummid);this.$el.querySelector(".album-cover-img").src=n,this.$el.querySelector(".bg-cover").style.backgroundImage="url("+n+")",t.songid&&(this.songid=t.songid,this.$audio.src=(0,r.songUrl)(this.songid),this.fecting=!0,fetch((0,r.lyricsUrl)(this.songid)).then(function(e){return e.json()}).then(function(e){return e.lyric}).then(function(t){return e.lyrics.reset(t)}).catch(function(){}).then(function(){return e.fetching=!1})),this.show()}}},{key:"onPlay",value:function(e){this.$audio.play(),this.lyrics.start(),this.progress.start(),e.target.classList.remove("icon-play"),e.target.classList.add("icon-pause")}},{key:"onPause",value:function(e){this.$audio.pause(),this.lyrics.stop(),this.progress.stop(),e.target.classList.remove("icon-pause"),e.target.classList.add("icon-play")}},{key:"show",value:function(e){this.$el.classList.add("show"),document.body.classList.add("noscroll")}},{key:"hide",value:function(e){this.$el.classList.remove("show"),document.body.classList.remove("noscroll")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();(t.Lyrics=function(){function e(t){i(this,e),this.$el=t,this.$el.innerHTML='<div class="player-lyrics-lines"></div>',this.$lines=this.$el.querySelector(".player-lyrics-lines"),this.text="",this.index=0,this.elapsed=0,this.lyrics=[],this.timerId="",this.reset(this.text)}return s(e,[{key:"start",value:function(){this.stop(),this.timerId=setInterval(this.update.bind(this),1e3)}},{key:"stop",value:function(){clearInterval(this.timerId)}},{key:"update",value:function(){this.elapsed+=1,this.index===this.lyrics.length-1&&this.reset();for(var e=this.index+1;e<this.lyrics.length;e++){var t=this.getSecond(this.lyrics[e]);if(this.elapsed===t&&(!this.lyrics[e+1]||this.elapsed<this.getSecond(this.lyrics[e+1]))){
//!this.lyrics[i + 1]判断最后一句歌词（最后一句歌词的下一句就没有了）
this.$lines.children[this.index].classList.remove("active"),this.$lines.children[e].classList.add("active"),this.index=e;break}}if(this.index>2){var n=-(this.index-2)*this.LINE_HEIGHT;this.$lines.style.transform="translateY("+n+"px)"}}},{key:"reset",value:function(e){this.stop(),this.index=0,this.elapsed=0,e&&(this.text=this.formatText(e),this.lyrics=this.text.match(/^\[\d{2}:\d{2}\.\d{2}\].+$/gm)||[],this.lyrics.length&&(this.render(),this.$lines.children[this.index].classList.add("active")))}},{key:"render",value:function(){var e=this.lyrics.map(function(e){return'\n      <div class="player-lyrics-line">'+e.slice(10)+"</div>\n    "}).join("");this.$lines.innerHTML=e}},{key:"restart",value:function(){this.reset(),this.start()}},{key:"getSecond",value:function(e){return+e.replace(/^\[(\d{2}):(\d{2}).+/,function(e,t,n){return 60*+t+ +n})}},{key:"formatText",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText}}]),e}()).prototype.LINE_HEIGHT=42},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Progress=function(){function e(t,n,s){i(this,e),this.$el=t,this.elapsed=0,this.duration=n||0,this.progress=0,this.timerId="",this.render(),this.$progress=this.$el.querySelector(".progress-bar-progress"),this.$elapsed=this.$el.querySelector(".progress-elapsed"),this.$duration=this.$el.querySelector(".progress-duration"),this.$elapsed.innerText=this.formatTime(this.elapsed),this.$duration.innerText=this.formatTime(this.duration),s&&this.start()}return s(e,[{key:"start",value:function(){this.timerId=setInterval(this.update.bind(this),50)}},{key:"stop",value:function(){clearInterval(this.timerId)}},{key:"update",value:function(){this.elapsed+=.05,this.elapsed>=this.duration&&this.reset(this.duration),this.progress=this.elapsed/this.duration,this.$progress.style.transform="translateX("+(100*this.progress-100)+"%)",this.$elapsed.innerText=this.formatTime(this.elapsed)}},{key:"reset",value:function(e){this.stop(),this.elapsed=0,this.progress=0,e&&(this.duration=+e,this.$duration.innerText=this.formatTime(this.duration))}},{key:"render",value:function(){this.$el.innerHTML='<div class="progress-time progress-elapsed"></div>\n    <div class="progress-bar">\n      <div class="progress-bar-progress"></div>\n    </div>\n    <div class="progress-time progress-duration"></div>\n    '}},{key:"restart",value:function(){this.reset(),this.start()}},{key:"formatTime",value:function(e){var t=Math.floor(e/60),n=Math.floor(e%60);return t<10&&(t="0"+t),n<10&&(n="0"+n),t+":"+n}}]),e}()},function(e,t,n){"use strict";document.addEventListener("click",function(e){var t=e.target;if("tab"===t.dataset.role){[].forEach.call(t.parentNode.children,function(e){e.classList.remove("active")}),t.classList.add("active");var n=document.querySelector(t.dataset.view);n&&([].forEach.call(n.parentNode.children,function(e){e.classList.add("hide")}),n.classList.remove("hide"))}})}]);