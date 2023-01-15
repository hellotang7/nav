const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: '饥', url: 'https://jirengu.com/courses/16644d89-6b17-4c2f-ac15-dabb994b7696/random/8b3dcb2139?#/common'},
    {logo: '仓', url: 'https://github.com/hellotang7?tab=repositories'},
    {logo: '掘', url: 'https://juejin.cn/user/2414992882147869/posts'},
     {logo: 'B', url: 'https://www.bilibili.com'},
    {logo: 'I', url: 'https://www.iconfont.cn'},
]

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
               <div class="logo">${node.logo[0]}</div>
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
 const name = window.prompt("请输入网址名称");
        if(name === ""){
        alert("输入为空,请重新输入");
        return
    }

        let url = window.prompt('请输入网址')
        if(url === ""){
          alert("输入网址为空,请重新添加");
          return;
        }if (url.indexOf('https') !== 0) {
            url = 'https://' + url
        }

       

        console.log(url)
        hashMap.push({
            logo: name,
            url: url,
        });
        render()
    });

//自动保存
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)//把对象转换成字符串
    localStorage.setItem('x', string)//字符串的kay为x进行本地储存
}


// 快捷键
// const jianpan = () => {
// $(document).on('keypress',(e)=>{
//     const {key}= e
//     for(let i = 0;i < hashMap.length;i++){
//         if(hashMap[i].logo.toLowerCase() === key) {  //toLowerCase字母变小写
//             window.open(hashMap[i].url)
//         }
//     }
// })
// }
// jianpan()




