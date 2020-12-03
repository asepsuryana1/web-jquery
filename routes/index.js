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

