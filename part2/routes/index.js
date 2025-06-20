const express = require('express');
const router = express.Router();
const db = require('../models/db');




router.post('/login', async (req, res) => {
 console.log(req.body);
 const providedCredentials = req.body; // provided username and password



 const [databaseUserData] = await db.query('SELECT * FROM Users WHERE Username = ?', [providedCredentials.username]);

 if(databaseUserData.length !== 1) { return res.status(401).send('Username not found'); }
 // checks if the above query is empty. Is only empty if user doesn't exist.

 if(providedCredentials.password === databaseUserData[0].password_hash){
  // [0] because the only response should be the user

  req.session.user = { // session data
  user_id: databaseUserData[0].user_id,
  user_name: databaseUserData[0].user_name,
  role: databaseUserData[0].role
  };
 return res.status(200).send('login successful');
 }

 return res.status(401).send('login failed');

});


module.exports = router;

