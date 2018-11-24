class RouteList{
    constructor(_list){
        this.list = _list;
    }
    get List(){
        return this.list;
    }
    set List(_list){
        this.list = _list;
    }
}
module.exports = RouteList;