const ClimbingViewController = require("../controller/ClimbingViewController");
const Route = require("../models/Route");
const RouteList = require("../models/RouteList");
const RoutePanel = require("../view/RouteCard");
const BarChart = require("../view/BarChart");
const LineChart = require("../view/LineChart");
const Table = require("../view/Table");
const TimeSlider = require("../view/TimeSlider");

class ClimbingView extends ClimbingViewController{
    constructor(){
        super();
    }
    setRouteView(){
        climbing_taskRepo.getAllRoutes(this.getOrder(),this.getFilter())
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

                $(`${main_view.right_id}`).html(`<div id="${this.id_route_list.replace("#","")}" class="container float-right">${html}</div>`);

                this.bar_chart=new BarChart();
                this.bar_chart.create();

                this.line_chart=new LineChart();

                //create the stat table
                this.table=new Table();
                this.table.create();

                this.slider=new TimeSlider();
                this.slider.create();


            });
    }
    setStatistikView(){
        const menu = this;
        $(`${main_view.left_id}`).html(
            `
            <div class="stat-controller container w-10">
                <button type="button" class="btn btn-primary" id="${this.id_chartButton.replace("#","")}" data-val="bar">Verlauf</button>
                <div id="slider_content">
                    <div id="timeslider-label">Jahre</div>
                    <input id="timeslider" type="text"/>
                </div>
            </div>
            <div class="container float-right climbing_stat w-90">
                <div class="w-100" id="chart"></div>
                <div class="w-100" id="table"></div>
            </div>
            `
        );
        //bind click event chart Switcher
        $(this.id_chartButton)
            .unbind()
            .click(function(){menu.handleChartButtonClick();});
    }
}

module.exports=ClimbingView;