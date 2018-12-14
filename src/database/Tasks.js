class TaskRepository {  
    constructor(manager) {
        this.manager = manager
      }
      getAllRoutes(_order) {
        let order_value =  'datetime(r.date)';
        if(_order){
          order_value = 'r.'+_order;
        }
        return this.manager.all(`SELECT r.id, r.name,g.name as gebiet,level,s.key as stil,r.rating,r.kommentar, strftime('%d.%m.%Y',r.date) as date, k.name as sektor FROM routen r,
        gebiete g, stile s, sektoren k where r.stil=s.id and g.id=r.gebiet and g.id=k.gebiet group by r.id Order By ? DESC`,[order_value])
      }
      getAreaById(area_id){
        return this.manager.get(`SELECT * FROM gebiete where id= ?`,[area_id])
      }
      getSektorById(sektor_id){
        return this.manager.get(`SELECT * FROM sektoren where id= ?`,[sektor_id])
      }
      insertRoute(){

      }
    
  }
module.exports = TaskRepository;