class NavbarController{
    constructor(){
        this.search_id ="navbar_search";
        this.id_leftTab ="leftTab";
        this.id_rightTab="rightTab";
    }
    search(){
        let search = $(`#${this.search_id}`).val().toLowerCase();
        $(`.${main_view.getViewState()}_panel`).each(function(){
           let name = $(this).find('.route_name').text().toLowerCase(),
               grade = $(this).find('.route_level').text().toLowerCase(),
               area = $(this).find('.route_area').text().toLowerCase(),
               sektor =$(this).find('.route_sektor').text().toLowerCase(),
               date = $(this).find('.route_date').text();
           if(!name.includes(search)
               && grade !== search
               && !area.includes(search)
               && !sektor.includes(search)
               && !date.includes(search)){
                    $(this).hide();
           }else{
               $(this).show();
           }
        });
    }
}
module.exports=NavbarController;