const MainViewController = require("../controller/MainViewController");

class MainView extends MainViewController{
    constructor(){
       super();
    }
    static init(left,right){
        if(left){
            $("#root").append('<div class="float-left" id="left_view"></div>');
        }
        if(right){
            $("#root").append('<div class="float-right" id="right_view"></div>');
        }
    }
}

module.exports=MainView;