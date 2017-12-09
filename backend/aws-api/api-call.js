const similarItems = require('aws-product-api');
const browseTopSellers = require('amazon-product-api');

const awsId = 'AKIAIL6MEBROY6QG653Q';
const awsSecretKey = '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';
const awsTag = 'cs498rkfp-20';

const similarItemsClient = new similarItems(awsSecretKey, awsId, awsTag);
const findSimilarItems = (itemId, callback) => {
    similarItemsClient.Query({
      Operation: "SimilarityLookup",
      ItemId: itemId,
      ResponseGroup: "Small"
    }, function(err, results) {
      if(err){
        console.log(err);
      }else{
        let result = results[0]['Item'];
        let resultASINs = [];
        for(let i=0;i<result.length;i++){
          resultASINs.push(result[i]['ASIN'][0]);
        }
        callback(resultASINs);
      }
    });
}

const topSellersItemIdClient = browseTopSellers.createClient({
  awsId: awsId,
  awsSecret: awsSecretKey,
  awsTag: awsTag,
});
const findTopSellers = (categoryId,callback) => {
  topSellersItemIdClient.browseNodeLookup({
    browseNodeId: categoryId,
    responseGroup: 'TopSellers'
  }).then(function(results) {
    const result = results[0]['TopSellers'][0]['TopSeller'];
    let resultASINs = [];
    for(let i=0;i<result.length;i++){
      resultASINs.push(result[i]['ASIN'][0]);
    }
    callback(resultASINs);
  }).catch(function(err) {
    console.log('err = ',err);
  });
}

const itemLookup = (itemId, successCallback, errorCallback) => {
  topSellersItemIdClient.itemLookup({
    itemId: itemId,
    responseGroup: 'ItemAttributes, Images',
  }).then((results) => {
    successCallback(results)
  }).catch(function(err) {
    errorCallback();
  });
}

module.exports = {
  findTopSellers,
  findSimilarItems,
  itemLookup,
}
