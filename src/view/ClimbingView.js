const ClimbingViewController = require("../controller/ClimbingViewController");
const Route = require("../models/Route");
const RouteList = require("../models/RouteList");
const RoutePanel = require("../view/RouteCard");

class ClimbingView extends ClimbingViewController{
    constructor(){
        super();
    }
    setRoutes(){
        const menu = this;
        let routelist = new RouteList();
        $(`${main_view.right_id}`).append(`<div id="${this.id_route_list.replace("#","")}"></div>`);
        climbing_taskRepo.getAllRoutes()
            .then((data) => {
                let routes = data,
                    routeview = $(`${menu.id_route_list}`);
                routelist.List = routes;
                routeview.empty();
                $.each(routes,function(key,value){
                    let route = new Route(value.id,value.name,value.level,value.gebiet,value.stil,value.date,value.sektor,value.rating);
                    let route_panel = new RoutePanel();
                    routeview.append(route_panel.createPanel(route.Route));
                })
            });
    }
}

module.exports=ClimbingView;