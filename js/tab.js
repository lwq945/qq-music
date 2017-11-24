document.addEventListener('click',(event)=>{
    let target = event.target
    if(target.dataset.role !== 'tab') return

    [].forEach.call(target.parentNode.children,(tab)=>{
        tab.classList.remove('active')
    })
    
    target.classList.add('active')

    let content = document.querySelector(target.dataset.view)
    if(content){
      [].forEach.call(content.parentNode.children,(item)=>{
          item.classList.add('hide') 
      })
      
      content.classList.remove('hide')   
    }
})