var sqlite3 = require('sqlite3');
var Promise = require('bluebird');

//documentation: http://www.sqlitetutorial.net/sqlite-nodejs/query/
//https://stackabuse.com/a-sqlite-tutorial-with-node-js/

class DatabaseManager{
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
          if (err) {
            console.log('Could not connect to database', err)
          } else {
            console.log('Connected to database')
          }
        })
      }
    get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
    }
    all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
    }
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql);
                    console.log(err);
                    reject(err)
                } else {
                    resolve({ id: this.lastID })
                }
            })
        })
    }
    transact(sql_array,params=[]){
        const manager = this;
        let runs = 0;
        return new Promise((resolve, reject) => {
           $.each(sql_array,function(key,sql){
               manager.db.run(sql, params, function (err) {
                   if (err) {
                       console.log('Error running sql ' + sql);
                       console.log(err);
                       reject(err);
                   }else{
                       if(runs==(sql_array.length-1)) {
                           resolve({ id: this.lastID })
                       }else{
                           runs += 1;
                       }
                   }
               })
           });
        })
    }
}
module.exports = DatabaseManager;
