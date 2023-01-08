
$('.addButton')
  .on('click',()=>{
    let url = window.prompt('请输入网址')
    if(url.indexOf('https')!==0){
        url = 'https://' + url
    }
    console.log(url)
    const $siteList = $('.siteList')
    const $lastLi = $siteList.find('li.last')
    const $li = $(`<li>
            <a href="${url}">
              <div className="site">
                <div className="logo">${url[8]}</div>
                <div className="link">${url}</div>
              </div>
            </a>
        </li>`).insertBefore($lastLi)

})


