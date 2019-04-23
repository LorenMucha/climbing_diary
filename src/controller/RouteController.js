class RouteController{
    constructor(){
        this.id_modal="#modal_addRoute";
        this.id_name ="#route_name";
        this.id_style="#style";
        this.id_level ="#level";
        this.id_date="#date";
        this.id_area="#area";
        this.id_sektor ="#sector";
        this.id_rating = "#rating";
        this.id_comment = "#comment";
    }
    show(){
        $(`${this.id_modal}`).modal('show');
    }
    remove(){
        $(`${this.id_modal}`).remove();
        $('.modal-backdrop ').remove();
    }
    save(){
        const model = this;
        let name = $(`${this.id_name}`).val().replace("'","`"),
            style =$(`${this.id_style}`).val().toUpperCase(),
            date = function() {
                let string = $(`${model.id_date}`).val().split(".");
                return `${string[2]}-${string[1]}-${string[0]}`;
            },
            gebiet =function(){
                let sel = $(`${model.id_area}`);
                return {"name":sel.val().replace("'",'"'),"id":sel.data("id")};
            },
            sektor =function(){
                let sel = $(`${model.id_sektor}`);
                return {"name":sel.val().replace("'",'"'),"id":sel.data("id")};
            },
            comment =$(`${this.id_comment}`).val().replace("'",'"'),
            rating = $(`${this.id_rating}`).val(),
            level = $(`${this.id_level}`).val();

        let in_object = {
            date: date(),
            name: name,
            area: gebiet(),
            level: level,
            style: style,
            rating: rating,
            comment: comment,
            sector: sektor()
        };

        climbing_taskRepo.insertRoute(in_object)
            .then(() => {
                this.remove();
                climbing_view.setFilter(false);
                climbing_view.setRouteView();
        });
    }
    setValues(_route){
        $(`${this.id_name}`).val(_route.name);
        $(`${this.id_area}`).val(_route.area);
        $(`${this.id_sektor}`).val(_route.sektor);
        $(`${this.id_comment}`).val(_route.kommentar);
        $(`${this.id_rating}`).val(_route.rating);
        $(`${this.id_date}`).val(_route.date);
        $(`${this.id_style}`).val(_route.style.toLowerCase());
        $(`${this.id_level}`).val(_route.level);
    }
    update(_id){
        climbing_taskRepo.deleteRoute(_id)
            .then(()=>{
            this.save();
        });
    }
}
module.exports = RouteController;