"use strict";var _index_effect=require("./index_effect.js/"),_login_effect=require("./login_effect.js"),_details_effect=require("./details_effect.js"),_cart_effect=require("./cart_effect.js");document.querySelector("#index")?((new _index_effect.Slideshow).init(),(new _index_effect.Stairs).init()):document.querySelector("#login")?((new _login_effect.Tab).init(),(new _login_effect.Register).init(),(new _login_effect.Login).init()):document.querySelector("#details")?((new _details_effect.Drender).init(),(new _details_effect.Detailslogin).init(),(new _details_effect.Magnifying).init()):document.querySelector("#cart")&&((new _cart_effect.Cartlogin).init(),(new _cart_effect.Cartrender).init());