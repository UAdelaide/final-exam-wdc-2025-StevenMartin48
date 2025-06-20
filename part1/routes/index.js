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

await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
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
  await database.execute(`

    CREATE TABLE Dogs (
    dog_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);
`);

  await database.execute(`
CREATE TABLE WalkRequests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    dog_id INT NOT NULL,
    requested_time DATETIME NOT NULL,
    duration_minutes INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('open', 'accepted', 'completed', 'cancelled') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES Dogs(dog_id)
);
`);
  await database.execute(`
CREATE TABLE WalkApplications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    walker_id INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
    FOREIGN KEY (walker_id) REFERENCES Users(user_id),
    CONSTRAINT unique_application UNIQUE (request_id, walker_id)
);
`);
  await database.execute(`
CREATE TABLE WalkRatings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    walker_id INT NOT NULL,
    owner_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
    FOREIGN KEY (walker_id) REFERENCES Users(user_id),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id),
    CONSTRAINT unique_rating_per_walk UNIQUE (request_id)
);
`);
  await database.execute(`

INSERT INTO Users (username, email, password_hash, role) VALUES ('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('JEFF', 'JEFF@jeffdabest.org', 'hashedforalltime', 'owner'),
('johnwalker', 'whiskey@times.com', 'hashedandsalted', 'walker'),
('gabrielle', 'walker@jeffdabest.org', 'totalhashoftheheart', 'walker');
`);
  await database.execute(`

INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = 'JEFF'), 'mrBig', 'large'),
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Supermax', 'large'),
((SELECT user_id FROM Users WHERE username = 'JEFF'), 'Godzilla', 'small');

`);
  await database.execute(`INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'mrBig'), '2025-06-10 10:30:00', 60, 'The park', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'Supermax'), '2025-06-01 10:30:00', 60, 'Space', 'cancelled'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-01 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-02 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-03 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-04 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-05 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-06 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-07 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-08 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-09 12:30:00', 180, 'The Beach', 'completed'),
((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-10 02:30:00', 180, 'The Beach', 'completed');
`);

    await database.execute(`
INSERT INTO WalkApplications (request_id, walker_id, status)
VALUES (5, 5, 'accepted'),
(6, 5, 'accepted'),
(7, 5, 'accepted'),
(8, 5, 'accepted'),
(9, 2, 'accepted'),
(10, 2, 'accepted'),
(11, 2, 'accepted');

    `);

        await database.execute(`
INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating)
VALUES (5, 5, 3, 4),
(6, 5, 3, 4),
(7, 5, 3, 4),
(8, 5, 3, 5),
(9, 2, 3, 4),
(10, 2, 3, 4);
`);

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
  const [doggies] = await database.execute('SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id=Users.user_id;');

  res.status(200).send(doggies);
 } catch (err){
  console.log(err);
  res.status(500).send('Error');
 }
});

router.get('/api/walkrequests/open', async(req, res, next) => {
  try{
  const [openrequests] = await database.execute(`
    SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_username
    FROM WalkRequests
    INNER JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
    INNER JOIN Users ON Dogs.owner_id = Users.user_id
    WHERE WalkRequests.status = 'open';
    `);
  res.status(200).send(openrequests);
 } catch (err){
  console.log(err);
  res.status(500).send('Error');
 }
});

router.get('/api/walkers/summary', async(req, res, next) => {
  try{
  const [walkerSummary] = await database.execute(`
SELECT Users.username AS walker_username, COUNT(DISTINCT WalkRatings.rating_id) AS total_ratings, AVG(WalkRatings.rating) AS average_rating, COUNT(distinct WalkApplications.application_id) AS Completed_walks FROM Users LEFT JOIN WalkRatings ON Users.user_id = WalkRatings.walker_id LEFT JOIN WalkApplications ON Users.user_id = WalkApplications.walker_id WHERE Users.role = 'walker'  GROUP BY Users.user_id;
    `);
  res.status(200).send(walkerSummary);
 } catch (err){
  console.log(err);
  res.status(500).send('Error');
 }
});

module.exports = router;

  // {
  //   "walker_username": "bobwalker",
  //   "total_ratings": 2,
  //   "average_rating": 4.5,
  //   "completed_walks": 2
  // },
