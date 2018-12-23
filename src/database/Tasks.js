class TaskRepository {  
    constructor(manager) {
        this.manager = manager;
        this.table_routes = "routen";
        this.key_routes = {
            date:"date",
            name:"name",
            area:"gebiet",
            level:"level",
            style:"stil",
            rating:"rating",
            comment:"kommentar",
            sector:"sektor"
        }
      }
      getAllRoutes(_order) {
        let order_value =  'datetime(r.date)';
        if(_order){
          order_value = 'r.'+_order;
        }
        let query = `SELECT r.id, r.name,g.name as gebiet,level,r.stil,r.rating,r.kommentar, strftime('%d.%m.%Y',r.date) as date, k.name as sektor FROM routen r,
        gebiete g, sektoren k where g.id=r.gebiet and g.id=k.gebiet group by r.id Order By ${order_value} DESC`;
        console.log(query);
        return this.manager.all(query)
      }
      getAllAreas(){
        return this.manager.all(`SELECT * FROM gebiete GROUP BY id`);
      }
      getAllSectors(){
          return this.manager.all(`SELECT * FROM sektoren GROUP BY id`);
      }
      getAreaById(area_id){
        return this.manager.get(`SELECT * FROM gebiete where id= ?`,[area_id])
      }
      getSektorById(sektor_id){
        return this.manager.get(`SELECT * FROM sektoren where id= ?`,[sektor_id])
      }
      insertRoute(object){
         return this.manager.run(`Insert into ${this.table_routes} 
          (${this.key_routes.date},${this.key_routes.name},${this.key_routes.area},${this.key_routes.level},${this.key_routes.style},${this.key_routes.rating},
          ${this.key_routes.comment},${this.key_routes.sector}) values('${object.date}','${object.name}','${object.area_id}','${object.level}','${object.style}',${object.rating},
          '${object.comment}',${object.sector_id})`);
      }
    
  }
module.exports = TaskRepository;