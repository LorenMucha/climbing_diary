const SideBarController = require("../controller/SideBarController");

//sidebar object
class Sidebar extends SideBarController{
    constructor(_startView){
        super();
        this.startView = _startView;
        this.init();
    }
    init(){
        const object = this;
        $('body').append(`<div id="sidenav" class="sidenav">
                            <a href="javascript:void(0)" class="closebtn">&times;</a>
                            <a href="#" class="training">Training</a>
                            <a href="#" class="routen">Routen</a>
                            <a href="#" class="bouldern">Bouldern</a>
                        </div>`);
        //bind the click events
        $('.closebtn').on("click",function(){object.close();});
        $('.routen').on("click",function(){object.setClimbingView()});
        $('.bouldern').on("click",function(){object.setBoulderView()});

        if(this.startView){
            this.setStartView(this.startView);
        }
    }
}
module.exports = Sidebar;