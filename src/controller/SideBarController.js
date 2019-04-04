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
        this.highlightTag(this.routen);
        climbing_view.setView();
    }
    //Todo
    setBoulderView(){
        this.highlightTag(this.bouldern);
        main_view.clearAllViews();
    }
    //todo
    setTrainingView(){
        this.highlightTag(this.training);
        main_view.clearAllViews();
    }
    highlightTag(element){
        $('.item-list-navbar').find('a').removeClass('active');
        $(element).addClass('active');
    }
}
module.exports = SideBarController;