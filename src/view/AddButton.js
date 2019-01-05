const MainView = require("../view/MainView");
const AddRouteView= require("./RouteView");
class AddButton extends MainView{
    constructor(){ 
        super();
        this.id = "btn_add";
    }
    init(){
        var add_route_view = new AddRouteView({type:"add"});
        let html=`<button id="${this.id}" type="button" class="btn btn-primary">
                    <i class="fas fa-plus fa-2x"></i>
                  </button>`;
        $('body').append(html);
        $(`#${this.id}`).click(function(){
            add_route_view.init();
        });
    }

}
module.exports=AddButton;