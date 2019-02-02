const ClimbingViewController = require("../controller/ClimbingViewController");
const Route = require("../models/Route");
const RouteList = require("../models/RouteList");
const RoutePanel = require("../view/RouteCard");
const BarChart = require("../view/BarChart");
const Table = require("../view/Table");

class ClimbingView extends ClimbingViewController{
    constructor(){
        super();
    }
    setRoutes(){
        const menu = this;
        climbing_taskRepo.getAllRoutes()
            .then((data) => {
                this.data = data;
                let routes = data;
                let routelist = new RouteList(),
                    html = "";

                routelist.List = routes;
                main_view.clearRightView();

                $.each(routes,function(key,value){
                    let route = new Route(value.id,value.name,value.level,value.gebiet,value.stil,value.date,value.sektor,value.rating, value.kommentar);
                    let route_panel = new RoutePanel();
                    html += route_panel.createPanel(route.Route);
                });

                $(`${main_view.right_id}`).html(`<div id="${this.id_route_list.replace("#","")}">${html}</div>`);

                //create the bar chart which contains the year overview
                let barchart = new BarChart();
                barchart.create();

                //create the stat table
                let table = new Table();
                table.create(data);

            });
    }
    create(){
        $(`${main_view.left_id}`).html(
            `
            <div class="stat-controller w-15">
                <button type="button" class="btn btn-primary">Verlauf</button>
            </div>
            <div class="container float-right climbing_stat w-85">
                <div class="100" id="chart"></div>
                <div class="w-100" id="table"></div>
            </div>
            `
        );
    }
}

module.exports=ClimbingView;