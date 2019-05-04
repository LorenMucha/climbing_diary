const MapViewController = require('../controller/MapViewController');

class MapView extends MapViewController{
    constructor(){
        super();
    }
    createView(){
        main_view.clearAllViews();
        let html = '<div id="route-map"></div>';
        $(`${main_view.left_id}`).append(html);
        //in the leaflet map
        this.setMap();
    }
}
module.exports = MapView;