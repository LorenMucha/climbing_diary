const RouteCardController = require("../controller/RouteCardController");

class RouteCard extends RouteCardController{
    constructor(){
        super();
        this.color_levels={
            "8":"bg-dark text-white",
            "7":"bg-success",
            "6":"bg-warning"
        };
    }
    createPanel(_route){
        const card = this;
        let level_color = _route.level.charAt(0),
            style_b=function(){
                return `<b class="${style.getColorClass(_route.style)}">${_route.style.toUpperCase()}</b>`;
            },
            rating = function(){
                let star_div = '';
                for(let i=0; i<=(parseFloat(_route.rating)-1);i++){
                    star_div +='<i class="fas fa-star"></i>';
                }
                return star_div;
            },
            div = `<div class="container climbing_panel" style="margin-top:2em;width:80%;">
                        <div class="card" data-id="${_route.id}" data-rating="${_route.rating}">
                            <div class="card-header ${this.color_levels[level_color]}">
                                <div class="float-left"><h6 class="card-text route_name">${_route.name}</h6></div>
                                <div class="float-right"><b class="card-text route_date">${_route.date}</b></div>
                            </div>
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col"><i class="fas fa-ruler-vertical fa-2x"></i></th>
                                        <th scope="col"><i class="fas fa-map-marked-alt fa-2x"></i></th>
                                        <th scope="col"><i class="far fa-check-circle fa-2x"></i></th>
                                        <th scope="col"><i class="fas fa-star-half-alt fa-2x"></i></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><b class="card-text route_level">${_route.level}</b></td>
                                        <td><b class="card-text route_area">${_route.area}</b></td>
                                        <td>${style_b()}</td>
                                        <td><b>${rating()}</b></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="card-footer">
                                 <b class="card-title">Sektor</b>
                                 <p class="card-text route_sektor">${_route.sektor}</p>
                                 <b class="card-title">Kommentar</b>
                                 <p class="card-text route_sektor">${_route.kommentar}</p>
                                 <hr class="w-100 divider"/>
                                 <div class="container w-100">
                                    <span class="float-right delete_route" data-id="${_route.id}"><i class="fas fa-trash fa-2x"></i></span>
                                    <span class="float-right mr-3 edit_route" data-id="${_route.id}"><i class="fas fa-pen fa-2x"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>`,
                click = 0;

        $(document)
            .on("click",".card",function(){
                console.log("click");
                if(click===0) {
                    $(this).find('.card-footer').show();
                    click +=1;
                }else{
                    $(this).find('.card-footer').hide();
                    click=0;
                }
            })
            .on("click",".delete_route",function(){
                click=0;
                card.delete($(this).data("id"));
            })
            .on("click",".edit_route",function(){
                    click=0;
                    card.edit($(this).data("id"));
                });


        return div;
    }
}
module.exports = RouteCard;