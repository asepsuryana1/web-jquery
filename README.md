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
```html
<table>
    <thead>
      <tr>
        <th>ID</th>
        <th>nama</th>
        <th>umur</th>
        <th>status</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
```

* ### Get loadData
```html
  <script type='text/javascript'>
    const API_URL = ("http://localhost:3000/siswa", "http://m.localhost:3000/siswa")
    $(document).ready(function () {
      loadData();
    });
    const loadData = () => {
      $.ajax({
        method: "GET",
        url: API_URL,
        dataType: "json"
      })
        .done(function (data) {
          let html = '';
          data.forEach((item) => {
            html += `<tr>
              <td>${item.id}</td>
              <td>${item.nama}</td>
              <td>${item.umur}</td>
              <td>${item.isboolean}</td>
              <td><button>EDIT</button>  <button>DELETE</button></td>
              </tr>`
          })
          $('table tbody').html(html)
        });
    }
  </script>
```
* ### POST saveData
```js
 // -- event listener

      $("#siswa-form").submit((event)=>{
        event.preventDefault();
        saveData();
      })
    });
```
```js
 const saveData = () => {
        $.ajax({
        method: "POST",
        url: API_URL,
        dataType: "json",
        data: {nama: $('#nama').val(), umur: $("#umur").val(), isboolean: $('#isboolean').val()}
      })
        .done(function (data) {
          loadData()

        })
        .fail(function (err) {
          console.log('error', err);

        })
      }
```
* ### DELETE removeData

* ##### event click
```js
 $('table tbody').on('click', '.btn-delete', (event) => {
    removeData(event.currentTarget.attributes.dataid.value);
  })

```

* ##### add class id & dataid
```html
<button class= 'btn-delete' dataid=${item.id}>DELETE</button></td>
```
* ##### declare function
```js
  const removeData = (id) => {
        $.ajax({
        method: "DELETE",
        url: `${API_URL}/${id}`,
        dataType: "json"
      })
        .done(function (data) {
          loadData()
        })
        .fail(function (err) {
          console.log('error', err);

        })
      }
```
* ### UPDATE updateData

* ##### event click
```js
$('table tbody').on('click', '.btn-edit', (event) => {
        showData(event.currentTarget.attributes.dataid.value);
      })
```

* #### show data first

```js
const showData = (id) => {
      $.ajax({
        method: "GET",
        url: `${API_URL}/${id}`,
        dataType: "json"

      })
        .done(function (rows) {
          console.log(rows.isboolean);       
         $('#id').val(rows.id)
         $('#nama').val(rows.nama)
         $('#umur').val(rows.umur)
         $(`#isboolean option[value="${rows.isboolean}"]`).prop("selected", true);
        })
        .fail(function (err) {
          console.log('error', err);

        })
    }
```

```js
$(document).ready(function () {
      $('#edit-form').on('click', '.btn-update', (event) => {
        event.preventDefault()
        updateData(event.currentTarget.attributes.dataid.value);
      })
    });
```
```js

    const updateData = (id) => {
      $.ajax({
        method: "PUT",
        url: `${API_URL}/${id}`,
        dataType: "json",
        data: {
          id: id,
          nama: $('#nama').val(),
          umur: $('#umur').val(),
          isboolean: $('#isboolean').val(),
        },

      })
      .done(function (id) {
        loadData()
        $("#siswa-form").trigger("reset")
      })
      .fail(function (err) {
       console.log('error', err);
      })
    }
```
### switch
```js
 const id = $("#id").val()
      if(id){
        updateData(id)
      }
      else{  ajax saveData }
```
* #### on form 
```html
<input id="id" type="hidden" value="">
```






