class MainViewController{
    constructor(left=false,right=false){
        this.left=left;
        this.right=right;
        this.left_id = "#left_view";
        this.right_id ="#right_view";
        this.root_id="#root";
        this.view_state="";
    }
    clearAllViews(){
       this.clearLeftView();
       this.clearRightView();
    }
    clearLeftView(){
        $(`${this.left_id}`).empty();
    }
    clearRightView(){
        $(`${this.right_id}`).empty();
    }
    setViewState(_state){
        this.view_state=_state;
    }
    getViewState(){
        return this.view_state;
    }
}

module.exports=MainViewController;