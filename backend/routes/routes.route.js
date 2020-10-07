const { Router, query } = require('express');
const express = require('express');
const app = express();
const rouRoute = express.Router();
var User= require('../models/users')
var passport=require('passport')

let RouteModel = require('../models/routes');

// Add route
rouRoute.route('/create-route/:id').post((req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {$addToSet:{ routes: req.body }},
    {new:true, upsert: true, rawResult: true, useFindAndModify:false},
    function(err, data) {
      if (err) {
        return next(err)
      } else {
        res.json(data);
      }
    }
  );
});

// Get all routes
rouRoute.route('/get-all/:username').get((req, res,next) => {
  var query= User.findOne({username:req.params.username});
  query.select('routes');
  query.exec(function (err, data) {
    if (err) {
      return next(err)
    } else {
      res.json(data);
    }
  })
})

// Get single route
rouRoute.route('/get-route/:id').get((req, res,next) => {
  User.find( {'routes.id':req.params.id},
    function(err, data) {
      if (err) {
        return next(err)
      } else {
        res.json(data);
      }
    })
})


// Update route
rouRoute.route('/update-route/:username/:id/:route_name').post((req, res, next) => {
  User.findOneAndUpdate({ 'username': req.params.username, 'routes.id': req.params.id },{ $set:{ 'routes.$.route_name': req.params.route_name}}, 
  function (error, data) {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Route successfully updated!')
    }
  })
})

// Delete route
rouRoute.route('/delete-route/:username/:id').post((req, res, next) => {
  User.findOneAndUpdate( req.params.username, { $pull: { "routes": { id: req.params.id } } }, { safe: true, upsert: true, useFindAndModify:false},
    function(err, data) {
      if (err) {
        return next(err)
      } else {
        res.json(data);
      }
    }
  );
})

rouRoute.post('/register', function(req,res,next){
addToDB(req,res);
});

async function addToDB(req,res){
  var user=new User({
    email:req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt:Date.now()
  });

  try{
    doc= await user.save()
    return res.status(201).json(doc)

  } catch(err){
    return res.status(501).json(err)

  }
}

rouRoute.post('/login', function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login success'})
    });
  })(req, res, next);
});

rouRoute.get('/home', isValidUser, function(req,res,next){
  return res.status(200).json(req.user);
});

rouRoute.get('/addroutes', isValidUser, function(req,res,next){
  return res.status(200).json(req.user);
});

rouRoute.get('/logout', isValidUser, function(req,res,next){

  req.logout();
  return res.status(200).json({message: 'Logout success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'})
}

module.exports = rouRoute;