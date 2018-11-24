const Sidebar = require('../src/models/menu/Sidebar');
const Navbar = require("../src/models/menu/Navbar");

function main(){
    var sidebar = new Sidebar();
    var navbar = new Navbar();
    let startView = "routen";
    navbar.init();
    sidebar.init(startView);
}