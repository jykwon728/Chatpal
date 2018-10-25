const express = require('express');
const app = express();
const app_routes = require('../app_routes.js');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./User.js');
const googleUser = require('./GoogleUser');
const keys = require('../keys.js');
const mongodb = require('mongodb');
const mongoose = require('mongoose');


//passport related stuff

passport.serializeUser(function(user, done){
  done(null, user.id)
})
passport.deserializeUser(function(id, done){
  User.findById(id).then((user)=>{
    done(null, user)
  })
});

  passport.use('local-login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqtoCallback: true
},

  function(email, password, done){
    // var email = req.body.email || req.query.email;
    // console.log('passport local login was called', 'paramEmail: ', email, 'name & password', name, password);

    // var database = app.get('database');

    User.findOne({'email': email}, function(err, user){
      if(err){return done(err)}
      if(!user){
        console.log('the user does not exist');
        return done(null, false, {message: 'User does not exist'})
      }
      if (!user.authenticate(password)) {
        console.log('incorrect password was input');
        return done(null, false, { message: 'Incorrect password.'},
        );
      }
      console.log('this is the logged in user', user);
      return done(null, user);
    })
}
));

passport.use(
  new GoogleStrategy(
    {
    //option for the google Strategy. need client id and client secret
    callbackURL:'/process/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
    },
    function(accessToken, refreshToken, profile, done){
//check if user already exists
googleUser.findOne({googleId: profile.id}).then((currentUser)=>{
  if(currentUser){
    //already have user
    console.log('checked that the user :'+profile.displayName+ ' already exists');
   done(null, currentUser)
  }else {
    const newGoogleUser =  new googleUser({
        name:profile.displayName,
        googleId: profile.id
      })
    newGoogleUser.save().then(function(newUser){
      console.log('new user created: '+newUser);
      done(null, newUser)
    })
  }
})


      // console.log(profile);
    }
  )
);
