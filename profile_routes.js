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

  // var foundVideos = [];
  // videos.find({}, function(err, videos){
  //   // console.log('found videos in DB! : '+ videos);
  //   if(videos){
  //     videos.forEach(function(video){
  //       foundVideos = video;
  //       // foundVideos = video
  //       console.log('these are the foundvideos :: ' + foundVideos);
  //
  //       res.render('pages/profile', {videos: foundVideos, CurrentUser: req.user.name})
  //       return foundVideos;
  //     })
  //   }else{
  //     console.log('no video was put into foundVideo Object');
  //   }
  //     });

  res.render('pages/profile', {CurrentUser: req.user.name})
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
module.exports = router;
