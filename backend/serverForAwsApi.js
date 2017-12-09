let express = require('express');
let app = express();
findTopSellers = require('./index.js').findTopSellers;
findSimilarItems = require('./index.js').findSimilarItems;
itemLookup = require('./index.js').itemLookup;

let allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

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
  })
});

app.listen(4000, () => {
  console.log('App listening on 4000');
});
