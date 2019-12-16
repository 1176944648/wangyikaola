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
    let obj = null;
    //添加类
    function addClass(classname) {
            let str = this.className;
            let strarr = str.split(" ");
            strarr.push(classname);
            str = strarr.join(" ");
            this.className = str;
    };
    //删除类
    function removeClass(classname) {
        if (this.className !== "") {
            let str = this.className;
            let strarr = str.split(" ");
            let index = strarr.indexOf(classname);
            strarr.splice(index, 1);
            str = strarr.join(" ");
            this.className = str;
        }
    }
    //目标元素索引
    function index(){
        return this.order;
    }
    //鼠标移入移出事件
    function hover(a,b){
        this.onmouseover=a;
        this.onmouseout=b;
    }
    if (document.querySelectorAll(select).length > 1) {
        obj = document.querySelectorAll(select);
        for (let i=0;i<obj.length;i++) {
            obj[i].order=i;
            obj[i].addClass = addClass;
            obj[i].removeClass = removeClass;
            obj[i].index=index;
            obj[i].hover=hover;
        }
    } else {
        obj = document.querySelector(select);
        obj.addClass = addClass;
        obj.removeClass = removeClass;
        obj.hover=hover;
    }
    return obj;
};
export { ajax, cookie, $ };