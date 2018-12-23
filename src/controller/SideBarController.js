class SideBarController{
    constructor() {
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
    setStartView(startView){
        if(startView==="routen"){
            this.highlightTag(this.routen);
            this.setClimbingView();
        }
    }
    setClimbingView(){
        climbing_view.setView();
    }
    highlightTag(element){
        $(element).css("color",colors.getActiveColor());
    }
}
module.exports = SideBarController;