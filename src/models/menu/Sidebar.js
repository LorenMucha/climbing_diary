const Colors = require("../Colors");
const ClimbingView = require("../../view/climbing/ClimbingView");
const MainView = require("../../view/MainView");

//sidebar object
class Sidebar{
    constructor(){
        this.container = "#sidenav";
        this.routen =".routen";
        this.training = ".training";
        this.bouldern = ".bouldern";
    }
    open(){
        $(this.container).css("width",250);
    }
    close(){
        $(this.container).css("width",0);
    }
    init(startView){
        const menu = this;
        var climbing_view = new ClimbingView();
        var mainview = new MainView();
                     
        $('body').append('<div id="sidenav" class="sidenav">'+
                            '<a href="javascript:void(0)" class="closebtn">&times;</a>'+
                            '<a href="#" class="training">Training</a>'+
                            '<a href="#" class="routen">Routen</a>'+
                            '<a href="#" class="bouldern">Bouldern</a>'+
                        '</div>');

        //bind the click events
        $(document).on("click",".closebtn",function(){
            menu.close();
        });

        $(document).on("click",this.routen,function(){
            climbing_view.setRoutes();
        });

        $(document).on("click",this.bouldern,function(){
            //TODO ersetzen, Main View kann weg nur für Test
            mainview.clearAllViews();
        });
        
        $(document).on("click",".sidebar_opener",function(){
            menu.open();
        });
        //set the start View
        if(startView){
            //ToDo
            if(startView==="routen"){
                this.highlightTag(this.routen);
                climbing_view.setView();
            }
        }
    }
    highlightTag(element){
        var colors = new Colors();
        $(element).css("color",colors.getActiveColor());
    }
}
module.exports = Sidebar;