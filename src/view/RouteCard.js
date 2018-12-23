class RouteCard{
    constructor(){
        this.color_levels={
            "8":"bg-dark text-white",
            "7":"bg-success",
            "6":"bg-warning"
        };
    }
    createPanel(_route){
        let level_color = _route.level.charAt(0),
            rating = function(){
                let star_div = '';
                for(let i=0; i<=(parseFloat(_route.rating)-1);i++){
                    star_div +='<i class="fas fa-star"></i>';
                }
                return star_div;
            };
        return `<div class="container route_panel" style="margin-top:2em;width:80%;">
                        <div class="card" data-id="${_route.id}" data-rating="${_route.rating}">
                            <div class="card-header ${this.color_levels[level_color]}">
                                <div class="float-left"><h6>${_route.name}</h6></div>
                                <div class="float-right"><b style="color:${colors.getActiveColor()}">${_route.date}</b></div>
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
                                        <td><b>${_route.level}</b></td>
                                        <td><b>${_route.area}</b></td>
                                        <td><b>${_route.style.toUpperCase()}</b></td>
                                        <td><b>${rating()}</b></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>`;
    }
}
module.exports = RouteCard;