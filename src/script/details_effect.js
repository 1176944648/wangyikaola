import { ajax, cookie, $, addEvent, bufferMove } from "./tool.js";
class Detailslogin {//登录注册显示效果
    constructor() {
        this.login = $(".topNavLeftLogin");//登录后显示
        this.nologin = $(".topNavLeft");//登录前显示
        this.user = $(".topNavLeftLogin .username");//用户名显示框
        this.quit = $(".topNavLeftLogin .quit");//退出按钮
    }
    init() {
        this.exist();
        //给退出按钮添加点击事件
        this.quit.onclick = () => {
            cookie.delcookie("username");
            this.exist();
        }
    }
    //登录和注册标题的显示
    exist() {
        if (cookie.getcookie('username')) {
            this.login.css({ display: "block" });
            this.nologin.css({ display: "none" });
            this.user.innerHTML = cookie.getcookie('username');
        } else {
            this.login.css({ display: "none" });
            this.nologin.css({ display: "block" });
        }
    }
}
class Drender {//数据渲染
    constructor() {
        this.piclist = $(".litimg_box .litimgUl")//小图列表
        this.showImg = $(".showImgBox img");//小图展示窗口
        this.goodstitle = $(".product-title");//商品标题
        this.title = $("title");//title标签
        this.imgBig = $(".showImgBig");//大图
        this.subTit = $(".subTit");//商品信息
        this.price = $(".currentPrice .price");//价格
        this.oldprice = $(".addprice .oldprice");//折前价格
        this.leftbtn = $(".scrollleft")//左箭头
        this.rightbtn = $(".scrollright")//右箭头
        this.num = 4;//最大显示图片数量
    }
    init() {
        //获取数据并渲染
        let sid = window.location.search.substr(1).split("=")[1];
        ajax({
            url: "http://10.31.161.143/wangyikaola/php/details.php",
            dataType: "json",
            data: {
                sid: sid,
            }
        }).then((data) => {
            this.render(data);
        })
        //给左右箭头添加事件
        this.leftbtn.onclick = () => {
            this.moveleft();
        }
        this.rightbtn.onclick = () => {
            this.moveright();
        }
    }
    //渲染普通数据
    render(data) {
        this.showImg.src = data.url;
        this.imgBig.src = data.url;
        this.title.innerHTML = data.title;
        this.goodstitle.innerHTML = data.title;
        this.subTit.innerHTML = data.lable;
        this.price.innerHTML = data.price;
        this.oldprice.innerHTML = data.oldpic;
        let urlarr = data.urls.split(",");
        this.renderpic(urlarr)
    }
    //渲染图片列表
    renderpic(arr) {
        let str = "";
        for (let url of arr) {
            str += `<li>
                <a href="javascript:;">
                    <img src="${url}">
                </a>
            </li>`
        }
        this.piclist.innerHTML = str;
        this.aLi = $(".litimg_box .litimgUl li");
        this.lipic = $(".litimg_box .litimgUl li img")
        this.aLi[0].addClass("active");
        this.leftbtn.css({ color: "#ccc" });
        this.width = this.aLi[0].offsetWidth + 10;
        if (this.aLi.length <= this.num) {
            this.rightbtn.css({ color: "#ccc" });
        }
        for (let li of this.aLi) {
            li.onmouseover = () => {
                for (let i of this.aLi) {
                    i.removeClass("active");
                }
                this.tabImg(li);
            }
        }
    }
    //给渲染出来的li添加事件
    tabImg(obj) {
        obj.addClass("active");
        this.imgBig.src = this.lipic[obj.index()].src;
        this.showImg.src = this.lipic[obj.index()].src;
    }
    //左右移动
    moveleft() {
        if (this.num > 4) {
            this.num--;
            if (this.num == 4) {
                this.leftbtn.css({ color: "#ccc" });
            }
            bufferMove(this.piclist, { left: -(this.num - 4) * this.width });
            this.rightbtn.css({ color: "#333" });
        }
    }
    moveright() {
        if (this.aLi.length > this.num) {
            this.num++;
            if (this.num === this.aLi.length) {
                this.rightbtn.css({ color: "#ccc" });
            }
            bufferMove(this.piclist, { left: -(this.num - 4) * this.width });
            this.leftbtn.css({ color: "#333" });
        }
    }
}
class Magnifying {
    constructor() {
        this.bf = $(".showDetails");
        this.sf = $(".shadow");
        this.imgBox = $(".showImgBox");//要克隆的元素
        this.bpic = $(".showImgBig");//大图
        this.spic = $(".showImgBox img");//小图
        this.wrap = $(".j-producthead");//定位父级
        this.addbtn = $("#addCart");//添加购物车按钮
        this.car = $(".tocar");//目标点位置
        this.box = $(".PImgBox");//克隆元素添加的父元素
        this.count=$(".ctrnum-qty");//input输入框
        this.asd=$(".ctrnum-b-asd");//加号
        this.dis=$(".ctrnum-b-rd ")//减号
    }
    init() {
        //鼠标移入
        this.imgBox.onmouseover = () => {
            this.showbox();
        }
        //鼠标移出
        this.imgBox.onmouseout = () => {
            this.hidebox();
        }
        //鼠标移动
        this.imgBox.onmousemove = (ev) => {
            ev = ev || event;
            this.move(ev);
        }
        //给添加购物车按钮添加事件
        this.addbtn.onclick = () => {
            this.addCar();
        }
        this.asd.onclick=()=>{
            this.add();
        }
        this.dis.onclick=()=>{
            this.subtract();
        }
    }
    //显示sf和bf;
    showbox() {
        this.bf.css({ display: "block" });
        this.sf.css({ display: "block" });
        this.bili = this.bf.offsetWidth / this.sf.offsetWidth;
    }
    //隐藏sf和bf;
    hidebox() {
        this.bf.css({ display: "none" });
        this.sf.css({ display: "none" });
    }
    //鼠标移动时
    move(ev) {
        let top = ev.clientY - this.wrap.offsetTop - this.sf.offsetHeight / 2;
        let left = ev.clientX - this.wrap.offsetLeft - this.sf.offsetWidth / 2;
        if (top <= 0) {
            top = 0;
        } else if (top >= this.imgBox.offsetHeight - this.sf.offsetHeight - 2) {
            top = this.imgBox.offsetHeight - this.sf.offsetHeight - 2;
        }
        if (left <= 0) {
            left = 0;
        } else if (left >= this.imgBox.offsetWidth - this.sf.offsetWidth - 2) {
            left = this.imgBox.offsetWidth - this.sf.offsetWidth - 2;
        }
        this.sf.css({
            left: left + "px",
            top: top + "px"
        });
        this.bpic.css({
            left: -left * this.bili + "px",
            top: -top * this.bili + "px"
        })
    }
    //添加购物车
    addCar() {
        if (cookie.getcookie('username')) {
            // this.parabolic();
            this.save();
        } else {
            alert("您好请先登录");
        }
    }
    // //抛物运动
    // parabolic(){
    //     let clonebox = this.imgBox.cloneNode(true);
    //     clonebox.style.cssText = 'width:50px;height:50px;opacity:1;position: absolute;';
    //     clonebox.id="showImgBox1"
    //     this.box.appendChild(clonebox);
    //     let position = {
    //         x: this.wrap.offsetLeft,
    //         y: clonebox.offsetTop
    //     };
    //     let distance = {
    //         x: this.car.offsetLeft - position.x,
    //         y: this.car.offsetTop - position.y
    //     };
    //     co
    //     let a = 0.003;
    //     let b = (distance.y - a * distance.x * distance.x) / distance.x;
    //     let x = 0;
    //     let timer=setInterval(()=>{
    //         x += 10;
    //         if(clonebox.offsetLeft>=this.car.offsetLeft){
    //             clearInterval(timer);
    //             console.log(1);
    //             this.box.removeChild(clonebox);
    //         }else{
    //             clonebox.style.left = position.x + x + 'px';
    //             clonebox.style.top = position.y + a * x * x + b * x + 'px';
    //             console.log(2);
    //         }
    //     },1000/60)
    // }

