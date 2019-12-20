//ajax
function ajax(obj) {
    function objectToString(obj) {
        let objarr = [];
        for (let i in obj) {
            objarr.push(i + '=' + obj[i])
        }
        return objarr.join('&');
    }

    //创建promise对象
    let promise = new Promise((resolve, reject) => {
        //创建ajax对象
        let ajax = new XMLHttpRequest();
        //设定obj.type默认值
        obj.type = obj.type || "get";
        //判断obj.url不能为空
        if (!obj.url) {
            throw new Error("接口连接不能为空")
        }
        //判断是否需要传输数据
        if (obj.data) {
            if (Object.prototype.toString.call(obj.data).slice(8, -1) === "Object") {
                obj.data = objectToString(obj.data);
            } else {
                obj.data = obj.data;
            }
        }
        //需要传输数据且请求类型为get时
        if (obj.data && obj.type === "get") {
            obj.url += '?' + obj.data;
        }
        //判断同步和异步
        if (obj.async == "false") {
            obj.async = false;
        } else {
            obj.async = true;
        }
        ajax.open(obj.type, obj.url, obj.async);
        //请求类型为post时
        if (obj.data && obj.type === "post") {
            ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded")
            ajax.send(obj.data);
        } else {
            ajax.send();
        }
        //异步时
        if (obj.async) {
            ajax.onreadystatechange = () => {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        let objdata = null;
                        if (obj.dataType === 'json') {
                            objdata = JSON.parse(ajax.responseText)
                        } else {
                            objdata = ajax.responseText
                        }
                        resolve(objdata)
                    } else {
                        reject('接口地址有误')
                    }
                }
            }
        } else {
            if (ajax.status === 200) {
                let objdata = null;
                if (obj.dataType === 'json') {
                    objdata = JSON.parse(ajax.responseText)
                } else {
                    objdata = ajax.responseText
                }
                resolve(objdata)
            } else {
                reject('接口地址有误')
            }
        }
    })

    return promise;
};
//cookie
let cookie = {
    addcookie: function (key, value, time) {
        let d = new Date();
        d.setDate(d.getDate() + time);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
    },
    getcookie: function (key) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    },
    delcookie: function (key) {
        this.addcookie(key, '', -1);
    }
};
//取元素
function $(select) {
    let obj = document.querySelectorAll(select);
    //添加类
    function addClass(classname) {
        let str = this.className;
        let strarr = str.split(" ");
        if (strarr.indexOf(classname) === -1) {
            strarr.push(classname);
            str = strarr.join(" ");
            this.className = str;
        }
    };
    //删除类
    function removeClass(classname) {
        if (this.className !== "") {
            let str = this.className;
            let strarr = str.split(" ");
            let index = strarr.indexOf(classname);
            if (index !== -1) {
                strarr.splice(index, 1);
                str = strarr.join(" ");
                this.className = str;
            }
        }
    }
    //添加css样式
    function css(obj) {
        for (let key in obj) {
            this.style[key] = obj[key];
        }
        return this;
    }
    //鼠标移入移出事件
    function hover(a, b) {
        this.onmouseover = a;
        this.onmouseout = b;
        return this;
    }
    //判断是否取到元素
    if(!obj){
        throw new Error("未获取到元素");
    }
    //获取元素
    if (obj.length > 1) {
        let arr = []
        for (let j of obj) {
            arr.push(j);
        }
        for (let i of obj) {
            i.addClass = addClass;
            i.removeClass = removeClass;
            i.index = function () {//获取目标元素索引
                return arr.indexOf(this);
            };
            i.hover = hover;
            i.css = css;
        }
    } else {
        obj = document.querySelector(select);
        obj.addClass = addClass;
        obj.removeClass = removeClass;
        obj.hover = hover;
        obj.css = css;
    }
    return obj;
};
//事件绑定
function addEvent(obj, etype, fn, bool) {
    if (obj.addEventListener) {
        obj.addEventListener(etype, fn, bool);
    } else {
        obj.attachEvent('on' + etype, fn);
    }
}
//缓冲运动
function bufferMove(obj, json, fn) {
    var speed = 0;
    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
    clearInterval(obj.timer); //防止事件下面定时器叠加
    obj.timer = setInterval(function () {
        var flag = true; //假设运动已经结束

        //开始属性遍历运动
        for (var attr in json) { //attr:css属性名称  json[attr]:目标点 前面的target
            //1.求当前的css属性值
            var currentValue = null;
            if (attr === 'opacity') { //透明度
                currentValue = getStyle(obj, attr) * 100; //扩展100倍，透明度的目标100
            } else { //px单位的属性
                currentValue = parseInt(getStyle(obj, attr));
            }
            //2.求速度
            speed = (json[attr] - currentValue) / 5; //10：运动因子
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.判断运动开启和停止
            if (currentValue !== json[attr]) { //没到目标继续运动
                if (attr === 'opacity') { //透明度
                    obj.style.opacity = (currentValue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (currentValue + speed) + ');'; //IE
                }
                obj.style[attr] = currentValue + speed + 'px'; //属性一定要用中括号。
                flag = false; //运动没有结束
            }
        }

        if (flag) { //判断所有的属性都已经到了目标点了，如果没到继续运动falg=false,不满足此条件
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn(); //运动完成，执行回调函数。
        }
    }, 10);
}

export { ajax, cookie, $, addEvent, bufferMove };