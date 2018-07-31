const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}


// SIGNUP
authRoutes.post('/signup', (req, res, next) => {

  const {username, password} = req.body;

  // Check for non empty user or password
  if (!username || !password){
    next(new Error('You must provide valid credentials'));
  }

  // Check if user exists in DB
  User.findOne({ username })
  .then( foundUser => {
    if (foundUser) throw new Error('Username already exists');

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    return new User({
      username,
      password: hashPass
    }).save();
  })
  .then( savedUser => login(req, savedUser)) // Login the user using passport
  .then( user => res.json({status: 'signup & login successfully', user})) // Answer JSON
  .catch(e => next(e));
});

  authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
      
      // Check for errors
      if (err) next(new Error('Something went wrong')); 
      if (!theUser) next(failureDetails)
  
      // Return user and logged in
      login(req, theUser).then(user => res.status(200).json(req.user));
  
    })(req, res, next);
  });
  
  
  authRoutes.get('/currentuser', (req,res,next) => {
    if(req.user){
      res.status(200).json(req.user);
    }else{
      next(new Error('Not logged in'))
    }
  })
  
  
  authRoutes.get('/logout', (req,res) => {
    req.logout();
    res.status(200).json({message:'logged out'})
  });
  
  
  authRoutes.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
  })

  


    


module.exports = authRoutes;
