var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

(async () => {
const database = await mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'DogWalkService'
});
)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
