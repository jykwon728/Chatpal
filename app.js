const express = require('express');
const path = require('path');
// const schema = require('./schema.js');
const routes = require('./app_routes.js');
const app = express();
const static = require('serve-static');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// const flash = require('flash');
// const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const User = require('./database/User.js');
const passportSetup = require('./database/passport-setup');

app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use(expressSession({
//     secret:'my key',
//     resave:true,
//     saveUninitialized:true
// }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/process', routes)




//Database rleated stuff
var database ={};


function connectDB() {
    // 데이터베이스 연결 정보
    var databaseUrl = 'mongodb://localhost:27017/local';

    // 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function () {
        console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
    });
}

app.use('/', routes);
// 서버열기
app.listen(3000, function(){
  console.log('you are connected to port 3000');
  connectDB()
});
