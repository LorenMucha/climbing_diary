const SideBarController = require("../controller/SideBarController");

//sidebar object
class Sidebar extends SideBarController{
    constructor(_startView){
        super();
        this.startView = _startView;
    }
    create(){
        const object = this;
        $('body').append(`<div id="sidenav" class="sidenav">
                            <a href="javascript:void(0)" class="closebtn" id="close-sideBar">&times;</a>
                            <div class="list-group-flush item-list-navbar">
                                <a href="#" class="training list-group-item selector">Training</a>
                                <a href="#" class="list-group-item active selector" data-el="klettern-li">Klettern</a>
                                <div class="list-group-flush display-none sublist ml-5" id="klettern-li">
                                      <a href="#" class="list-group-item route-item" data-target="routen">Routen</a>
                                      <a href="#" class="list-group-item route-item" data-target="routen-map">Gebiete</a>
                                      <a href="#" class="list-group-item route-item" data-target="routen-projekte">Projekte</a>
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
        $('#close-sideBar').on("click",function(){object.close();});
        $('.selector').on("click",function(){object.setTag($(this));});
        $('.route-item').click(function (event) {
            object.setView($(this).data('target'));
        });
        /*$('#routen_gebiete').click(function (){object.setBoulderView();});
        //$('.bouldern').on("click",function(){object.setBoulderView()});*/

        if(this.startView){
            this.setView();
        }
    }
}
module.exports = Sidebar;