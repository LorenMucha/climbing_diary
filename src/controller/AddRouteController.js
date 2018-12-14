class AddRouteController{
    constructor(){
        this.id_modal="modal_addRoute";
        this.id_name ="route_name";
        this.id_style="levels";
        this.id_date="date";
        this.id_area="area";
        this.id_sektor ="sector";
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
            date =$(`#${this.id_date}`).val(),
            gebiet =function(){
                    let gebiet_name = $(`#${model.id_area}`).val();
                    return gebiet_name;
            },
            sektor =function(){
                    let sektor_name = $(`#${model.id_sektor}`).val();
                    return sektor_name;
            };
        console.log(name,style,date,gebiet(),sektor());
    }
}
module.exports = AddRouteController;