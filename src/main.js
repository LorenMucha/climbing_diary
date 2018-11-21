const Sidebar = require('../src/models/menu/sidebar');
const Navbar = require("../src/models/menu/navbar")

function main(){
    var sidebar = new Sidebar();
    var navbar = new Navbar();
    let startView = "routen";
    navbar.init();
    sidebar.init(startView);
}