const MainViewController = require("../controller/MainViewController");
class MainView extends MainViewController{
    constructor(){
       super();
    }
   init(left,right) {
       let right_view = $(this.right_id),
           left_view = $(this.left_id);
       if (right_view.length == 0 && left_view.length == 0) {
           if (left) {
               $(`${this.root_id}`).append(`<div class="float-left" id="${this.left_id.replace("#", "")}"></div>`);
           }

           if (right) {
               $(`${this.root_id}`).append(`<div class="float-right" id="${this.right_id.replace("#", "")}"></div>`);
           }
       }
   }
}

module.exports=MainView;