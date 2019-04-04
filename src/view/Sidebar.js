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
                            <div class="list-group-flush item-list-navbar">
                                <a href="#" class="training list-group-item">Training</a>
                                //todo
                                <div class="list-group-flush">
                                      <a href="#" class="list-group-item">Item 1.1.1</a>
                                      <a href="#" class="list-group-item">Item 1.1.2</a>
                                      <a href="#" class="list-group-item">Item 1.1.3</a>
                                </div>
                                <a href="#" class="routen list-group-item active">Routen</a>
                                <a href="#" class="bouldern list-group-item">Bouldern</a>
                            </div>
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