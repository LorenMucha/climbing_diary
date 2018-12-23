const Route = require("../models/Route");
const RouteList = require("../models/RouteList");
const RoutePanel = require("../view/RouteCard");
const MainView = require("../view/MainView");

class ClimbingViewController{
    constructor(){}
    setRoutes(){
        let routelist = new RouteList();
        let right_view = $("#right_view");
        taskRepo.getAllRoutes()
            .then((data) => {
                MainView.clearRightView();
                let routes = data;
                console.log(routes);
                routelist.List = routes;
                $.each(routes,function(key,value){
                    let route = new Route(value.id,value.name,value.level,value.gebiet,value.stil,value.date,value.sektor,value.rating);
                    let route_panel = new RoutePanel();
                    right_view.append(route_panel.createPanel(route.Route));
                })
            });
    }
}
module.exports = ClimbingViewController;