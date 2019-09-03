/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const bcrypt = require('bcryptjs'); 
 const jwt=require('jsonwebtoken')

 const Users = require('../jokes/user-model.js'); 

module.exports = (req, res, next) => {
     const token = req.headers.authorization;
     if (token) {  
              jwt.verify(token, "it is secret",(err,decodedToken) =>{
                if(err){
                  //bad token
                  res.status(401).json({message:'whats wrong?'})
                } else {   //decodedToken!
                  req.decodedJwt=decodedToken;
                  next();
                    }
                })
        }
        else {
      
          res.status(401).json({ message: 'You Shall not pass !' });
        }
  }


