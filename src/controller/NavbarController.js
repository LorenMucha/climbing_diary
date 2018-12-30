class NavbarController{
    constructor(){
        this.search_id ="navbar_search";
    }
    search(_string){
        let search = _string.toLowerCase();
        $(`.${main_view.getViewState()}_panel`).each(function(){
           let name = $(this).find('.route_name').text().toLowerCase();
           if(!name.includes(search)){
               $(this).hide();
           }else{
               $(this).show();
           }
        });
    }
}
module.exports=NavbarController;