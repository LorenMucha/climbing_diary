const MainView = require("../view/MainView");
const AddRouteView= require("./RouteView");
class AddButton extends MainView{
    constructor(){ 
        super();
        this.id = "btn_add";
    }
    init(){
        var add_route_view = new AddRouteView({type:"add"});
        let html=`<button id="${this.id}" type="button" class="btn btn-primary" title="Neue Route hinzufügen">
                    <i class="fas fa-plus fa-2x"></i>
                  </button>`,
            button = $(`#${this.id}`);
        if(button.length==0) {
            $('body').append(html);
        }
        $(document).on("click",`#${this.id}`,function(){
            add_route_view.init();
        });
    }
    remove(){
        $(`#${this.id}`).remove();
    }

}
module.exports=AddButton;