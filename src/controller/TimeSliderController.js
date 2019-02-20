var instance = null;
var slider_init = false;
var slider = false;
var min_set =0;
var max_set =false;

class TimeSliderController{
    constructor(){
        this.id = "#timeslider";
        this.times=false;
    }
    setInitState(_state){
        slider_init=_state;
    }
    getInitState(){
        return slider_init;
    }
    setTimes(_times){
        this.times = _times;
    }
    setSlider(_slider){
        const slider_control = this;
        slider = _slider;
        slider.on("slideStop",function(){
            slider_control.onChange();
        });
    }
    getSlider(){
        return slider;
    }
    getSliderValues(){
        if(max_set || min_set) {
            return [min_set, max_set];
        }else if(max_set===min_set){
            return [0,0];
        }else{
            return false;
        }
    }
    onChange(){
        let values = slider.getValue(),
            min_slider =  Math.min(...values),
            max_slider = Math.max(...values),
            max_year = this.times[max_slider],
            min_year = this.times[min_slider],
            filter = function(){
                if(max_year !== min_year){
                    return `CAST(strftime('%Y',r.date) as int)<=${min_year} and CAST(strftime('%Y',r.date) as int) >=${max_year}`;
                }else{
                    return `CAST(strftime('%Y',r.date) as int)==${max_year}`;
                }
            };
        min_set=min_slider;
        max_set=max_slider;
        climbing_view.setFilter(filter());
        climbing_view.setRouteView();

    }
}
module.exports=TimeSliderController;