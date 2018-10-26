const express = require('express');
const router = express.Router();
const app = express();
const passport = require('passport');


const authCheck = (req,res,next)=>{
  if(!req.user){
    res.redirect('/auth/login');
  }else{
    next()
  }
}
router.get('/', authCheck, function(req,res){
  res.render
})
router.get('/profile/submitEssay'),function(req, res, next){

}
