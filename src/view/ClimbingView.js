const ClimbingViewController = require("../controller/ClimbingViewController");
const AddButton = require("./AddButton");

class ClimbingView extends ClimbingViewController{
    constructor(){
        super();
    }
    setView(){
        let add_button = new AddButton();
        MainView.clearAllViews();
        MainView.init(true,true);
        this.setRoutes();
        add_button.init();
    }
}

module.exports=ClimbingView;