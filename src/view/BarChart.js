const BarChartController = require("../controller/BarChartController");
const d3 = require("d3");


class BarChart extends BarChartController{
    create(){
        let container = $(`${this.id}`),
            width_chart=container.width(),
            height_chart=$(window).height()/3,
            styles=Styles.getStyles();
        //create the DOM Element
        container.html(`<svg width="${width_chart}" height="${height_chart}"></svg>`);

        climbing_taskRepo.getBarChartData(climbing_view.getFilter())
            .then((data)=>{
                var series = d3.stack()
                    .keys(["flash","rp","os"])
                    .offset(d3.stackOffsetDiverging)
                    (data);

                var svg = d3.select("svg"),
                    margin = {top: 10, right: 30, bottom: 50, left: 30},
                    width = +width_chart,
                    height = +height_chart;

                var x = d3.scaleBand()
                    .domain(data.map(function(d) { return d.level; }))
                    .rangeRound([margin.left, width - margin.right])
                    .padding(0.1);

                var y = d3.scaleLinear()
                    .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
                    .rangeRound([height - margin.bottom, margin.top]);

                var colors = d3.scaleOrdinal()
                    .domain(styles)
                    .range([Colors.getStyleColor(styles[0]), Colors.getStyleColor(styles[1]), Colors.getStyleColor(styles[2])]);

                svg.append("g")
                    .attr("class","bar")
                    .selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .attr("fill", function(d) { return colors(d.key); })
                    .selectAll("rect")
                    .data(function(d) { return d; })
                    .enter()
                    .append("rect")
                    .attr("data-level",function(d){return d.data.level;})
                    .attr("data-os",function(d){return d.data.os;})
                    .attr("data-rp",function(d){return d.data.rp;})
                    .attr("data-flash",function(d){return d.data.flash;})
                    .attr("width", x.bandwidth)
                    .text(function(d) { return d; })
                    .attr("x", function(d) { return x(d.data.level); })
                    .attr("y", function(d) { return y(d[1]); })
                    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                    .on("mousemove", this.handleMouseOver)
                    .on("click", this.handleMouseOver)
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
module.exports = BarChart;