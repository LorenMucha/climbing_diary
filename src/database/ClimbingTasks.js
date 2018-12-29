class ClimbingTaskRepository {
    constructor(manager) {
        this.manager = manager;
        this.table_routes = "routen";
        this.table_area = "gebiete";
        this.table_sector = "sektoren";
        this.key_routes = {
            date: "date",
            name: "name",
            area: "gebiet",
            level: "level",
            style: "stil",
            rating: "rating",
            comment: "kommentar",
            sector: "sektor"
        };
        this.key_area = {
            name: "name",
            coord: "koordinaten"
        };
        this.key_sector = {
            name:"name",
            coord:"koordinaten",
            gebiet_id:"gebiet"
        };
    }
    getAllRoutes(_order) {
        let order_value =  'datetime(r.date)';
        if(_order){
          order_value = 'r.'+_order;
        }
        let query = `SELECT r.id, r.name,g.name as gebiet,level,r.stil,r.rating,r.kommentar, strftime('%d.%m.%Y',r.date) as date, k.name as sektor 
                      FROM routen r, gebiete g, sektoren k 
                      where g.id=r.gebiet and g.id=k.gebiet group by r.id 
                      Order By ${order_value} DESC`;
        return this.manager.all(query)
    }
    getAllAreas(){
        return this.manager.all(`SELECT * FROM gebiete GROUP BY id`);
    }
    getAllSectorsByAreaName(_name){
      return this.manager.all(`SELECT s.name,s.koordinaten as koordinaten_sektor,a.koordinaten as koordinaten_area,s.gebiet,s.id 
                               FROM sektoren s, gebiete a 
                               where a.name Like '${_name}%' and s.gebiet=a.id GROUP BY s.id`);
    }
    getAreaById(area_id){
        return this.manager.get(`SELECT * FROM gebiete where id= ?`,[area_id])
    }
    getSektorById(sektor_id){
    return this.manager.get(`SELECT * FROM sektoren where id= ?`,[sektor_id])
    }
    insertArea(area_name){
        return this.manager.run(`INSERT OR IGNORE INTO ${this.table_area} (${this.key_area.name}) 
                    VALUES ('${area_name}');`)
    }
    insertSector(area_name,sector_name){
        return this.manager.run(`INSERT OR IGNORE INTO ${this.table_area} (${this.key_area.name}) 
                    VALUES ('${area_name}');`);
    }
    insertRoute(in_object){
        let query = [`
                    INSERT OR IGNORE INTO ${this.table_area} (${this.key_area.name}) 
                    VALUES ('${in_object.area.name}')`,`
                    INSERT OR IGNORE INTO ${this.table_sector} (${this.key_sector.name},${this.key_sector.gebiet_id}) 
                    SELECT '${in_object.sector.name}',id 
                    FROM ${this.table_area} 
                    WHERE ${this.key_area.name}='${in_object.area.name}'`,`
                    INSERT OR IGNORE INTO ${this.table_routes} 
                    (${this.key_routes.date},${this.key_routes.name},${this.key_routes.level},${this.key_routes.style},${this.key_routes.rating},${this.key_routes.comment},${this.key_routes.area},${this.key_routes.sector}) 
                    SELECT '${in_object.date}','${in_object.name}','${in_object.level}','${in_object.style}',${in_object.rating},'${in_object.comment}',a.id,s.id 
                    FROM ${this.table_area} a, ${this.table_sector} s 
                    WHERE a.${this.key_area.name} = '${in_object.area.name}' 
                    AND s.${this.key_sector.name}='${in_object.sector.name}'
                  `];
        return this.manager.transact(query);
    }
    
  }
module.exports = ClimbingTaskRepository;