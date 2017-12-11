const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport')
const config = require('./config');
const User = require('./')
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const findTopSellers = require('./backend/aws-api/api-call.js').findTopSellers;
const findSimilarItems = require('./backend/aws-api/api-call.js').findSimilarItems;
const itemLookup = require('./backend/aws-api/api-call.js').itemLookup;

app.use(express.static('./backend/static/'));
app.use(express.static('./frontend/dist/'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

let allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);



// Static routes
app.route('/').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/login').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/register').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/dashboard').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})

/* New things ================================================================ */

require('./backend/models').connect(config.dbUri);
require('./backend/auth/passport')(passport);
app.use('/api/DB', require('./backend/API.js'));  /////
// Initialize cookie sessions
app.use(cookieParser());
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));

// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Get our routes
app.use('/api', require('./backend/routes/api')(router, passport));
app.get('/findTopSellers/:categoryId', (req,res) => {
  findTopSellers(req.params.categoryId.toString(),(topSellers) => {
    res.send(topSellers);
  })
});

app.get('/findSimilarItems/:itemId', (req,res) => {
  findSimilarItems(req.params.itemId.toString(),(similarItems) => {
    res.send(similarItems);
  })
});

app.get('/itemLookup/:itemId', (req,res) => {
  itemLookup(req.params.itemId.toString(),(item) => {
    res.send(item);
  }, () => {
    res.send('error');
  })
});


/* =========================================================================== */

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
