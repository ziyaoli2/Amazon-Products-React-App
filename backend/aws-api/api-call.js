const similarItems = require('aws-product-api');
const browseTopSellers = require('amazon-product-api');

const awsId = 'AKIAI7WZ3PQRWU4HKDXQ';
const awsSecretKey = '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';
const awsTag = 'cs498rkfp0d-20';

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
        if(typeof results[0]['Item'] !== 'undefined') {
          let result = results[0]['Item'];
          let resultASINs = [];
          for(let i=0;i<result.length;i++){
            resultASINs.push(result[i]['ASIN'][0]);
          }
          callback(resultASINs);
        } else {
          findSimilarItems('B00O4OR4GQ', callback);
        }

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
