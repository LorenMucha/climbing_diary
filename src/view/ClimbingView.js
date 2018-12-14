const DatabaseManager = require("../database/Manager");
const TaskRepository = require("../database/Tasks");
const MainView = require("../view/MainView");
const Route = require("../models/Route");
const RouteList = require("../models/RouteList");
const RoutePanel = require("../view/RouteCard");
const AddButton = require("../view/AddButton");
const db_manager = new DatabaseManager('./data/touren.db');
const taskRepo = new TaskRepository(db_manager);
class ClimbingView extends MainView{
    constructor(){ 
        super(true, true);     
    }
    setView(){
        let add_button = new AddButton();
        this.clearAllViews();
        this.init(true,true);
        this.setRoutes();
        add_button.init();
    }
    setRoutes(){
        let routelist = new RouteList();
        let right_view = $("#"+this.right_id);

        taskRepo.getAllRoutes()
        .then((data) => {
            this.clearRightView();
            let routes = data;
            routelist.List = routes;
            $.each(routes,function(key,value){
                let route = new Route(value.id,value.name,value.level,value.gebiet,value.stil,value.date,value.sektor,value.rating);
                let route_panel = new RoutePanel();
                right_view.append(route_panel.createPanel(route.Route));
            })
        });
    }
}

module.exports=ClimbingView;