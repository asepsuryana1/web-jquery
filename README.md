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
   "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www"
  },
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
### create database ```CREATE DATABASE database_name```
```bash
postgres=# create database siswadb;
```
#### create table siswa 

* pgAdmin

| Name       | Data type          | Not NULL |Primary key  |
|------------|--------------------|----------|-------------|
| id         | serial             | yes      |yes          |
| nama       | character varying  |          |             |
| umur       | integer            |          |             |
| isboolean  | boolean            |          |             | 

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
## CRUD
* ### GET
```js
router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM siswa', (err, data) => {
    if (err) return res.send(err) 
    res.json(data.rows)
    })
  });
```
* ### [POST](https://node-postgres.com/features/queries)
```js
const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
const values = ['brianc', 'brian.m.carlson@gmail.com']
// callback
client.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  }
})


router.post('/', function (req, res, next) {
    const text = 'INSERT INTO siswa(nama, umur, isboolean) VALUES($1, $2, $3) '
    const values = [req.body.nama, parseInt(req.body.umur), JSON.parse(req.body.isboolean)]
    // callback
    pool.query(text, values, (err, data) => {
      if (err) {
        return res.status(500).send(err)
      } else {
        res.status(200).json(data)
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
      }
    })
  })
```
* ### DELETE
```js
router.delete('/:id', function (req, res) {
    pool.query('DELETE FROM siswa WHERE id = $1',[parseInt(req.params.id)], (err, data) => {
      if (err) return res.send(err)
      res.json(data)
    })
  });
```
* ### UPDATE
```text
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;
```
```js
router.put('/:id', function (req, res) {
    pool.query('UPDATE siswa SET nama = $1, umur = $2, isboolean = $3 WHERE id = $4',[req.body.nama, parseInt(req.body.umur), JSON.parse(req.body.isboolean), parseInt(req.params.id)], (err, data) => {
      if (err) return res.send(err)
      res.json(data.rows)
    })
  });
```
# VIEWS  use JQUERY
* ## [jquery-3.5.1.min.js](https://code.jquery.com/jquery-3.5.1.min.js)
* ### place into ./public/javascript 
```html
<script type= 'text/javascript' src= '/javascript/jquery-3.5.1.min.js'></script>
```
```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <script type= 'text/javascript' src= '/javascript/jquery-3.5.1.min.js'></script>
  </head>
  <body>
    <h1></h1>
    <p>Welcome to </p>
  </body>
</html>
```











