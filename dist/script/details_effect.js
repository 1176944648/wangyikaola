"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Magnifying=exports.Drender=exports.Detailslogin=void 0;var _createClass=function(){function s(t,i){for(var o=0;o<i.length;o++){var s=i[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(t,i,o){return i&&s(t.prototype,i),o&&s(t,o),t}}(),_tool=require("./tool.js");function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var Detailslogin=function(){function t(){_classCallCheck(this,t),this.login=(0,_tool.$)(".topNavLeftLogin"),this.nologin=(0,_tool.$)(".topNavLeft"),this.user=(0,_tool.$)(".topNavLeftLogin .username"),this.quit=(0,_tool.$)(".topNavLeftLogin .quit")}return _createClass(t,[{key:"init",value:function(){var t=this;this.exist(),this.quit.onclick=function(){_tool.cookie.delcookie("username"),t.exist()}}},{key:"exist",value:function(){_tool.cookie.getcookie("username")?(this.login.css({display:"block"}),this.nologin.css({display:"none"}),this.user.innerHTML=_tool.cookie.getcookie("username")):(this.login.css({display:"none"}),this.nologin.css({display:"block"}))}}]),t}(),Drender=function(){function t(){_classCallCheck(this,t),this.piclist=(0,_tool.$)(".litimg_box .litimgUl"),this.showImg=(0,_tool.$)(".showImgBox img"),this.goodstitle=(0,_tool.$)(".product-title"),this.title=(0,_tool.$)("title"),this.imgBig=(0,_tool.$)(".showImgBig"),this.subTit=(0,_tool.$)(".subTit"),this.price=(0,_tool.$)(".currentPrice .price"),this.oldprice=(0,_tool.$)(".addprice .oldprice"),this.leftbtn=(0,_tool.$)(".scrollleft"),this.rightbtn=(0,_tool.$)(".scrollright"),this.num=4}return _createClass(t,[{key:"init",value:function(){var i=this,t=window.location.search.substr(1).split("=")[1];(0,_tool.ajax)({url:"http://10.31.161.143/wangyikaola/php/details.php",dataType:"json",data:{sid:t}}).then(function(t){i.render(t)}),this.leftbtn.onclick=function(){i.moveleft()},this.rightbtn.onclick=function(){i.moveright()}}},{key:"render",value:function(t){this.showImg.src=t.url,this.imgBig.src=t.url,this.title.innerHTML=t.title,this.goodstitle.innerHTML=t.title,this.subTit.innerHTML=t.lable,this.price.innerHTML=t.price,this.oldprice.innerHTML=t.oldpic;var i=t.urls.split(",");this.renderpic(i)}},{key:"renderpic",value:function(t){var l=this,i="",o=!0,s=!1,e=void 0;try{for(var n,c=t[Symbol.iterator]();!(o=(n=c.next()).done);o=!0){i+='<li>\n                <a href="javascript:;">\n                    <img src="'+n.value+'">\n                </a>\n            </li>'}}catch(t){s=!0,e=t}finally{try{!o&&c.return&&c.return()}finally{if(s)throw e}}this.piclist.innerHTML=i,this.aLi=(0,_tool.$)(".litimg_box .litimgUl li"),this.lipic=(0,_tool.$)(".litimg_box .litimgUl li img"),this.aLi[0].addClass("active"),this.leftbtn.css({color:"#ccc"}),this.width=this.aLi[0].offsetWidth+10,this.aLi.length<=this.num&&this.rightbtn.css({color:"#ccc"});var r=!0,h=!1,a=void 0;try{for(var u,f=function(){var n=u.value;n.onmouseover=function(){var t=!0,i=!1,o=void 0;try{for(var s,e=l.aLi[Symbol.iterator]();!(t=(s=e.next()).done);t=!0){s.value.removeClass("active")}}catch(t){i=!0,o=t}finally{try{!t&&e.return&&e.return()}finally{if(i)throw o}}l.tabImg(n)}},d=this.aLi[Symbol.iterator]();!(r=(u=d.next()).done);r=!0)f()}catch(t){h=!0,a=t}finally{try{!r&&d.return&&d.return()}finally{if(h)throw a}}}},{key:"tabImg",value:function(t){t.addClass("active"),this.imgBig.src=this.lipic[t.index()].src,this.showImg.src=this.lipic[t.index()].src}},{key:"moveleft",value:function(){4<this.num&&(this.num--,4==this.num&&this.leftbtn.css({color:"#ccc"}),(0,_tool.bufferMove)(this.piclist,{left:-(this.num-4)*this.width}),this.rightbtn.css({color:"#333"}))}},{key:"moveright",value:function(){this.aLi.length>this.num&&(this.num++,this.num===this.aLi.length&&this.rightbtn.css({color:"#ccc"}),(0,_tool.bufferMove)(this.piclist,{left:-(this.num-4)*this.width}),this.leftbtn.css({color:"#333"}))}}]),t}(),Magnifying=function(){function t(){_classCallCheck(this,t),this.bf=(0,_tool.$)(".showDetails"),this.sf=(0,_tool.$)(".shadow"),this.imgBox=(0,_tool.$)(".showImgBox"),this.bpic=(0,_tool.$)(".showImgBig"),this.spic=(0,_tool.$)(".showImgBox img"),this.wrap=(0,_tool.$)(".j-producthead"),this.addbtn=(0,_tool.$)("#addCart"),this.car=(0,_tool.$)(".tocar"),this.box=(0,_tool.$)(".PImgBox"),this.count=(0,_tool.$)(".ctrnum-qty"),this.asd=(0,_tool.$)(".ctrnum-b-asd"),this.dis=(0,_tool.$)(".ctrnum-b-rd ")}return _createClass(t,[{key:"init",value:function(){var i=this;this.imgBox.onmouseover=function(){i.showbox()},this.imgBox.onmouseout=function(){i.hidebox()},this.imgBox.onmousemove=function(t){t=t||event,i.move(t)},this.addbtn.onclick=function(){i.addCar()},this.asd.onclick=function(){i.add()},this.dis.onclick=function(){i.subtract()}}},{key:"showbox",value:function(){this.bf.css({display:"block"}),this.sf.css({display:"block"}),this.bili=this.bf.offsetWidth/this.sf.offsetWidth}},{key:"hidebox",value:function(){this.bf.css({display:"none"}),this.sf.css({display:"none"})}},{key:"move",value:function(t){var i=t.clientY-this.wrap.offsetTop-this.sf.offsetHeight/2,o=t.clientX-this.wrap.offsetLeft-this.sf.offsetWidth/2;i<=0?i=0:i>=this.imgBox.offsetHeight-this.sf.offsetHeight-2&&(i=this.imgBox.offsetHeight-this.sf.offsetHeight-2),o<=0?o=0:o>=this.imgBox.offsetWidth-this.sf.offsetWidth-2&&(o=this.imgBox.offsetWidth-this.sf.offsetWidth-2),this.sf.css({left:o+"px",top:i+"px"}),this.bpic.css({left:-o*this.bili+"px",top:-i*this.bili+"px"})}},{key:"addCar",value:function(){_tool.cookie.getcookie("username")?this.save():alert("您好请先登录")}},{key:"save",value:function(){var t=_tool.cookie.getcookie("username"),i=[],o=[],s=window.location.search.substr(1).split("=")[1];_tool.cookie.getcookie(t+"cookieid")&&_tool.cookie.getcookie(t+"cookienum")&&(i=_tool.cookie.getcookie(t+"cookieid").split(","),o=_tool.cookie.getcookie(t+"cookienum").split(",")),-1!==i.indexOf(s)?o[i.indexOf(s)]=parseInt(o[i.indexOf(s)])+parseInt(this.count.value):(i.push(s),o.push(this.count.value),_tool.cookie.addcookie(t+"cookieid",i.toString(),10)),_tool.cookie.addcookie(t+"cookienum",o.toString(),10),alert("已加入购物车")}},{key:"add",value:function(){var t=this.count.value;t++,this.count.value=t,this.dis.removeClass("ctrnum-b-dis")}},{key:"subtract",value:function(){var t=this.count.value;1!=t&&(t--,1==(this.count.value=t)&&this.dis.addClass("ctrnum-b-dis"))}}]),t}();exports.Detailslogin=Detailslogin,exports.Drender=Drender,exports.Magnifying=Magnifying;