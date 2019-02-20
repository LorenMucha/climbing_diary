const d3 = require("d3");
var tooltip = d3.select("body").append("div").attr("class", "toolTip");

class LineChartController{
    constructor(){
        this.id="#chart";
    }
    handleMouseOver(d){
        tooltip
            .style("left", d3.event.pageX - 80 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html(`
                <b>${d.stat}</b>
            `);
    }
    handleMouseOut(){
        tooltip.style("display", "none");
    }

}
module.exports=LineChartController;