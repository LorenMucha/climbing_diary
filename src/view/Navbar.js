class Navbar{
    constructor(){
        this.init();
    }
    init(){
        var sidebar = new Sidebar();
        let html = `<nav class="navbar navbar-dark bg-dark justify-content-between navbar-fixed-top">
                        <a class="navbar-brand sidebar_opener"><h2>&#9776;</h2></a>
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Suche" aria-label="Suche">
                        </form>
                    </nav>`;
        $('body').append(html);
        $('.sidebar_opener').on("click",function(){sidebar.open()});
    }
}
module.exports= Navbar;