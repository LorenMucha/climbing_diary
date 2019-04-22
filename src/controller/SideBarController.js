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
            this.setClimbingView();
        }
    }
    setClimbingView(){
        climbing_view.setView();
    }
    //Todo
    setBoulderView(){
        main_view.clearAllViews();
    }
    //todo
    setTrainingView(){
        main_view.clearAllViews();
    }
    setTag(elem){
        $('.selector').removeClass('active');
        $('.sublist').hide();
        elem.addClass('active');
        $(`#${elem.data("el")}`).show();
    }
}
module.exports = SideBarController;