    //存购物车
    save() {
        let username = cookie.getcookie('username');
        let sidarr = [];
        let numarr = [];
        let id=window.location.search.substr(1).split("=")[1];
        if (cookie.getcookie(username + "cookieid") && cookie.getcookie(username + "cookienum")) {
            sidarr = cookie.getcookie(username + "cookieid").split(",");
            numarr = cookie.getcookie(username + "cookienum").split(",");
        }
        if(sidarr.indexOf(id)!==-1){
            numarr[sidarr.indexOf(id)]=parseInt(numarr[sidarr.indexOf(id)])+parseInt(this.count.value);
            cookie.addcookie(username + "cookienum",numarr.toString(),10);
        }else{
            sidarr.push(id);
            numarr.push(this.count.value);
            cookie.addcookie(username + "cookieid",sidarr.toString(),10);
            cookie.addcookie(username + "cookienum",numarr.toString(),10);
        }
        alert("已加入购物车")
    }
    //加
    add(){
        let num=this.count.value;
        num++;
        this.count.value=num;
        this.dis.removeClass("ctrnum-b-dis");
    }
    subtract(){
        let num=this.count.value;
        if(num!=1){
            num--;
            this.count.value=num;
            if(num==1){
                this.dis.addClass("ctrnum-b-dis");
            }
        }
    }
}
export { Detailslogin, Drender, Magnifying }