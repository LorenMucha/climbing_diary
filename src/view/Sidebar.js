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
                                <a href="#" class="training list-group-item selector">Training</a>
                                <a href="#" class="list-group-item active selector" data-el="klettern-li">Klettern</a>
                                <div class="list-group-flush display-none sublist ml-5" id="klettern-li">
                                      <a href="#" class="list-group-item" id="routen">Routen</a>
                                      <a href="#" class="list-group-item" id="routen_gebiete">Gebiete</a>
                                      <a href="#" class="list-group-item" id="routen_projekte">Projekte</a>
                                </div>
                                <a href="#" class="bouldern list-group-item selector" data-el="bouldern-li">Bouldern</a>
                                <div class="list-group-flush w-50 display-none sublist ml-5" id="bouldern-li">
                                      <a href="#" class="list-group-item" id="boulder">Boulder</a>
                                      <a href="#" class="list-group-item">Gebiete</a>
                                      <a href="#" class="list-group-item">Projekte</a>
                                </div>
                            </div>
                        </div>`);
        //bind the click events
        $('.closebtn').on("click",function(){object.close();});
        $('.selector').on("click",function(){object.setTag($(this));});
        $('#routen').click(function () {object.setClimbingView();});
        $('#routen_gebiete').click(function (){object.setBoulderView();});
        //$('.bouldern').on("click",function(){object.setBoulderView()});

        if(this.startView){
            this.setStartView(this.startView);
        }
    }
}
module.exports = Sidebar;