const Colors = require("./Colors")

class Route{
    constructor(name,level,area,style,date){
        this.name=name;
        this.level = level;
        this.area = area;
        this.style=style;
        this.date=date;
    }
    get Route(){
        return{
            name:this.name,
            level:this.level,
            area:this.area,
            style:this.style,
            date:this.date
        }
    }
}
module.exports = Route;