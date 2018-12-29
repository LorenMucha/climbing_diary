const MainViewController = require("../controller/MainViewController");
const id_left_view = "left_view";
const id_right_view = "right_view";
class MainView extends MainViewController{
    constructor(){
       super();
    }
    static init(left,right){
        if(left){
            $("#root").append(`<div class="float-left" id="${id_left_view}"></div>`);
        }
        if(right){
            $("#root").append(`<div class="float-right" id="${id_right_view}"></div>`);
        }
    }
}

module.exports=MainView;