const TimeSliderController = require("../controller/TimeSliderController");
var BoostrapSlider = require("bootstrap-slider");
class TimeSlider extends TimeSliderController{
    create(){
        climbing_taskRepo.getYears()
            .then((years) => {
                let times = function(index){
                        var realArray = $.makeArray(years);
                        return $.map(realArray, function (val, i) {
                            if(index){
                                return i
                            }else{
                                return val.year;
                            }
                        });
                    },
                    values = [0, times(false).length];
                // if allready exists save the user settings and create it again
                if(this.getInitState()) {
                    this.getSlider().destroy();
                }
                //get the user values and set them
                if(this.getSliderValues()){
                    values = this.getSliderValues();
                }

                let timeslider = new BoostrapSlider(this.id, {
                    min: 0,
                    max: times(false).length - 1,
                    value: values,
                    orientation: 'vertical',
                    range: true,
                    ticks: times(true),
                    ticks_labels: times()
                });
                this.setTimes(times());
                this.setSlider(timeslider);
                this.setInitState(true);

            });
    }
}

module.exports = TimeSlider;