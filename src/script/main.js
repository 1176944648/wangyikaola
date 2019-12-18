import { Slideshow, Stairs } from "./index_effect.js/";
import { Tab , Register , Login} from "./login_effect.js";
if (document.body.id === "index") {
    new Slideshow().init();
    new Stairs().init();
} else if (document.body.id === "login") {
    new Tab().init();
    new Register().init();
    new Login().init();
}