const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/login', async (req, res) => {
 const providedCredentials = req.body; // provided username and password

 const [databaseUserData] = await db.query('SELECT * FROM Users WHERE Username = ?', [providedCredentials.username]);

 if(databaseUserData.length !== 1) { return res.status(401).send('Username not found'); }
 // checks if the above query only returns 1 user. Is only empty if user doesn't exist.
 // should never return more than 1 user without sql injection I guess

 if(providedCredentials.password === databaseUserData[0].password_hash){
  // [0] because the only response should be the user
  // this should be checking a hash, the lack of security is sad

  req.session.user = { // session data
  user_id: databaseUserData[0].user_id,
  user_name: databaseUserData[0].username,
  role: databaseUserData[0].role
  };
     return res.status(200).send(req.session.user.role);
}
 return res.status(401).send('login failed');
});


router.get('/sessioncheck', async (req, res) => {
if (req.session.user) {
   return res.status(200).send(`${req.session.user.user_name}`);
}
return res.status(401).send(`not logged in`);
});

router.get('/logout', (req, res) => {

   req.session.destroy();
   return res.status(200).clearCookie('connect.sid').send('success');
});






















module.exports = router;

