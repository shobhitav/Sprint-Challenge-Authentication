const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')

const Users = require('../jokes/user-model.js');



router.post('/register', (req, res) => {
  // implement registration 
  let user = req.body;
  const hash=bcrypt.hashSync(user.password,12) 
  user.password =hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json({message:error.message});
      });
  });


router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token=genToken(user);
       
        res.status(200).json({
          message: `Welcome ${user.username} is logged in `, token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function genToken(user){
    
  const payload= {
    subject:"user",
    username:user.username
  };

  const secret="it is secret";

  const options ={expiresIn :'1h'};

  return jwt.sign(payload,secret,options);
}

module.exports = router;
