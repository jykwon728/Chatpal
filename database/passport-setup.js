const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./User.js');



//passport related stuff

  passport.serializeUser(function(user, done){
    done(null, user)
  })
  passport.deserializeUser(function(user, done){
    done(null, user)
  })

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



      // var authenticated = user.authenticate(password, user._doc.salt, user._doc.hased_password);
      // if(!authenticated){
      //   console.log('password does not match');
      // }
    })
}
))

module.exports = passport;
