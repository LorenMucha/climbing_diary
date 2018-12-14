const Colors = require("../models/Colors");
const ClimbingView = require("../view/ClimbingView");

class SideBarController{
    constructor() {
        this.container = "#sidenav";
        this.routen =".routen";
        this.training = ".training";
        this.bouldern = ".bouldern";
    }
    open(){
        $(this.container).css("width",250);
    }
    close(){
        $(this.container).css("width",0);
    }
    setStartView(startView){
        console.log("set start view for:",startView);
        if(startView==="routen"){
            this.highlightTag(this.routen);
            this.setClimbingView();
        }
    }
    setClimbingView(){
        console.log("set climbing view");
        var climbing_view = new ClimbingView();
        climbing_view.setView();
        climbing_view.setRoutes();
    }
    highlightTag(element){
        var colors = new Colors();
        $(element).css("color",colors.getActiveColor());
    }
}
module.exports = SideBarController;