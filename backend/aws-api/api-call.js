amazon = require('aws-product-api');

var RESTobj = new amazon("UxE++3FH2C8wTyYyOwOKloP7bQZOumol329NNiHr", "AKIAIL6MEBROY6QG653Q", " cs498rkfp-20");

RESTobj.Query({
  Operation: "ItemLookup",
  ItemId: 'B074SGVDK3',
  ResponseGroup: "Small"
}, function(err, results) {
  if(err){
    console.log(err);
  }else{
    console.log(results[0]['Item']);
  }
});
