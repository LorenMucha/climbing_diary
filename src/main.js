const DatabaseManager = require("../src/database/Manager");
const TaskRepository = require("../src/database/Tasks");
const MainView = require("../src/view/MainView");
const ClimbingView = require("../src/view/ClimbingView");
const Sidebar = require('../src/view/Sidebar');
const Navbar = require("../src/view/Navbar");
const Colors = require("../src/models/Colors");
/*initialize the classes*/
const db_manager = new DatabaseManager('./data/touren.db');
const taskRepo = new TaskRepository(db_manager);
const climbing_view = new ClimbingView();
var colors = new Colors();
function main(){
    var sidebar = new Sidebar("routen");
    var navbar = new Navbar();
}