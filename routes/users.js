const express = require('express');

const bodyParser = require('body-parser');
var User = require('../models/user');
var passport =  require('passport');
var authenticate = require('../authenticate');

const router = express.Router();
router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//route for sign up
router.post('/signup', (req,res,next) => {
User.register(new User({username: req.body.username}),
 req.body.password, (err,user)=>{
  if(err){
    res.statusCode = 500;
    res.setHeader('Content-Type','application/json');
    res.json({err: err});
  }
  else{
    passport.authenticate('local')(req,res, ()=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json({success: true, status: 'Registration Successful'});
    });
  }
})
});



router.post('/login',passport.authenticate('local'),(req, res, next) =>{

  //First we are using local pass port authentication then we are generating token after logging in so that now token will
  //be passed to other requests

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({success: true, token:token, status: 'Successfully Logged in'});
//   if(!req.session.user){
//     var authHeader =  req.headers.authorization;
//     if(!authHeader){
//       var err = new Error('You are not authorized!!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       return next(err);
//     }
//   //storing onlt part username and password which is written in base64 then decoding it. 
//     var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii').split(':');

//     var username =  auth[0];
//     var password =  auth[1];

//     User.findOne({username:username})
//     .then((user)=>{
//       if(user === null){
//         var err = new Error('User doesn\'t exist!!');
//         res.setHeader('WWW-Authenticate', 'Basic');
//         err.status = 401;
//         return next(err);
//       }
//       else if(user.password != password){
//         var err = new Error('Password is incorrect!!');
//         res.setHeader('WWW-Authenticate', 'Basic');
//         err.status = 401;
//         return next(err);
//       }
//       else if(user.username === username && user.password === password){
//         req.session.user = 'authenticated';
//         res.statusCode = 200;
//         res.setHeader('Content-Type','text/plan');
//         res.end('You are authenticated!');
//       }
//     })
//     .catch((err)=> next(err));
// }
// else{
//   res.statusCode = 200;
//   res.setHeader('Content-Type','text/plan');
//   res.end('You are already authenticated!')
// }
});

router.get('/logout',(req,res)=>{
if(req.session){
  req.session.destroy();
  res.clearCookie('session-id');
  res.redirect('/');
}
else{
  var err = new Error('You are not logged in!!');
  err.status = 403;
  next(err);
}
})

module.exports = router;
