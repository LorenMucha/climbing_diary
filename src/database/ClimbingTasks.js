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
    getAllRoutes(_order,_filter) {
        let order_value =  `r.${this.key_routes.level}`,
            filter = '';
        if(_order){
          order_value = 'r.'+_order;
        }
        if(_filter){
            filter = 'and '+_filter;
        }
        let query = `SELECT r.id, r.${this.key_routes.name},g.${this.key_area.name} as gebiet,r.${this.key_routes.level},r.${this.key_routes.style},r.${this.key_routes.rating},
                      r.${this.key_routes.comment}, strftime('%d.%m.%Y',r.${this.key_routes.date}) as date, k.${this.key_sector.name} as sektor 
                      FROM ${this.table_routes} r, ${this.table_area} g, ${this.table_sector} k 
                      where g.id=r.${this.key_routes.area} and k.id=r.${this.key_routes.sector} 
                      ${filter}
                      group by r.id 
                      Order By ${order_value} DESC`;
        return this.manager.all(query);
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
        let html =`SELECT s.${this.key_sector.name},s.${this.key_sector.gebiet_id},s.id 
                               FROM ${this.table_sector} s, ${this.table_area} a 
                               where a.${this.key_area.name} Like '${_name}%' and s.${this.key_sector.gebiet_id}=a.id GROUP BY s.id`;
        return this.manager.all(html);
    }
    getAllSectorsByAreaId(_id){
      let html =`SELECT * FROM ${this.table_sector} where a.${this.key_sector} =${_id}%  GROUP BY s.id`;
      return this.manager.all(html);
    }
    getAllSectors(){
        return this.manager.all(`SELECT * FROM ${this.table_sector} GROUP BY id`);
    }
    getYears(){
        return this.manager.all(`select DISTINCT(strftime('%Y',${this.key_routes.date})) as year from ${this.table_routes} order by date DESC`);
    }
    //for the chart
    getBarChartData(_filter){
        let filter = function(){
                if(_filter){
                    return 'where '+_filter;
                }else{
                    return '';
                }
        },
        query = `select r.${this.key_routes.level},
                        sum(r.${this.key_routes.style}='RP') as rp,
                        sum(r.${this.key_routes.style}='OS') as os,
                        sum(r.${this.key_routes.style}='FLASH') as flash
                        from ${this.table_routes} r
                        ${filter()}
                        group by r.${this.key_routes.level}`;
        return this.manager.all(query);
    }
    getLineChartData(_filter){
        let filter = function(){
                if(_filter){
                    return 'where '+_filter;
                }else{
                    return '';
                }
            },
        query=`SELECT SUM(cast(r.${this.key_routes.level} as int)*(25*(INSTR('abc',substr(replace(r.${this.key_routes.level},'+',''),-1)))
                +INSTR('+',substr(r.${this.key_routes.level},-1))
                +INSTR('rpflashos',r.${this.key_routes.style}))) as stat, 
                COUNT(cast(r.${this.key_routes.level} as int)) as anzahl, 
                strftime('%Y',r.${this.key_routes.date}) as date 
                FROM ${this.table_routes} r
                 ${filter()}
                GROUP BY strftime('%Y',r.${this.key_routes.date})`;
        return this.manager.all(query);
    }
    getTableData(_filter){
        let filter = function(_replacement){
                if(_filter){
                    return (_replacement ? " AND "+_filter.replace("r.",_replacement+"."):" where "+_filter);
                }else{
                    return '';
                }
            },
            query=`SELECT r.${this.key_routes.level},
                   (Select count(*) as OS from ${this.table_routes} o where r.${this.key_routes.level}=o.${this.key_routes.level} and o.${this.key_routes.style}='OS' ${filter("o")}) as OS,
                   (Select count(*) as RP from ${this.table_routes} p where r.${this.key_routes.level}=p.${this.key_routes.level} and p.${this.key_routes.style}='RP' ${filter("p")}) as RP,
                   (Select count(*) as FLASH from ${this.table_routes} f where r.${this.key_routes.level}=f.${this.key_routes.level} and f.${this.key_routes.style}='FLASH' ${filter("f")}) as FLASH,count(*) as Gesamt 
                   from ${this.table_routes} r
                   ${filter()}
                   group by r.${this.key_routes.level} order by r.${this.key_routes.level} DESC`;
        return this.manager.all(query);
    }
    insertRoute(_route){
        let query = [`
                    INSERT OR IGNORE INTO ${this.table_area} (${this.key_area.name}) 
                    VALUES ('${_route.area.name}')`
                    ,`
                    INSERT OR IGNORE INTO ${this.table_sector} (${this.key_sector.name},${this.key_sector.gebiet_id}) 
                    SELECT '${_route.sector.name}',id 
                    FROM ${this.table_area} 
                    WHERE ${this.key_area.name}='${_route.area.name}'`
                    ,`
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