class MainViewController{
    constructor(left=false,right=false){
        this.left=left;
        this.right=right;
        this.left_id = "left_view";
        this.right_id ="right_view";
        this.root_id="root";
    }
    static clearAllViews(){
        $("#right_view").empty();
        $("#left_view").empty();
    }
    static clearLeftView(){
        $("#left_view").empty();
    }
    static clearRightView(){
        $("#right_view").empty();
    }
}

module.exports=MainViewController;