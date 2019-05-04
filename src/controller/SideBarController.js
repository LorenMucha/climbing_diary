const MapView = require("../view/MapView");

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
    setView(_view){
        switch(_view) {
            case "routen":
                climbing_view.setView();
                break;
            case "routen-map":
                const map = new MapView();
                map.createView();
                break;
            default:
                climbing_view.setView();
                break;
        }
    }
    setTag(elem){
        $('.selector').removeClass('active');
        $('.sublist').hide();
        elem.addClass('active');
        $(`#${elem.data("el")}`).show();
    }
}
module.exports = SideBarController;