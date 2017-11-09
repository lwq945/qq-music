(function(){

    fetch("./json/rec.json")
    .then(res=>res.json())
    .then(render)
    
    function render(json){
        renderSlider(json.data.slider)
        renderRadio(json.data.radioList)
        renderHotsong(json.data.songList)
    }

    function renderSlider(slides){
        slides = slides.map(slide=>{
            return {
                link:slide.linkUrl,image:slide.picUrl
            }
        })
        new Slider({
            el:document.querySelector("#slider"),
            slides: slides    
         })
    }

    function renderRadio(list){
        document.querySelector(".radio-lists .radio-wrapper").innerHTML = list.map(item=>
            `<li class="radio-list-item">
                <a href="javascript:;" class="list-main">
                    <div class="list-media">
                        <img src="${item.picUrl}">
                        <span class="icon icon-play"></span>
                    </div>
                    <div class="list-info">
                        <h3>${item.Ftitle}</h3>
                    </div>      
                </a>    
            </li>`
        ).join('')
    }

   function renderHotsong(list){
        document.querySelector(".hot-lists .hotsong-wrapper").innerHTML = list.map(item=>
            `<li class="hotsong-list-item">
                <a href="javascript:;" class="list-main">
                    <div class="list-media">
                        <img src="${item.picUrl}">
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
})()
