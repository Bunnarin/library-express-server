const express = require('express');	
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const key = "secret";
let userList = new Array();

router.get('/', (req, res) => {
  const options = {
    root: path.join(__dirname,'..', 'public')
  };
  res.sendFile('user.html', options);
});

router.post('/register', (req, res) => {
  const {username, password} = req.body;
  userList.push({username: username, password: password});
  res.send('User registered, now you can log in');
});

router.post('/login', (req,res) => {
  const {username, password} = req.body;
  try{
    if (isUserAuthenticated(username, password)){
      const userIndex = userList.findIndex(user => user.username === username && user.password === password);
      const payload = { userID: userIndex};
      let accessToken = jwt.sign(payload, key, { expiresIn: 60 * 60 });
      req.session.authorization = accessToken;
      res.redirect('/book');
    } 
    else {
      return res.sendStatus(401);
    }
  }
  catch (error) {
    res.send("Error: " + error);
  }
});

router.get('/logout', (req,res)=>{
  req.session.destroy(); // Destroy the current session
  res.redirect('/user'); // Redirect to the login page
});

module.exports = router;

function isUserAuthenticated(username, password){
  console.log(userList);
  for (let i=0; i < userList.length; i++){
    if (userList[i].username == username && userList[i].password == password){
      return true;
    }
  }
  return false;
}