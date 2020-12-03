var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = (pool)=>{
  router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM siswa', (err, data) => {
    if (err) return res.send(err) 
    res.json(data.rows)
    })
  });
  
   return router;
}

