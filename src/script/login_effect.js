import {ajax, cookie, $, addEvent , bufferMove} from "./tool.js";
//登录注册表单的切换
class Tab {
    constructor() {
        this.regtitle = $(".regtop");
        this.logtitle = $(".logtop");
        this.showlog = $(".regtop a");
        this.showreg = $(".logtop a");
        this.reg = $("#register");
        this.log = $("#logins");
    }
    //给切换登录注册表单按钮添加事件
    init() {
        this.showreg.onclick = () => {
            this.showregister();
        }
        this.showlog.onclick = () => {
            this.showlogin();
        }

        let str = window.location.search;
        let flag = str.substr(6);
        if (flag === "login") {
            this.showlogin();
        } else if (flag === "register") {
            this.showregister();
        }
    }
    //登录表单的显示和注册表单的隐藏
    showlogin() {
        this.regtitle.css({ display: "none" });
        this.logtitle.css({ display: "block" });
        this.log.css({ display: "block" });
        this.reg.css({ display: "none" });

    }
    //注册表单的显示和登录表单的隐藏
    showregister() {
        this.regtitle.css({ display: "block" });
        this.logtitle.css({ display: "none" });
        this.log.css({ display: "none" });
        this.reg.css({ display: "block" });
    }
}
//注册表单验证
class Register {
    constructor() {
        this.input = $("#register input");
        this.span = $("#register span");
        this.from = $("#register");
    }
    init() {
        //用户名输入框获得焦点
        this.input[0].onfocus = () => {
            this.usernameget();
        }
        //用户名输入框失去焦点
        this.input[0].onblur = () => {
            this.usernamelose();
        }
        //密码框获得焦点
        this.input[1].onfocus = () => {
            this.passwordget();
        }
        //密码判定强度
        this.input[1].oninput = () => {
            this.passwordon();
        }
        //密码框失去焦点
        this.input[1].onblur = () => {
            this.passwordlose();
        }
        //邮箱获得焦点时
        this.input[2].onfocus = () => {
            this.emailget();
        }
        //邮箱失去焦点
        this.input[2].onblur = () => {
            this.emaillose();
        }
        //手机获得焦点
        this.input[3].onfocus = () => {
            this.telget();
        }
        //手机失去焦点
        this.input[3].onblur = () => {
            this.tellose();
        }
        //提交的时候
        this.from.onsubmit = () => {
            let flag = false
            this.submit();
            for (let span of this.span) {
                if (span.innerHTML !== "√") {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                return false;
            } else {
                cookie.addcookie("username", this.input[0].value, 10);
            }
        }
    }
    //用户名获取焦点
    usernameget() {
        this.span[0].css({ color: "#666" }).innerHTML = "最长14个英文或7个汉字";
    }
    //用户名失去焦点
    usernamelose() {
        if (this.input[0].value !== "") {
            let leg = this.input[0].value.replace(/[\u4e00-\u9fa5]/g, "**").length;
            if (leg <= 14) {
                if (/^[\u4e00-\u9fa5_a-zA-Z]*$/.test(this.input[0].value)) {
                    ajax({
                        type: "post",
                        url: "http://10.31.161.143/wangyikaola/php/register.php",
                        data: {
                            username: this.input[0].value
                        }
                    }).then((data) => {
                        if (!data) {
                            this.span[0].css({ color: "green" }).innerHTML = "√";
                        } else {
                            this.span[0].css({ color: "red" }).innerHTML = "用户名已存在";
                        }
                    })
                } else {
                    this.span[0].css({ color: "red" }).innerHTML = "用户名格式错误";
                }
            } else {
                this.span[0].css({ color: "red" }).innerHTML = "用户名过长";
            }
        } else {
            this.span[0].css({ color: "red" }).innerHTML = "用户名不能为空";
        }
    }
    //密码获得焦点
    passwordget() {
        this.span[1].css({ color: "#666" }).innerHTML = "请输入8-14位密码";
    }
    //密码输入时判定强度
    passwordon() {
        if (this.input[1].value.length >= 8) {
            let count = 0;
            if (/\d+/.test(this.value)) {
                count++;
            }
            if (/[a-z]+/.test(this.value)) {
                count++;
            }
            if (/[A-Z]+/.test(this.value)) {
                count++;
            }
            if (/[\W\_]+/.test(this.value)) {
                count++;
            }
            switch (count) {
                case 1:
                    this.span[1].css({ color: "red" }).innerHTML = "弱";
                    break;
                case 2:
                case 3:
                    this.span[1].css({ color: "orange" }).innerHTML = "中";
                    break;
                case 4:
                    this.span[1].css({ color: "green" }).innerHTML = "强";
                    break;
            }
            if (this.input[1].value.length > 14) {
                this.span[1].css({ color: "red" }).innerHTML = "密码过长";
            }
        }
    }
    //密码失去焦点
    passwordlose() {
        if (this.input[1].value !== "") {
            if (this.input[1].value.length > 8) {
                if (this.span[1].innerHTML === "弱" || this.span[1].innerHTML === "中" || this.span[1].innerHTML === "强") {
                    this.span[1].css({ color: "green" }).innerHTML = "√";
                }
            }else{
                this.span[1].css({color:"red"}).innerHTML="密码太短";
            }

        } else {
            this.span[1].css({ color: "red" }).innerHTML = "密码不能为空";
        }
    }
    //邮箱获得焦点
    emailget() {
        this.span[2].css({ color: "#666" }).innerHTML = "请输入邮箱";
    }
    //邮箱失去焦点
    emaillose() {
        if (this.input[2].value !== "") {
            if (/^(\w+[\+\-\_\.]*\w)\@(\w+[\+\-\_\.]*\w+)\.(\w+[\+\-\_\.]*\w+)$/.test(this.input[2].value)) {
                this.span[2].css({ color: "green" }).innerHTML = "√";
            } else {
                this.span[2].css({ color: "red" }).innerHTML = "请输入正确邮箱";
            }
        } else {
            this.span[2].css({ color: "red" }).innerHTML = "邮箱不能为空";
        }
    }
    //手机获得焦点
    telget() {
        this.span[3].css({ color: "#666" }).innerHTML = "请输入手机号";
    }
    //手机失去焦点
    tellose() {
        if (this.input[3].value !== "") {
            if (/^1[3578]\d{9}$/.test(this.input[3].value)) {
                this.span[3].css({ color: "green" }).innerHTML = "√";
            } else {
                this.span[3].css({ color: "red" }).innerHTML = "请输入正确手机号";
            }
        } else {
            this.span[3].css({ color: "red" }).innerHTML = "手机号码不能为空";
        }
    }
    //提交时
    submit() {
        if (this.input[0].value === "") {
            this.span[0].css({ color: "red" }).innerHTML = "用户名不能为空";
        }
        if (this.input[1].value === "") {
            this.span[1].css({ color: "red" }).innerHTML = "密码不能为空";
        }
        if (this.input[2].value === "") {
            this.span[2].css({ color: "red" }).innerHTML = "邮箱不能为空";
        }
        if (this.input[3].value === "") {
            this.span[3].css({ color: "red" }).innerHTML = "手机号码不能为空";
        }
    }
}
//登录
class Login {
    constructor() {
        this.username = $("#logins input")[0];
        this.password = $("#logins input")[1];
        this.log = $("#logins input")[2];
        this.span = $("#logins span");
    }
    init() {
        //给登录按钮添加点击事件
        this.log.onclick = () => {
            if (this.username.value !== "" && this.password.value !== "") {
                this.login();
            } else {
                this.span.css({ color: "red" }).innerHTML = "请输入用户名和密码";
            }
        }
    }
    //登录
    login() {
        ajax({
            type: "post",
            url: "http://10.31.161.143/wangyikaola/php/login.php",
            data: {
                username: this.username.value,
                password: this.password.value
            }
        }).then((data) => {
            if (!data) {
                this.span.css({ color: "red" }).innerHTML = "用户名或密码错误";
            } else {
                cookie.addcookie("username", this.username.value, 10);
                location.href = 'index.html';
            }
        })
    }
}
export { Tab, Register, Login };