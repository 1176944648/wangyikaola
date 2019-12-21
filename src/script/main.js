import { Slideshow, Stairs } from "./index_effect.js/";
import { Tab, Register, Login } from "./login_effect.js";
import { Detailslogin, Drender, Magnifying } from "./details_effect.js";
import { Cartlogin, Cartrender } from "./cart_effect.js";
if (document.querySelector("#index")) {
    new Slideshow().init();
    new Stairs().init();
} else if (document.querySelector("#login")) {
    new Tab().init();
    new Register().init();
    new Login().init();
} else if (document.querySelector("#details")) {
    new Drender().init();
    new Detailslogin().init();
    new Magnifying().init();
}
 else if (document.querySelector("#cart")) {
    new Cartlogin().init();
    new Cartrender().init();
}