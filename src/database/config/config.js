const path = require('path')
//require('dotenv').config({path:path.resolve(__dirname,'../../../.env')}) forma mas optima
require('dotenv').config({path:'C:/Users/mauro/sistemaDePaneles_DH/.env'})

module.exports={
  /*"development": {
    "username": "root",
    "password": "root",
    "database": "mydb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },*/
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "port":process.env.DB_PORT
  },

  /*"test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },*/
  
  /*"production": {
    "username": "241517",
    "password": "kike5829",
    "database": "franespinola_internerd",
    "host": "mysql-franespinola.alwaysdata.net",
    "dialect": "mysql",
    "port": "3306"
  }*/
}