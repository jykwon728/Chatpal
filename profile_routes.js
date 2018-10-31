const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const videos = require('./database/videos');
const scripts = require('./database/Scripts');
const NotepadsWord = require('./database/notepad-WordsExpressions').words;
const NotepadsExp = require('./database/notepad-WordsExpressions').expressions;
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
  var userId = req.user.id
  var words = req.body.wordLearn
  var wordComment = req.body.wordCommentLearn
  var exp = req.body.expressionLearn
  var expComment = req.body.expressionCommentLearn
  var vidId = req.body.vidId
console.log('this is words: ',words, words.length)

//safety measure to prevent single word string being broken down by letters
function strToObj(word, comment, express, expressComment){
  var type = typeof(word)
  if(type=='string'){
    words = new Array(word)
    wordComment = new Array(comment)
    exp = new Array(express)
    expComment = new Array(expressComment)
    return
  }else if(type=='object'){
    return
  }else{
    return
  }
}

strToObj(words, wordComment, exp, expComment)

// for loop to save all words
for(i=0;i<words.length;i++){
  var wordToSave = new NotepadsWord({
    user: userId,
    vidId: vidId,
    word:words[i],
    comment:wordComment[i]
})
  wordToSave.save(function(err, addedword){
    if(err){
      res.send(err)
    }
    console.log('this is the addedword: ', addedword);

  })
}

for(i=0;i<exp.length;i++){
  var expToSave = new NotepadsExp({
    user: userId,
    vidId: vidId,
    expression:exp[i],
    comment:expComment[i]
})
  expToSave.save(function(err, addedexp){
    if(err){
      res.send(err)
    }
    console.log('this is the added expression ', addedexp);

  })
}

res.render('./pages/notepad')
// var wordToSave = new NotepadsWord({
//     user: userId,
//     vidId: vidId,
//     word:words,
//     comment:wordComment
//   })
//   wordToSave.save(function(err, addedword){
//       if(err){
//         res.send(err)
//       }else {
//       console.log('this is the addedword: ', addedword);
//       res.send('<p>saving words to db is successful!</p>')
//     }
//   })
})
module.exports = router;
