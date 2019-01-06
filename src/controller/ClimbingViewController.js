const AddButton = require("../view/AddButton");

class ClimbingViewController{
    constructor(){
        this.id_route_list = "#route_list";
        this.id_chart = "#chart";
        this.data = false;
    }
    setView(){
        let add_button = new AddButton();
        main_view.clearAllViews();
        main_view.init(true,true);
        main_view.setViewState("climbing");
        this.setRoutes();
        add_button.init();
    }
}
module.exports = ClimbingViewController;