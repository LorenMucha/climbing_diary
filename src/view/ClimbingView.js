const ClimbingViewController = require("../controller/ClimbingViewController");
const Route = require("../models/Route");
const RouteList = require("../models/RouteList");
const RoutePanel = require("../view/RouteCard");
const d3 = require("d3");

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
                this.setBarChart();

            });
    }
    setBarChart() {
        let chart = $(`${this.id_chart}`);
        //create the DOM Element
        chart.remove();
        $(`${main_view.left_id}`).html(`<svg width="960" height="500" id="${this.id_chart.replace("#", "")}"></svg>`);

        climbing_taskRepo.countStyles()
            .then((data)=>{
                //Quelle:https://bl.ocks.org/mbostock/b5935342c6d21928111928401e2c8608
                var series = d3.stack()
                    .keys(["flash","rp","os"])
                    .offset(d3.stackOffsetDiverging)
                    (data);

                var svg = d3.select("#chart"),
                    margin = {top: 20, right: 30, bottom: 30, left: 60},
                    width = +svg.attr("width"),
                    height = +svg.attr("height");

                var x = d3.scaleBand()
                    .domain(data.map(function(d) { return d.level; }))
                    .rangeRound([margin.left, width - margin.right])
                    .padding(0.1);

                var y = d3.scaleLinear()
                    .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
                    .rangeRound([height - margin.bottom, margin.top]);

                var colors = d3.scaleOrdinal()
                    .domain(["os", "flash", "rp"])
                    .range(["black", Colors.getWarningColor(), Colors.getDangerColor()]);

                svg.append("g")
                    .selectAll("g")
                    .data(series)
                    .enter().append("g")
                    .attr("fill", function(d) { return colors(d.key); })
                    .selectAll("rect")
                    .data(function(d) { return d; })
                    .enter().append("rect")
                    .attr("data-level",function(d){return d.data.level;})
                    .attr("data-os",function(d){return d.data.os;})
                    .attr("data-rp",function(d){return d.data.rp;})
                    .attr("data-flash",function(d){return d.data.flash;})
                    .attr("width", x.bandwidth)
                    .attr("x", function(d) { return x(d.data.level); })
                    .attr("y", function(d) { return y(d[1]); })
                    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                    .on("mousemove", this.handleMouseOver)
                    .on("mouseout", this.handleMouseOut);


                svg.append("g")
                    .attr("transform", "translate(0," + y(0) + ")")
                    .call(d3.axisBottom(x));

                svg.append("g")
                    .attr("transform", "translate(" + margin.left + ",0)")
                    .call(d3.axisLeft(y));

                function stackMin(serie) {
                    return d3.min(serie, function(d) { return d[0]; });
                }

                function stackMax(serie) {
                    return d3.max(serie, function(d) { return d[1]; });
                }
            });
    }
}

module.exports=ClimbingView;