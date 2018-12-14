class MainView{
    constructor(left=false,right=false){
        this.left=left;
        this.right=right;
        this.left_id = "left_view";
        this.right_id ="right_view";
        this.root_id="root"; 
    }
    init(){
        if(this.left){
            $("#"+this.root_id).append('<div class="float-left" id="'+this.left_id+'"></div>');        
        }
        if(this.right){
            $("#"+this.root_id).append('<div class="float-right" id="'+this.right_id+'"></div>');
        }
    }
    clearAllViews(){
        $("#"+this.right_id).empty();
        $("#"+this.left_id).empty();
    }
    clearLeftView(){
        $("#"+this.left_id).empty();
    }
    clearRightView(){
        $("#"+this.right_id).empty();
    }
}

module.exports=MainView;