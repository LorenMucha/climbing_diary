var sqlite3 = require('sqlite3'),
    TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
var Promise = require('bluebird');

//documentation: http://www.sqlitetutorial.net/sqlite-nodejs/query/

class DatabaseManager{
    constructor(dbFilePath) {
        this.db = new TransactionDatabase(new sqlite3.Database(dbFilePath, (err) => {
          if (err) {
            console.log('Could not connect to database', err)
          } else {
            console.log('Connected to database')
          }
        }));
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
            manager.db.beginTransaction(function (err, transaction){
                $.each(sql_array,function(key,sql) {
                    console.log(sql);
                    transaction.run(sql)
                    if(runs===(sql_array.length-1)) {
                        transaction.commit(function(err){
                            if(err) transaction.rollback();
                        })
                        resolve({ id: this.lastID })
                    }else{
                        runs += 1;
                    }
                });
            });
        });
    }
}
module.exports = DatabaseManager;
