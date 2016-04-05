var express = require('express'),
	bodyparser = require('body-parser'),
	connection = require('./connection'),
	consolidate = require('consolidate'),
	routes = require('./routes'),
	cookieSession = require('cookie-session'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	Strategy = require('passport-local').Strategy,
	db = require('./db');

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('resources'));

app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
 


app.use(passport.initialize());
app.use(passport.session());


app.engine('html',consolidate.handlebars)
app.set('view engine','html')

connection.init();

routes.configure(app,passport);

app.listen('8080',function(){
	console.log("server startes")
})
