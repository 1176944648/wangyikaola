import { ajax, cookie, $, addEvent, bufferMove } from "./tool.js";
class Cartlogin {
    constructor() {
        this.login = $(".yeslogin");//登录后显示
        this.nologin = $(".nologin");//登录前显示
        this.user = $(".yeslogin .username");//用户名显示框
        this.quit = $(".yeslogin .quit");//退出按钮
        this.nocart = $(".m-nocart")//购物车空状态时显示
        this.mcart = $(".m-cartbox")//购物车主体
        this.username = cookie.getcookie('username');//用户名
        this.itemlist = $(".item-list");//商品列表父框
    }
    init() {
        this.exist();
        //给退出按钮添加点击事件
        this.quit.onclick = () => {
            cookie.delcookie("username");
            this.exist();
        }
        this.emptycar();
    }
    //登录和注册标题的显示
    exist() {
        if (this.username) {
            this.login.css({ display: "block" });
            this.nologin.css({ display: "none" });
            this.user.innerHTML = this.username;
        } else {
            this.login.css({ display: "none" });
            this.nologin.css({ display: "block" });
        }
    }
    //商品列表的显示和隐藏
    emptycar() {
        if (cookie.getcookie(this.username + "cookieid")) {
            this.nocart.css({ display: "none" });
            this.mcart.css({ display: "block" });
            this.getdata();
        } else {
            this.nocart.css({ display: "block" });
            this.mcart.css({ display: "none" });
        }
    }
    //获取cookie转数组后转到后端获取数据
    getdata() {
        if (cookie.getcookie(this.username + "cookieid") && cookie.getcookie(this.username + "cookienum")) {
            let sidarr = cookie.getcookie(this.username + "cookieid").split(",");
            ajax({
                url: "http://10.31.161.143/wangyikaola/php/cart_render.php",
                type: "post",
                dataType: "json",
                data: {
                    sidarr: sidarr
                }
            }).then((data) => {
                this.render(data, sidarr);
            })
        }
    }
    //渲染数据
    render(data, arr) {
        let str = "";
        for (let obj of data) {
            let num = cookie.getcookie(this.username + "cookienum").split(",")[arr.indexOf(obj.sid)];
            str += ` <div class="goods-item goods-item-sele">
            <div class="goods-info">
                <div class="cell b-checkbox">
                    <div class="cart-checkbox">
                        <input type="checkbox" checked="" name="" id="ocheck" value="" sid=${obj.sid}>
                        <span class="line-circle"></span>
                    </div>
                </div>
                <div class="cell b-goods">
                    <div class="goods-name">
                        <div class="goods-pic">
                            <a href=""><img src=${obj.url} alt=""></a>
                        </div>
                        <div class="goods-msg">
                            <div class="goods-d-info">
                                <a href="">${obj.title}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cell b-props">
                    <div class="prop-text"></div>
                </div>
                <div class="cell b-price">
                    <strong>${obj.price}</strong>
                </div>
                <div class="cell b-quantity">
                    <div class="quantity-form">
                        <a class="quantity-down" href="javascript:void(0)">-</a>
                        <input type="text" sid=${obj.sid} value=${num}>
                        <a class="quantity-add" href="javascript:void(0)">+</a>
                    </div>
                    <div class="quantity-text">有货</div>
                </div>
                <div class="cell b-sum">
                    <strong>${num * obj.price}</strong>
                </div>
                <div class="cell b-action">
                    <a href="javascript:void(0)" sid=${obj.sid}>删除</a>
                </div>
            </div>
        </div>
           
        `
        }
        this.itemlist.innerHTML = str;
        this.acheck = $(".cart-checkbox .allsel");
        this.ocheck = $(".cart-checkbox #ocheck",true)
        this.total();
    }
    //计算总数和总价
    total() {
        this.allprice = $(".totalprice");//总价
        this.allcount = $(".amount-sum em");//总数
        this.oneprice = $(".b-price strong",true);//单价
        this.onecount = $(".quantity-form input",true);//数量
        this.subtotal = $(".b-sum strong",true);//小计
        let price = 0;
        let num = 0;
        for (let i = 0; i < this.oneprice.length; i++) {
            let subnum = this.oneprice[i].innerHTML * this.onecount[i].value
            this.subtotal[i].innerHTML = Math.round(subnum * 100) / 100;
            if (this.ocheck[i].checked) {
                num += +(this.onecount[i].value);
                price += +(this.subtotal[i].innerHTML);
            }
        }
        this.allcount.innerHTML = num;
        this.allprice.innerHTML = "￥" + price;
        this.oninput();
        this.add();
        this.allcheck();
        this.onecheck();
        this.delete();
        this.deletecheck();
    }
    //修改数量信息后存储新的cookie
    newcookie(i) {
        let numarr = cookie.getcookie(this.username + "cookienum").split(",");
        let sidarr = cookie.getcookie(this.username + "cookieid").split(",");
        let index = sidarr.indexOf(this.onecount[i].getAttribute("sid"));
        if (this.onecount[i].value != 0) {
            numarr[index] = this.onecount[i].value;
        } else {
            sidarr.splice(index, 1);
            numarr.splice(index, 1);
        }
        if (index === -1) {
            sidarr.push(this.onecount[i].getAttribute("sid"));
            numarr.push(this.onecount[i].value);
        }
        cookie.addcookie(this.username + "cookieid", sidarr.toString(), 10);
        cookie.addcookie(this.username + "cookienum", numarr.toString(), 10);
    }
    //给输入框添加事件
    oninput() {
        for (let i = 0; i < this.onecount.length; i++) {
            this.onecount[i].onblur = () => {
                if (this.onecount[i].value === "") {
                    this.onecount[i].value = 0;
                }
                this.total();
                this.newcookie(i);
            }
        }
    }
    //给+,-添加事件
    add() {
        this.up = $(".quantity-add",true);
        this.down = $(".quantity-down",true);
        for (let i = 0; i < this.up.length; i++) {
            let num = this.onecount[i].value;
            this.up[i].onclick = () => {
                num++;
                this.onecount[i].value = num;
                this.total();
                this.newcookie(i);
            }
            this.down[i].onclick = () => {
                num--;
                if (num < 0) {
                    num = 0;
                }
                this.onecount[i].value = num;
                this.total();
                this.newcookie(i);
            }
        }
    }
    //全选事件
    allcheck() {
        for (let i = 0; i < this.acheck.length; i++) {
            this.acheck[i].onclick = () => {
                for (let j = 0; j < this.ocheck.length; j++) {
                    this.ocheck[j].checked = this.acheck[i].checked;
                }
                for (let l = 0; l < this.acheck.length; l++) {
                    this.acheck[l].checked = this.acheck[i].checked;
                }
                this.total();
            }
        }
    }
    //单选事件
    onecheck() {
        let flag = 0;
        for (let i = 0; i < this.ocheck.length; i++) {
            this.ocheck[i].onclick = () => {
                this.total();
                for (let j = 0; j < this.ocheck.length; j++) {
                    if (this.ocheck[j].checked) {
                        flag++;
                    }
                }
                for (let l = 0; l < this.acheck.length; l++) {
                    if (flag != this.ocheck.length) {
                        this.acheck[l].checked = false;
                    } else {
                        this.acheck[l].checked = true;
                    }

                }
            }
        }
    }
    //删除
    delete() {
        let del = $(".b-action a",true);
        for (let i = 0; i < del.length; i++) {
            del[i].onclick = () => {
                if (confirm("你确定要删除吗")) {
                    this.itemlist.removeChild(del[i].parentNode.parentNode.parentNode);
                    this.total();
                    this.add();
                    let numarr = cookie.getcookie(this.username + "cookienum").split(",");
                    let sidarr = cookie.getcookie(this.username + "cookieid").split(",");
                    let index = sidarr.indexOf(del[i].getAttribute("sid"));
                    sidarr.splice(index, 1);
                    numarr.splice(index, 1);
                    cookie.addcookie(this.username + "cookienum", numarr.toString(), 10);
                    cookie.addcookie(this.username + "cookieid", sidarr.toString(), 10);
                }
            }
        }

    }
    //删除选中
    deletecheck(){
        let alldel=$(".alldel");
        alldel.onclick=()=>{
            if (confirm("你确定要删除吗")){
                for(let i=0;i<this.ocheck.length;i++){
                    if(this.ocheck[i].checked){
                        this.itemlist.removeChild(this.ocheck[i].parentNode.parentNode.parentNode.parentNode);
                        this.total();
                        this.add();
                        let numarr = cookie.getcookie(this.username + "cookienum").split(",");
                        let sidarr = cookie.getcookie(this.username + "cookieid").split(",");
                        let index = sidarr.indexOf(this.ocheck[i].getAttribute("sid"));
                        sidarr.splice(index, 1);
                        numarr.splice(index, 1);
                        cookie.addcookie(this.username + "cookienum", numarr.toString(), 10);
                        cookie.addcookie(this.username + "cookieid", sidarr.toString(), 10);
                    }
                }

            }
        }
    }
}
class Cartrender {
    constructor() {

    }
    init() {

    }

}
export { Cartlogin, Cartrender }