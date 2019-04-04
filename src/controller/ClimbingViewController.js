const AddButton = require("../view/AddButton");

var filter = false;
var order = "date";
class ClimbingViewController{
    constructor(){
        this.id_route_list = "#route_list";
        this.id_chart = "#chart";
        this.id_chartButton="#chartButton";
        this.data = false;
        this.filter = false;
        this.bar_chart = false;
        this.table=false;
        this.slider=false;
        this.line_chart=false;
    }
    setFilter(_filter){
        filter=_filter;
    }
    getFilter(){
        return filter;
    }
    setOrder(_order){
        order=_order;
    }
    getOrder(){
        return order;
    }
    removeFilter(){
        filter=false;
    }
    setView(){
        let add_button = new AddButton();
        main_view.clearAllViews();
        main_view.init(true,true);
        main_view.setViewState("climbing");
        this.setRouteView();
        this.setStatistikView();
        add_button.init();
    }
    refreshView(){
        this.setRouteView();
    }
    handleChartButtonClick(){
        let btn = $(this.id_chartButton),
            data = btn.data("val");
        if(data==="bar"){
            this.line_chart.create();
            btn.data("val","line");
        }else{
          this.bar_chart.create();
          btn.data("val","bar");
        }
    }
}
module.exports = ClimbingViewController;