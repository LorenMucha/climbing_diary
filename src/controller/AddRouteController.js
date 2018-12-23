class AddRouteController{
    constructor(){
        this.id_modal="modal_addRoute";
        this.id_name ="route_name";
        this.id_style="style";
        this.id_level ="level";
        this.id_date="date";
        this.id_area="area";
        this.id_sektor ="sector";
        this.id_rating = "rating";
        this.id_comment = "comment";
    }
    show(){
        $(`#${this.id_modal}`).modal('show');
    }
    close(){
        $(`#${this.id_modal}`).remove();
        $('.modal-backdrop ').remove();
    }
    save(){
        const model = this;
        let name = $(`#${this.id_name}`).val(),
            style =$(`#${this.id_style}`).val(),
            date = function() {
                let string = $(`#${model.id_date}`).val().split("/");
                return `${string[2]}-${string[0]}-${string[1]}`;
            },
            gebiet =function(){
                let sel = $(`#${model.id_area}`);
                return {"name":sel.val(),"id":sel.data("id")};
            },
            sektor =function(){
                let sel = $(`#${model.id_sektor}`);
                return {"name":sel.val(),"id":sel.data("id")};
            },
            comment =$(`#${this.id_comment}`).val(),
            rating = $(`#${this.id_rating}`).val(),
            level = $(`#${this.id_level}`).val();

        let in_object = {
            date: date(),
            name: name,
            area_id: gebiet().id,
            level: level,
            style: style,
            rating: rating,
            comment: comment,
            sector_id: sektor().id
        };

      taskRepo.insertRoute(in_object)
            .then((data) => {
                this.close();
                climbing_view.setRoutes();
                //TODO insert 1. new
            });
    }
}
module.exports = AddRouteController;