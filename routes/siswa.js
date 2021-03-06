var express = require('express');
var router = express.Router();


module.exports = (pool) => {
    router.get('/', function (req, res) {
        pool.query('SELECT * FROM siswa', (err, data) => {
            if (err) return res.send(err)
            res.json(data.rows)
        })
    });

    router.get('/:id', function (req, res) {
        pool.query('SELECT * FROM siswa where id = $1', [req.params.id], (err, data) => {
            if (err) return res.send(err)
            if (data.rows.length == 0) return res.json({err: true, message: "data tidak ditemukan "})
            res.json(data.rows[0])
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

    router.delete('/:id', function (req, res) {
        pool.query('DELETE FROM siswa WHERE id = $1', [parseInt(req.params.id)], (err, data) => {
            if (err) return res.send(err)
            res.json(data)
        })
    });

    router.put('/:id', function (req, res) {
        pool.query('UPDATE siswa SET nama = $1, umur = $2, isboolean = $3 WHERE id = $4', [req.body.nama, parseInt(req.body.umur), JSON.parse(req.body.isboolean), parseInt(req.params.id)], (err, data) => {
            if (err) return res.send(err)
            res.json(data.rows)
        })
    });



    return router;
}