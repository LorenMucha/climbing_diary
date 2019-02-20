const swal = require("bootstrap-sweetalert/dist/sweetalert.min");
const EditRouteView= require("../view/RouteView");
const Route = require("../models/Route");

class RouteCardController{
    delete(_id){
        swal({
                title:"Bist du sicher ?",
                type:"warning",
                showCancelButton: true,
                confirmButtonClass: "btn-success",
                confirmButtonText: "Ok",
                cancelButtonClass:"btn-warning",
                cancelButtonText:"Abbrechen",
                closeOnConfirm: false
            },
            function(){
                climbing_taskRepo.deleteRoute(_id)
                    .then((data) => {
                        swal({
                            title:"Route gelöscht",
                            type:"success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-success",
                            confirmButtonText: "Ok",
                        });
                        climbing_view.setRouteView();
                    });
            });
    }
    edit(_id){
        climbing_taskRepo.getRoute(_id)
            .then((data) => {
                let edit_view = new EditRouteView({type:"update",route_id:_id}),
                    route = new Route(_id,data.name,data.level,data.gebiet,data.stil,data.date,data.sektor,data.rating, data.kommentar);
                edit_view.init();
                edit_view.setValues(route);
            });
    }

}
module.exports = RouteCardController;