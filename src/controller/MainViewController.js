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
        try {
            document.getElementById(this.left_id.replace("#", "")).innerHTML = "";
        }catch(err){}
    }
    clearRightView(){
        try {
            document.getElementById(this.right_id.replace("#", "")).innerHTML = "";
        }catch(err){}
    }
    setViewState(_state){
        this.view_state=_state;
    }
    getViewState(){
        return this.view_state;
    }
}

module.exports=MainViewController;