const RouteController = require("../controller/RouteController");
const Levels = require("../models/Levels");
const Autocomplete = require("../controller/AutoComplete");

class RouteView extends RouteController{
    constructor(_setting){
        super();
        this.id_save_btn ="#save_route";
        this.id_close_btn="#closeAddRouteView";
        this.text={
            add:{
                title:"Neue Route",
                save:"Speichern"
            },
            update:{
                title:"Update",
                save:"Update"
            }
        };
        this.setting=_setting;

    }
    init(){
        //refresh DOM
        this.remove();
        const model = this;
        let levels = function(){
            let level = new Levels(),
                list = `<select class="custom-select my-1 mr-sm-2" id="${model.id_level.replace("#","")}">`;
            $.each(level.getRouteFrench(),function(key,value){
                let selected = '';
                if(value==='8a'){selected='selected';}
                list +=`<option value="${value}" ${selected}>${value}</option>`;
            });
            return `${list}</select>`;
        },
        rating=function(){
            let list = `<select class="custom-select my-1 mr-sm-2 rating" id="${model.id_rating.replace("#","")}" class="form-control">`,
                stars=function(x){
                    let star_div = '';
                    for(let i=0; i<=x;i++){
                        star_div +='&#xf005;';
                    }
                    return star_div;
                };
            for(let i=1;i<=5;i++){
                list +=`<option value="${i}">${stars(i-1)}</option>`;
            }
            console.log(`${list}</select>`);
            return `${list}</select>`;
        },
        styles=function(){
            let list = `<select class="custom-select my-1 mr-sm-2" id="${model.id_style.replace("#","")}">`;
            $.each(Styles.getStyles(),function(key,value){
                list +=`<option value="${value.toLowerCase()}">${value.toUpperCase()}</option>`;
            });
            return `${list}</select>`;
        },
        form =`
            <div class="modal" tabindex="-1" role="dialog" id="${this.id_modal.replace("#","")}">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">${this.text[this.setting.type].title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                        <div class="form-group">
                                <label for="route_name">Routenname</label>
                                <input type="email" class="form-control" id="${this.id_name.replace("#","")}"/>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Stil</label>
                                ${styles()}
                            </div>
                            <div class="form-group col-md-6">
                                  <label>Datum</label>
                                  <div class="input-group date">
                                    <input type="text" class="form-control datepicker" id="${this.id_date.replace("#","")}"/>
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                  </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6 autocomplete">
                                <label for="inputAddress">Gebiet</label>
                                <input type="text" class="form-control" autocomplete="off" spellcheck="false" id="${this.id_area.replace("#","")}"/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputAddress2">Sektor</label>
                                <input type="text" class="form-control" id="${this.id_sektor.replace("#","")}"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="inputCity">Schwierigkeit</label>
                               ${levels()}
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputState">Rating</label>
                              ${rating()}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Kommentar</label>
                            <textarea class="form-control" id="${this.id_comment.replace("#","")}" rows="3"></textarea>
                          </div>
                        </form>
                    </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="${this.id_save_btn.replace("#","")}">${this.text[this.setting.type].save}</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="${this.id_close_btn.replace("#","")}">Schließen</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        //date picker
        $('body').append(form);
        $('.datepicker').datepicker({
            language: 'de',
            format: 'dd.mm.yyyy'
        });
        //bind the click events
        $(`${this.id_save_btn}`).click(function(){
            let id =model.setting.route_id;
            if(id){
                model.update(id);
            }else{
                model.save();
            }
        });
        $(`${this.id_close_btn}`).click(function(){model.remove();});
        //open the add Dialog via bootstrap modal
        this.show();

        //autocomplete area`s
        climbing_taskRepo.getAllAreas()
            .then((data) => {
                let source = function(){
                  let data_set = [];
                  $.each(data,function(key,value){
                      data_set.push({"id":value.id,"name":value.name});
                  });
                  return data_set;
                };
                 // Initializing the autocomplete
                Autocomplete.autocomplete(document.getElementById(this.id_area.replace("#","")),source());
        });
        //sector autocomplete only fpr area which is set
        $(`${this.id_area}`).keyup(function(){
           let name = $(this).val();
            climbing_taskRepo.getAllSectorsByAreaName(name)
                .then((data) => {
                    let source = function(){
                        let data_set = [];
                        $.each(data,function(key,value){
                            data_set.push({"id":value.id,"name":value.name});
                        });
                        return data_set;
                    };
                    // Initializing the autocomplete
                    Autocomplete.autocomplete(document.getElementById(model.id_sektor.replace("#","")),source());
                });
        });

    }
}
module.exports=RouteView;