class Colors{
    static getMainColor(){
        return "#4285F4";
    }
    static getActiveColor(){
        return "#007E33";
    }
    static getWarningColor(){
        return "#FF8800";
    }
    static getDangerColor(){
        return "#CC0000";
    }
    //must be a string1
    static getGradeColor(_grade){
        if(_grade.indexOf("8") !==-1){
            return "#212121";
        }else if(_grade.indexOf("7")!==-1){
            return "#bf360c"
        }else{
            return "#FF8800";
        }
    }
    static getStyleColor(_style){
        switch(_style){
            case "os":
                return "#33b5e5";
            case "rp":
                return "#0d47a1";
            default:
                return "#00C851";
        }
    }

}
module.exports=Colors;