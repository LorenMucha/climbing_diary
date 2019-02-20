const d3 = require("d3");
var tooltip = d3.select("body").append("div").attr("class", "toolTip");

class BarChartController{
    constructor(){
        this.id="#chart";
    }
    handleMouseOver(d){
        tooltip
            .style("left", d3.event.pageX - 80 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html(`
                <b style="color:${Colors.getGradeColor(d.data.level)}">${d.data.level}</b>
                <hr class="w-100"/>
                <b style="color:${Colors.getStyleColor('os')}">OS: ${d.data.os}</b>
                <br/>
                <b style="color:${Colors.getStyleColor('rp')}">RP: ${d.data.rp}</b>
                <br/>
                <b style="color:${Colors.getStyleColor('flash')}">Flash: ${d.data.flash}</b>
            `);
    }
    handleMouseOut(){
        tooltip.style("display", "none");
    }
}
module.exports = BarChartController;