similarItems = require('aws-product-api');
browseTopSellers = require('amazon-product-api');

const awsId = 'AKIAIL6MEBROY6QG653Q';
const awsSecretKey = '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';
const awsTag = 'cs498rkfp-20';

const similarItemsClient = new similarItems(awsSecretKey, awsId, awsTag);
const findSimilarItems = (itemId, callBack) => {
    similarItemsClient.Query({
      Operation: "SimilarityLookup",
      ItemId: itemId,
      ResponseGroup: "Small"
    }, function(err, results) {
      if(err){
        console.log(err);
      }else{
        callBack(results[0]['Item']);
      }
    });
}

const topSellersClient = browseTopSellers.createClient({
  awsId: awsId,
  awsSecret: awsSecretKey,
  awsTag: awsTag,
});
const findTopSellers = (categoryId,callback) => {
  topSellersClient.browseNodeLookup({
    browseNodeId: categoryId,
    responseGroup: 'TopSellers'
  }).then(function(results) {
    callback(results[0]['TopSellers'][0]['TopSeller']);
  }).catch(function(err) {
    console.log('err = ',err);
  });
}

module.exports = {
  findTopSellers,
  findSimilarItems,
}
