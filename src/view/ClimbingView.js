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
        climbing_taskRepo.getAllRoutes()
            .then((data) => {
                let routes = data;
                let routelist = new RouteList(),
                    routeview = $(`${menu.id_route_list}`),
                    html = "";

                routelist.List = routes;
                routeview.remove();

                $.each(routes,function(key,value){
                    let route = new Route(value.id,value.name,value.level,value.gebiet,value.stil,value.date,value.sektor,value.rating, value.kommentar);
                    let route_panel = new RoutePanel();
                    console.log(route_panel.createPanel(route.Route));
                    html += route_panel.createPanel(route.Route);
                });

                $(`${main_view.right_id}`).html(`<div id="${this.id_route_list.replace("#","")}">${html}</div>`);

            });
    }
}

module.exports=ClimbingView;