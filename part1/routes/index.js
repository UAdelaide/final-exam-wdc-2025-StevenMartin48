var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

(async () => {
  try{
const database = await mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'DogWalkService'
});

console.log('Mysql Connection established');
  } catch (err) {console.log('connection failed \n', err); } // only reason for this to fail is database not existing
})();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', function(req, res, next) {

  const [data] = await database.

});

module.exports = router;
