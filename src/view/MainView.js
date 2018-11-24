class MainView{
    constructor(left=false,right=false){
        this.left=left;
        this.right=right;
    }
    init(){
        if(this.left){
            $('body').append('<div class="float-left" id="left_view"></div>');        
        }
        if(this.right){
            $('body').append('<div class="float-right" id="right_view"></div>');
        }
    }
    clearAllViews(){
        $("#right_view").empty();
        $("#left_view").empty();
    }
    clearLeftView(){
        $("#left_view").empty();
    }
    clearRightView(){
        $("#right_view").empty();
    }
}

module.exports=MainView;