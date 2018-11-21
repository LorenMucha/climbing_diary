const DatabaseManager = require("../models/database/manager");
const TaskRepository = require("../models/database/tasks");
const RoutePanel = require("../models/route");
const MainView = require("../view/mainView");

class ClimbingView extends MainView{
    constructor(){ 
        super(true, true);     
    }
    setView(){
        this.clear();
        this.init(true,true);
        this.setRoutes();
    }
    setRoutes(){
        const db_manager = new DatabaseManager('./data/touren.db');
        const taskRepo = new TaskRepository(db_manager);
        let right_view = $("#right_view");

        taskRepo.getAllRoutes()
        .then((data) => {
            right_view.empty();
            $.each(data,function(key,value){
                let route_panel = new RoutePanel(value.name,value.level,value.gebiet,value.stil,value.date);
                right_view.append(route_panel.createPanel());
            })
        });
    }
}

module.exports=ClimbingView;