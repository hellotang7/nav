const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{logo: 'B', url: 'https://www.bilibili.com'}, {logo: 'A', url: 'http://www.acfun.cn'},]

// 简化url
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/开头的内容
}

//渲染页面
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`
        <li>
           
             <div class="site">
               <div class="logo">${node.logo}</div>
                 <div class="link">${simplifyUrl(node.url)}</div>
                 <div class="close">
                     <svg class="icon" >
                         <use xlink:href="#icon-tabguanbi"></use>
                     </svg>
                 </div>
             </div>
           
        </li>`).insertBefore($lastLi)
        $li.on('click',() =>{
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index, 1)//删除网站
            render()
        })
    })
}
render()

//新增网站
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入网址')
        if (url.indexOf('https') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0], url: url,
        });
        render()
    });

//自动保存
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)//把对象转换成字符串
    localStorage.setItem('x', string)//字符串的kay为x进行本地储存
}



const jianpan = () => {
$(document).on('keypress',(e)=>{
    const {key}= e
    for(let i = 0;i < hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key) {  //toLowerCase字母变小写
            window.open(hashMap[i].url)
        }
    }
})
}
jianpan()


// $('globalHeader').addEventListener('click',(e)=>{
//     const t = e.target
//    if(t.tayget('form')){
//     jianpan.remove
//   }
// })


