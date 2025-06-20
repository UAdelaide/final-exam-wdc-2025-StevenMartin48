var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

var database;

(async () => {
  try{
database = await mysql.createConnection({
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

router.get('/api/dogs', async(req, res, next) => {

  const [data] = await database.execute(
    'SELECT * from Dogs'
  );
  res.send(data);

});

router.get('/api/walkrequests/open', async(req, res, next) => {

  const [data] = await database.execute(
    'SELECT * from WalkRequests WHERE status = open'
  );
  res.send(data);

});

module.exports = router;
