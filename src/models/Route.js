const Colors = require("./Colors")

class Route{
    constructor(id,name,level,area,style,date,sektor,rating){
        this.id = id,
        this.name=name;
        this.level = level;
        this.area = area;
        this.style=style;
        this.date=date;
        this.sektor=sektor;
        this.rating=rating;
    }
    get Route(){
        return{
            id:this.id,
            name:this.name,
            level:this.level,
            area:this.area,
            style:this.style,
            date:this.date,
            sektor:this.sektor,
            rating:this.rating
        }
    }
}
module.exports = Route;