# web-jquery

## installing expres view ejs

```bash
$ express web-jquery --view=ejs
```
```bahs
$ cd web-jquery
$ npm install
```

## installing nodemon

```bash
$ npm install nodemon -D
```

### package.json add dev 

```json
{
  "name": "web-jquery",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.6"
  }
}
```
* Try to run in localhost:3000
```bash
$ npm run dev
```

## Create Database postgreSQL

### change user 
```bash
$ sudo su <user.postgre>
```
### masuk pake ```psql```
```bash
postgres@docs-desktop:/home/docs$ psql
```
```bash
psql (13.1 (Ubuntu 13.1-1.pgdg20.04+1), server 12.5 (Ubuntu 12.5-1.pgdg20.04+1))
Type "help" for help.

postgres=# 
```

### nampilin database ```\l```

```bash
postgres=# \l   \q ---> for exit

                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 cobaDB    | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 condb     | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 jwtdb     | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 ormdb     | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
(7 rows)
```

### create database ```CREATE DATABASE database_name```
```bash
postgres=# create database siswadb;
```
#### create table siswa 

* pgAdmin
* id serial primary key
* nama character variying
* umur integer
* isboolean boolean

## connecting to database
* [install libarary pg](https://www.npmjs.com/package/pg)

```bash 
$ npm install pg -S
```
* [Documentations](https://node-postgres.com/)
```js
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
```
* app.js
```js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'siswadb',
  password: 'kucing',
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
```
#### try run ```$ npm run dev```

#### shoulbe :
```bash
[nodemon] restarting due to changes...
[nodemon] starting `node ./bin/www`
undefined Result {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows: [ { now: 2020-12-03T07:15:39.301Z } ],
  fields:
   [ Field {
       name: 'now',
       tableID: 0,
       columnID: 0,
       dataTypeID: 1184,
       dataTypeSize: 8,
       dataTypeModifier: -1,
       format: 'text' } ],
  _parsers: [ [Function: parseDate] ],
  _types:
   TypeOverrides {
     _types:
      { getTypeParser: [Function: getTypeParser],
        setTypeParser: [Function: setTypeParser],
        arrayParser: [Object],
        builtins: [Object] },
     text: {},
     binary: {} },
  RowCtor: null,
  rowAsArray: false }
```

#### make router pool
##### app.js
```js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Pool} = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'siswadb',
  password: 'kucing',
  port: 5432,
})

var indexRouter = require('./routes/index')(pool);
```
##### router index.js
```js
var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = (pool)=>{
  router.get('/', function(req, res, next) {
    pool.query('SELECT NOW()', (err, res) => {
      console.log(err, res)
      pool.end()
    })
  });
  
   return router;
}
```








