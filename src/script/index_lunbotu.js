import { ajax, cookie, $ } from "./tool.js";
class Slideshow {
    constructor() {
        this.picList = $(".img-list li");
        this.btnList = $(".img-pager-items a");
        this.btnprev = $(".prev");
        this.btnnext = $(".next");
        this.wrap=$(".img-panel");
        this.num = 0;
        this.timer=null;
    }
    init() {
        let _this=this
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
        this.wrap.hover(function(){
            clearInterval(_this.timer);
        },function(){
            _this.timing();
        })
    }
    cleanr() {
        for (let j of this.btnList) {
            j.removeClass("active");
            this.picList[j.index()].style.opacity = 0;
            this.picList[j.index()].style.zIndex = 1;
        }
    }
    tabswith(obj) {
        this.cleanr();
        obj.addClass("active");
        this.picList[obj.index()].style.opacity = 1;
        this.picList[obj.index()].style.zIndex = 2;
    }
    eventright() {
        this.num++;
        if (this.num > this.picList.length-1) {
            this.num = 0;
        }
        this.cleanr();
        this.btnList[this.num].addClass("active");
        this.picList[this.num].style.opacity = 1;
        this.picList[this.num].style.zIndex = 2;
    }
    eventleft(){
        this.num--;
        this.cleanr();
        if(this.num<0){
            this.num=this.picList.length-1;
        }
        this.btnList[this.num].addClass("active");
        this.picList[this.num].style.opacity = 1;
        this.picList[this.num].style.zIndex = 2;
    }
    timing(){
        this.timer=setInterval(()=>{
            this.eventright();
        },5000);
    }
};
export { Slideshow };