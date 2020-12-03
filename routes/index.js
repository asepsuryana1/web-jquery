var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = (pool) => {
  router.get('/', function (req, res) {
    pool.query('SELECT * FROM siswa', (err, data) => {
      if (err) return res.send(err)
      res.json(data.rows)
    })
  });

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

  return router;
}

