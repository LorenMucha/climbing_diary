const L = require('leaflet/dist/leaflet');
require("leaflet.markercluster/dist/leaflet.markercluster");

class MapViewController{
    constructor(){
        this.map = false;
        this.markers = false;
    }
    setMap(){
        const position = [51.505, -0.09];
        this.map = L.map('route-map').setView(position, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        this.setMarker();
    }
    setMarker(){
        this.markers = L.markerClusterGroup({
            chunkedLoading: true
        });
        //get the area List and add the marker
        climbing_taskRepo.getAllSectors()
            .then((data) => {
                const object = this;
                $.each(data,function(key,val){
                    if(val.lat !== null) {
                        var marker = L.marker(L.latLng(val.lat, val.lng), {title: val.name});
                        marker.bindPopup(val.name);
                        object.markers.addLayer(marker);
                    }
                });
            });
        this.map.addLayer(this.markers);
        //todo zoom to Layer Group
    }
}
module.exports = MapViewController;