amazon = require('aws-product-api');

let RESTobj = new amazon("UxE++3FH2C8wTyYyOwOKloP7bQZOumol329NNiHr", "AKIAIL6MEBROY6QG653Q", " cs498rkfp-20");

module.exports = (next) => {
  RESTobj.Query({
    Operation: "ItemLookup",
    ItemId: 'B074SGVDK3',
    ResponseGroup: "Small"
  }, function(err, results) {
    if(err){
      console.log(err);
    }else{
      console.log('results Item: ', results[0]['Item']);
      next(results[0]['Item']);
    }
  });
};
