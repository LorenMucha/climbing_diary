const Colors = require("../models/colors")

class Route{
    constructor(name,level,area,style,date){
        this.name=name;
        this.level = level;
        this.area = area;
        this.style=style;
        this.date=date;
    }
}
module.exports = Route;
class RoutePanel extends Route{
    constructor(name,level,area,style,date){
        super(name,level,area,style,date);
        this.color_levels={
            "8":"bg-dark text-white",
            "7":"bg-success",
            "6":"bg-warning"
        };
    }
    createPanel(){
        var colors = new Colors();
        let level_color = this.level.charAt(0),
            panel = '<div class="container float-right;" style="margin-top:2em;width:80%;">'+
                        '<div class="card">'+
                            '<div class="card-header '+this.color_levels[level_color]+'">'+
                                '<div class="float-left"><h6>'+this.name+'</h6></div>'+
                                '<div class="float-right"><b style="color:'+colors.getActiveColor()+'">'+this.date+'</b></div>'+
                            '</div>'+
                            '<div class="card-body">'+
                                '<div class="container">'+
                                    '<i class="fas fa-ruler-vertical fa-2x"></i>'+
                                    '<i class="fas fa-map-marked-alt fa-2x"></i>'+
                                    '<i class="far fa-check-circle fa-2x float-right"></i>'+
                                '</div>'+
                                '<hr/>'+
                                '<div class="container">'+
                                    '<div class="float-left"><b>'+this.level+'</b></div>'+
                                    '<div class="float-left"><b>'+this.area+'</b></div>'+
                                    '<div class="float-right"><b>'+this.style.toUpperCase()+'</b></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        return panel;
    }
}
module.exports = RoutePanel;