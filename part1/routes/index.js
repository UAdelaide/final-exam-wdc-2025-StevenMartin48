var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

var database;

(async () => {
  try{
const connection = await mysql.createConnection({
host: 'localhost',
user: 'root'
});

await connection.query('CREATE DATABSE IF NOT EXISTS DogWalkService');
await connection.end();

database = await mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'DogWalkService'
});

await database.execute(`
    CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('owner', 'walker') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `);
// if at this point users is empty, then throw in all the rest of the data, otherwise skip

const [users] = await database.execute('SELECT COUNT(*) AS count FROM Users');
if (users[0].count === 0){
  
}
















console.log('Mysql Connection established');
  } catch (err) {console.log('connection failed \n', err); } // only reason for this to fail is database not existing
})();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', async(req, res, next) => {

  try{
  const [data] = await database.execute(
    'SELECT * from Dogs'
  );
  res.send(data);
 } catch (err){
  console.log(err);
  res.send
 }
});

router.get('/api/walkrequests/open', async(req, res, next) => {

  const [data] = await database.execute('SELECT * from WalkRequests WHERE status = ?',['open']);

  res.send(data);

});

module.exports = router;
