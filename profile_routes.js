const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const videos = require('./database/videos');

const authCheck = (req,res,next)=>{
  if(!req.user){
    res.redirect('/auth/login');
    console.log('req.user is not found!');
  }else{
    console.log('the logged in user is...'+ req.user.name);
    next()
  }
}

router.get('/', authCheck, function(req,res){
  res.render('pages/profile', {currentUser: req.user.name})
})

router.get('/loadVideo',function(req, res, next){
  console.log('loadVideo is working');
  var foundVideos = [];
  videos.find({}, function(err, videos){
    // console.log('found videos in DB! : '+ videos);
    if(videos){
      console.log('these are the loaded videos: ' + videos);
      foundVideos = {...videos};
      console.log('these are the foundvideos :: ' + foundVideos);
      res.json(foundVideos);
    }else{
            console.log('no video was put into foundVideo Object');
          }

    //   videos.forEach(function(video){
    //     foundVideos = video;
    //     // foundVideos = video
    //     console.log('these are the foundvideos :: ' + foundVideos);
    //     res.json(foundVideos);
    //   })
    // }else{
    //     console.log('no video was put into foundVideo Object');
    //   }
        });
})

router.get('/watchVideo', function(req,res){
  //bring video script data
  //bring user specific information
  res.render('pages/watchVideo', {vidId:req.query.id, currentUser:req.user.name} );

})
module.exports = router;
