class TaskRepository {  
    constructor(manager) {
        this.manager = manager
      }
      getAllRoutes() {
        return this.manager.all(`SELECT r.name,g.name as gebiet,level,s.key as stil,r.rating,r.kommentar, r.date FROM routen r, gebiete g, stile s where r.stil=s.id and g.id=r.gebiet Order By date`)
      }
      getAreaById(area_id){
        return this.manager.get(`SELECT * FROM gebiete where id= ?`,[area_id])
      }
    
  }
module.exports = TaskRepository;