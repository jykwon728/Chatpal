const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');

// const localStrategy = require('passport-local').Strategy;

const User = require('./database/User.js');

router.route('/').get(function(req, res){
  res.write('<h1>this is the root page!</h1>')
})

router.route('/login').post(passport.authenticate('local-login', {
                                        successRedirect:'/',
                                        failureRedirect: '/public/login.html'}),
    function(req, res){
      console.log('/process/login 호출됨.');

      // 요청 파라미터 확인
      var email = req.body.email || req.query.email;
      var password = req.body.password || req.query.password;
      res.write('<h2>here is your info!</h2>')
      // res.write('<p>'+email+'</p>')
      console.log('요청 파라미터 : ' + email + ', ' + password);
      return router;
    }

  );



// 사용자 추가 라우팅 함수 - 클라이언트에서 보내오는 데이터를 이용해 데이터베이스에 추가
router.route('/signup').post(function(req, res) {
    console.log('/process/signup 호출됨.');

    var paramEmail = req.body.email || req.query.email;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;

    console.log('요청 파라미터 : ' + paramEmail + ', ' + paramPassword + ', ' + paramName);

    User.findOne({email:paramEmail}, function(err, doc){
      if(err){
          console.error('사용자 추가 중 에러 발생 : ' + err);

          res.writeHead('500', {'Content-Type':'text/html;charset=utf8'});
          res.write('<h2>사용자 추가 중 에러 발생</h2>');
          res.write('<p>' + err + '</p>');
          res.end();

          return;
      }else {
        if(doc){
          console.error('해당 사용자가 이미 존재함 : ' + doc);

          res.writeHead('500', {'Content-Type':'text/html;charset=utf8'});
          res.write('<h2>해당 사용자가 이미 존재함</h2>');
          res.write('<p>' + err + '</p>');
          res.end();
        }
        else{
          var record= new User({email:paramEmail,
                                name:paramName,
                                password:paramPassword
          })
          record.save(function(err, addedUser) {
              if (err) {
                  res.writeHead('500', {'Content-Type':'text/html;charset=utf8'});
                  res.write('<p>' + err + '</p>');
                  res.end();
              }
              console.log("사용자 데이터 추가함.", addedUser);
              res.send(addedUser)
          });
          res.redirect('/public/login.html')
        }
      }
    })
});

router.get('/google', passport.authenticate('google',{
  scope:['profile']
})
);

//callback to redirect
router.get('/google/redirect',  passport.authenticate('google'),function(req,res){
  res.send('welcome! '+ req.user.name)
}
// ,{
//   failureRedirect: '/login'}),
// function(req, res){
//   res.redirect('/');
// }
);
//사용자 리스트 함수
// router.route('/process/listuser').post(function(req, res) {
//     console.log('/process/listuser 호출됨.');
//
//     // 데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
//     if (database) {
//         // 1. 모든 사용자 검색
//         UserModel.findAll(function(err, results) {
//             // 에러 발생 시, 클라이언트로 에러 전송
//             if (err) {
//                 console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);
//
//                 res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
//                 res.write('<p>' + err.stack + '</p>');
//                 res.end();
//
//                 return;
//             }
//
//             if (results) {  // 결과 객체 있으면 리스트 전송
//                 console.dir(results);
//
//                 res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h2>사용자 리스트</h2>');
//                 res.write('<div><ul>');
//
//                 for (var i = 0; i < results.length; i++) {
//                     var curId = results[i]._doc.id;
//                     var curName = results[i]._doc.name;
//                     res.write('    <li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
//                 }
//
//                 res.write('</ul></div>');
//                 res.end();
//             } else {  // 결과 객체가 없으면 실패 응답 전송
//                 res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//                 res.write('<h2>사용자 리스트 조회  실패</h2>');
//                 res.end();
//             }
//         });
//     } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
//         res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//         res.write('<h2>데이터베이스 연결 실패</h2>');
//         res.end();
//     }
//
// });


// 라우터 객체 등록
// app.use('/', router);


module.exports = router
