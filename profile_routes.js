const express = require('express');
const router = express.Router();
const app = express();
const request = require('request');
const passport = require('passport');
const mongoose = require('mongoose');
const videos = require('./database/videos');
const scripts = require('./database/Scripts');
const NotepadsLearn = require('./database/notepad-WordsExpressions').learn;
const NotepadsWant = require('./database/notepad-WordsExpressions').want;
const authCheck = (req,res,next)=>{
  if(!req.user){
    res.redirect('/');
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

router.get('/watchVideo', authCheck, function(req,res){
  //bring video script data
  var vidId = req.query.id
  var foundScript = {}
  console.log(vidId);
  scripts.find({vidId:vidId}, '-_id script', function(err, script){
    if(err){
      console.log(err);
      res.send(err)
    }else{
      console.log('this is the loadedscript', script);
      res.render('pages/watchVideo', {vidId:req.query.id, currentUser:req.user.name, script:script} );
  }

  }
)
  //bring user specific information



})



router.post('/watchVideo/note', authCheck, function(req, res){
  //get body data by word types
  var userId = req.user.id;
  var Learn = req.body.wordLearn;
  var Want = req.body.wordWant;
  var vidId = req.body.vidId;

  //safety measure to prevent single word string being broken down by letters
  function strToObj(learn, want){
    var typeLearn = typeof(learn)
    var typeWant = typeof(want)

    if(typeLearn=='string'){
      Learn = new Array(learn)
    }else if(typeLearn=='object'){
    }else{
    }
    if(typeWant=='string'){
      Want = new Array(want)
    }else if(typeWant=='object'){
    }else{
    }
  }

  strToObj(Learn, Want)

  console.log('this is wordwant: ',Want)
  console.log('this is wordlearn: ',Learn)

  // for loop to save all words to DB
  for(i=0;i<Learn.length;i++){
    var wordToLearn = new NotepadsLearn({
      user: userId,
      vidId: vidId,
      word:Learn[i],
  })
    wordToLearn.save(function(err, addedword){
      if(err){
        res.send(err)
      }
      console.log('this is the added LearnWord: ', addedword);

    })
  }

  for(i=0;i<Want.length;i++){
    var wordToWant = new NotepadsWant({
      user: userId,
      vidId: vidId,
      word:Want[i],
    })
    wordToWant.save(function(err, addedexp){
      if(err){
        res.send(err)
      }
      console.log('this is the added WantWord ', addedexp);

    })
  }

  //setting up to ren WordsApi on all learn/want words
  var learnWord = String(Learn)
  var WordsApiLearn;
  var LearnApiSyn;
  var LearnApiSim;

  var options = {
    url:'https://wordsapiv1.p.mashape.com/words/'+learnWord,
    headers: {"X-Mashape-Key": "bxoznfiBCSmshLr3CezINnY0jFGLp15gEOJjsnYZGWISg5pAN7", "X-Mashape-Host": "wordsapiv1.p.mashape.com"}
  }

  request(options, function(error, response, body){
      if(error){console.log(error)}
      else{
        console.log(body)
        WordsApiLearn = JSON.parse(body); //this is necessary because Body returns as a string not an object
        LearnApiSyn = WordsApiLearn.results[0].synonyms
        LearnApiSim = WordsApiLearn.results[0].similarTo
        console.log('this is LearnApiSyn word: ' + LearnApiSyn[0] + " type is: "+ typeof(LearnApiSyn) + "the length is: " + LearnApiSyn.length)

//WordsApiLearn.results.synonyms Array should be compared with the user's database of learned words
        NotepadsLearn.find({$and: [{user: req.user.id},
                                   {word: LearnApiSyn}]}, function(err, result){
                                     if(err){
                                       console.log('this is error from finding syn: ', err)
                                     }else{
                                       console.log('this is the result of finding match synonym: ', result)
                                       res.render('./pages/notepad', {learnWords: Learn, wantWords: Want, learnWordsApi: LearnApiSyn })
                                     }

                                   })
      }

  })



})





module.exports = router;
