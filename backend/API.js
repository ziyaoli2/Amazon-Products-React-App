let express = require('express'),
router = express.Router(),
U = require('./models/user');


router.post('/:email/:id', (req, res)=>{
        U.findOneAndUpdate(
            {email : req.params.email},               //should be req.email in the future
            {$push : {wishList:req.params.id}}, {new: true},(err,doc)=>{}
        )
        res.status(200).send({
                message: 'ADD TO WISHLIST OOK',
                  });
});



router.get('/:email', (req, res)=>{

    U.findOne(
        {email : req.params.email}, (err, doc)=>{
            if (err) {
                return res.status(500).send({
                                message: "Error!" ,
                                data: []
                            })
            } else if (doc) {
                return res.status(200).send({
                                message: "GET OK!",
                                data: doc ,
            });
        }
        }
    );
});




router.delete('/:email/:id', (req, res)=>{
    var res = [];
     U.findOne(
        {email : req.params.email}, (err, doc)=> {
            if (err) {
                return res.status(500).send({
                                                message: "Error!" ,
                                                data: []
                                            })
            } else if (doc) {
                var list = JSON.parse(JSON.stringify(doc.wishList));
                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i] != req.params.id) {
                        res.push(list[i]);
                    }
                }
            }
            console.log(res);

    //let out = JSON.stringify(res);

    U.findOneAndUpdate(
        {email : req.params.email}, {$set: {wishList: res} }, {new: true }, (err,doc)=>{

        }
    );
        }
     );

    console.log(res);

});

router.put('/:email/:id', (req, res)=>{
        U.findOneAndUpdate(
            {email : req.params.email},               //should be req.email in the future
            {$set : {lastCategoryIndex:req.params.id}}, {new: true},(err,doc)=>{}
        )
        res.status(200).send({
                message: 'STORE LASTCATEGORYINDEX OK',
                  });
});


module.exports = router;
