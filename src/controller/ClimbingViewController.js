const AddButton = require("../view/AddButton");
const d3 = require("d3");
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
class ClimbingViewController{
    constructor(){
        this.id_route_list = "#route_list";
        this.id_chart = "#chart";
        this.data = false;
    }
    setView(){
        let add_button = new AddButton();
        main_view.clearAllViews();
        main_view.init(true,true);
        main_view.setViewState("climbing");
        this.setRoutes();
        add_button.init();
    }
    handleMouseOver(d){
        tooltip
            .style("left", d3.event.pageX - 80 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html(`
                <b>${d.data.level}</b>
                <hr class="w-100"/>
                <b class="${style.getColorClass('os')}">OS: ${d.data.os}</b>
                <br/>
                <b class="${style.getColorClass('rp')}">RP: ${d.data.rp}</b>
                <br/>
                <b class="${style.getColorClass('flash')}">Flash: ${d.data.flash}</b>
            `);
    }
    handleMouseOut(){
        tooltip.style("display", "none");
    }
}
module.exports = ClimbingViewController;