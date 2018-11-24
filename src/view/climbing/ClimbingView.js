const DatabaseManager = require("../../models/database/Manager");
const TaskRepository = require("../../models/database/Tasks");
const MainView = require("../MainView");
const Route = require("../../models/Route");
const RoutePanel = require("./RoutePanel");

class ClimbingView extends MainView{
    constructor(){ 
        super(true, true);     
    }
    setView(){
        this.clearAllViews();
        this.init(true,true);
        this.setRoutes();
    }
    setRoutes(){
        const db_manager = new DatabaseManager('./data/touren.db');
        const taskRepo = new TaskRepository(db_manager);
        let right_view = $("#right_view");

        taskRepo.getAllRoutes()
        .then((data) => {
            this.clearRightView();
            $.each(data,function(key,value){
                let route = new Route(value.name,value.level,value.gebiet,value.stil,value.date);
                let route_panel = new RoutePanel();
                right_view.append(route_panel.createPanel(route.Route));
            })
        });
    }
}

module.exports=ClimbingView;