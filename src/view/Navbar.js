const NavbarController = require("../controller/NavbarController");
class Navbar extends NavbarController{
    constructor(){
        super();
        this.init();
    }
    init(){
        const menu = this;
        var sidebar = new Sidebar();
        let html = `<nav class="navbar navbar-dark bg-dark justify-content-between navbar-fixed-top">
                        <a class="navbar-brand sidebar_opener"><h2>&#9776;</h2></a>
                        <form class="form-inline">
                            <input id="${this.search_id}" class="form-control mr-sm-2" type="search" placeholder="Suche" aria-label="Suche">
                        </form>
                    </nav>`;
        $('body').append(html);
        //bind the click events
        $('.sidebar_opener').on("click",function(){sidebar.open()});
        //bind the search event
        $(`#${this.search_id}`).keyup(function(){menu.search($(this).val());});
    }
}
module.exports= Navbar;