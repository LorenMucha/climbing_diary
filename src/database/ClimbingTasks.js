/*
all the database tasks for climbing
 */
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
        let query = `SELECT r.id, r.${this.key_routes.name},g.${this.key_area.name} as gebiet,r.${this.key_routes.level},r.${this.key_routes.style},r.${this.key_routes.rating},
                      r.${this.key_routes.comment}, strftime('%d.%m.%Y',r.${this.key_routes.date}) as date, k.${this.key_sector.name} as sektor 
                      FROM ${this.table_routes} r, ${this.table_area} g, ${this.table_sector} k 
                      where g.id=r.${this.key_routes.area} and k.id=r.${this.key_routes.sector} group by r.id 
                      Order By ${order_value} DESC`;
        return this.manager.all(query)
    }
    getRoute(_id){
        let query = `SELECT r.id, r.${this.key_routes.name},g.${this.key_area.name} as gebiet,r.${this.key_routes.level},r.${this.key_routes.style},r.${this.key_routes.rating},
                      r.${this.key_routes.comment}, strftime('%d.%m.%Y',r.${this.key_routes.date}) as date, k.${this.key_sector.name} as sektor 
                      FROM ${this.table_routes} r, ${this.table_area} g, ${this.table_sector} k 
                      where g.id=r.${this.key_routes.area} and k.id=r.${this.key_routes.sector} AND r.id=${_id}`;
        return this.manager.get(query);
    }
    getAllAreas(){
        return this.manager.all(`SELECT * FROM ${this.table_area} GROUP BY id`);
    }
    getAllSectorsByAreaName(_name){
      return this.manager.all(`SELECT s.${this.key_sector.name},s.${this.key_sector.coord} as koordinaten_sektor,a.${this.key_area.coord} as koordinaten_area,s.${this.key_sector.gebiet_id},s.id 
                               FROM ${this.table_sector} s, ${this.table_area} a 
                               where a.${this.key_area.name} Like '${_name}%' and s.${this.key_sector.gebiet_id}=a.id GROUP BY s.id`);
    }
    getYears(){
        return this.manager.get(`select DISTINCT(strftime('%Y',${this.key_routes.date})) as year from ${this.table_routes} order by date DESC`);
    }
    //for the chart
    countStyles(){
        //todo get year condition
        let query = `select ${this.key_routes.level},
                        sum(${this.key_routes.style}='RP') as rp,
                        sum(${this.key_routes.style}='OS') as os,
                        sum(${this.key_routes.style}='FLASH') as flash
                        from routen group by ${this.key_routes.level}`;
        return this.manager.all(query);
    }
    insertRoute(_route){
        let query = [`
                    INSERT OR IGNORE INTO ${this.table_area} (${this.key_area.name}) 
                    VALUES ('${_route.area.name}')`,`
                    INSERT OR IGNORE INTO ${this.table_sector} (${this.key_sector.name},${this.key_sector.gebiet_id}) 
                    SELECT '${_route.sector.name}',id 
                    FROM ${this.table_area} 
                    WHERE ${this.key_area.name}='${_route.area.name}'`,`
                    INSERT OR IGNORE INTO ${this.table_routes} 
                    (${this.key_routes.date},${this.key_routes.name},${this.key_routes.level},${this.key_routes.style},${this.key_routes.rating},${this.key_routes.comment},${this.key_routes.area},${this.key_routes.sector}) 
                    SELECT '${_route.date}','${_route.name}','${_route.level}','${_route.style}',${_route.rating},'${_route.comment}',a.id,s.id 
                    FROM ${this.table_area} a, ${this.table_sector} s 
                    WHERE a.${this.key_area.name} = '${_route.area.name}' 
                    AND s.${this.key_sector.name}='${_route.sector.name}'
                  `];
        return this.manager.transact(query);
    }
    deleteRoute(_id){
        return this.manager.run(`DELETE FROM ${this.table_routes} WHERE id=${_id}`);
    }
    
  }
module.exports = ClimbingTaskRepository;