const AddButton = require("../view/AddButton");

class ClimbingViewController{
    constructor(){
        this.id_sort_menu = "sort_menu";
        this.id_route_list = "route_list";
    }
    setView(){
        let add_button = new AddButton();
        MainView.clearAllViews();
        MainView.init(true,true);
        this.setRoutes();
        add_button.init();
    }
}
module.exports = ClimbingViewController;