const MainViewController = require("../controller/MainViewController");
class MainView extends MainViewController{
    constructor(){
       super();
    }
   init(left,right){
        if(left){
            $(`${this.root_id}`).append(`<div class="float-left" id="${this.left_id.replace("#","")}"></div>`);
        }
        if(right){
            $(`${this.root_id}`).append(`<div class="float-right" id="${this.right_id.replace("#","")}"></div>`);
        }
    }
}

module.exports=MainView;