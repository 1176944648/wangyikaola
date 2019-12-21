import {ajax, cookie, $, addEvent , bufferMove } from "./tool.js";
class Slideshow {
    constructor() {
        this.picList = $(".img-list li");
        this.btnList = $(".img-pager-items a");
        this.btnprev = $(".prev");
        this.btnnext = $(".next");
        this.wrap = $(".img-panel");
        this.login=$(".topNavLeftLogin");
        this.nologin=$(".topNavLeft");
        this.user=$(".topNavLeftLogin .username");
        this.quit=$(".topNavLeftLogin .quit");
        this.num = 0;
        this.timer = null;
    }
    init() {
        let _this = this
        //给切换按钮添加点击事件
        for (let i of this.btnList) {
            i.onclick = () => {
                this.tabswith(i);
            }
        }
        //给next添加点击事件
        this.btnnext.onclick = () => {
            this.eventright();
        }
        //给prev添加点击事件
        this.btnprev.onclick = () => {
            this.eventleft();
        }
        //定时器
        this.timing();
        //鼠标移入移出开启关闭定时器
        this.wrap.hover(function () {
            clearInterval(_this.timer);
        }, function () {
            _this.timing();
        })
        this.exist();
        //给退出键添加点击事件
        this.quit.onclick=()=>{
            cookie.delcookie("username");
            this.exist();
        }
        
        
    }
    cleanr() {
        for (let j of this.btnList) {
            j.removeClass("active");
            this.picList[j.index()].css({ 'opacity': 0, 'zIndex': 1 })

        }
    }
    tabswith(obj) {
        this.cleanr();
        obj.addClass("active");
        this.picList[obj.index()].css({ 'opacity': 1, 'zIndex': 2 })
    }
    eventright() {
        this.num++;
        if (this.num > this.picList.length - 1) {
            this.num = 0;
        }
        this.cleanr();
        this.btnList[this.num].addClass("active");
        this.picList[this.num].css({ 'opacity': 1, 'zIndex': 2 })
    }
    eventleft() {
        this.num--;
        this.cleanr();
        if (this.num < 0) {
            this.num = this.picList.length - 1;
        }
        this.btnList[this.num].addClass("active");
        this.picList[this.num].css({ 'opacity': 1, 'zIndex': 2 })
    }
    timing() {
        this.timer = setInterval(() => {
            this.eventright();
        }, 5000);
    }
    //判断是否存在用户名
    exist(){
        if(cookie.getcookie('username')){
            this.login.css({display:"flex"});
            this.nologin.css({display:"none"});
            this.user.innerHTML=cookie.getcookie('username');
        }else{
            this.login.css({display:"none"});
            this.nologin.css({display:"flex"});
        }
    }
};
class Stairs {
    constructor() {
        this.navlist = $(".m-navlist");
        this.main = $("main");
        this.allgoodslist = $(".goods");
        this.btn = $(".m-navlist .nav-item");
        this.top = this.main.offsetTop;
        this.height = this.allgoodslist[0].offsetHeight;
        this.back = $(".bottomPart");
        this.goodslist = $(".goodslist");
    }
    init() {
        let _this = this;
        addEvent(window, "scroll", function () {
            _this.show();
        }, false);
        //点击跳转
        for (let i of this.btn) {
            i.onclick = function (ev) {
                ev = ev || event;
                _this.skip(this);
                this.addClass("active");
                if (ev.preventDefault) {
                    ev.preventDefault();
                } else {
                    ev.returnValue = false;
                }
            }
        }
        //回到顶部
        this.back.onclick = () => {
            document.documentElement.scrollTop = 0;
        }
        //刷新界面时ul的显示和数据的渲染
        window.onload = () => {
            this.show();
            for(let obj of this.goodslist){
                let objTop=obj.offsetTop;
                let height=document.documentElement.clientHeight+document.documentElement.scrollTop;
                if(objTop<=height){
                    this.datarender(obj.index());
                }
            }
        }
    }
    //滚轮显示ul;
    show() {
        if (document.documentElement.scrollTop >= this.top - 15) {
            this.navlist.css({
                display: "block"
            });
        } else {
            this.navlist.css({
                display: "none"
            })
        }
        this.louti();
    }
    cleanr() {
        for (let i of this.btn) {
            i.removeClass("active");
        }
    }
    //点击跳转界面
    skip(obj) {
        this.cleanr();
        this.render(obj.index());
        document.documentElement.scrollTop = this.allgoodslist[obj.index()].offsetTop;
    }
    //4.触发滚动条，给对应的楼梯添加active类
    louti() {
        let srcolltop = document.documentElement.scrollTop;
        for (let i of this.allgoodslist) {
            let goodstop = i.offsetTop + i.offsetHeight / 2;
            if (goodstop > srcolltop) {
                this.cleanr();
                this.btn[i.index()].addClass("active");
                this.render(i.index());
                return false;
            }
        }
    }
    //利用楼梯效果实现懒加载
    render(index) {
        if(this.goodslist[index].innerHTML===""){
           this.datarender(index);
        }
    }
    //获取数据进行渲染
    datarender(index){
        ajax({
            url: "http://10.31.161.143/wangyikaola/php/index_render.php",
            dataType: "json"
        }).then((data) => {
            let obj = data[index];
            let str = "";
            for (let i = 0; i < 5; i++) {
                for (let value of obj) {
                    str += `
                    <li>
                    <div class="goods-bd">
                        <div class="goods-bd-border">
                            <div class="goods-img">
                                <a href="./details.html?sid=${value.sid}" target="_blank">
                                    <img src="${value.url}"
                                        alt="">
                                </a>
                            </div>
                            <h5><a href="./details.html?sid=${value.sid}" target="_blank">${value.title}</a></h5>
                            <h6>${value.lable}</h6>
                            <div class="m-priceitem">
                                <span class="price"><i class="rmb">￥</i>${value.price}</span>
                                <span class="mktprice"><del>￥${value.oldpic}</del></span>
                            </div>
                            <a href="./details.html?sid=${value.sid}"  target="_blank" class="goods-btn">
                                <span class="goods-btn-span">立即购买</span>
                            </a>
                        </div>
                    </div>
                </li>
                    `
                }
            }
            this.goodslist[index].innerHTML = str;
        })
    }
}
export { Slideshow, Stairs };