import { ajax, cookie, $, addEvent, bufferMove } from "./tool.js";
class Cartlogin{
    constructor(){
        this.login = $(".yeslogin");//登录后显示
        this.nologin = $(".nologin");//登录前显示
        this.user = $(".yeslogin .username");//用户名显示框
        this.quit = $(".yeslogin .quit");//退出按钮
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
class Cartrender{
    constructor(){
        this.nocart=$(".m-nocart")//购物车空状态时显示
        this.username=cookie.getcookie('username');//用户名
        this.mcart=$(".m-cartbox")//购物车主体
    }
    init(){
        this.emptycar();
        console.log(123)
    }
    emptycar(){
        if(!cookie.getcookie(this.username+"sid")){
            this.nocart.css({display:"block"});
            this.mcart.css({display:"none"});
        }
    }
}
export{Cartlogin , Cartrender}