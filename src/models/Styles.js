class Styles{
    constructor() {
        this.styles = ["OS", "RP","Flash"]
    }
    getColorClass(_style){
        let setting = _style.toLowerCase();
        if(setting==="os"){
            return "text-dark";
        }
        else if(setting==="rp"){
            return "text-danger"
        }
        else{
            return "text-warning";
        }
    }
}
module.exports=Styles;