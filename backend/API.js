let express = require('express'),
router = express.Router(),
U = require('./models/user');




router.post('/', (req, res)=>{
        U.findOneAndUpdate(
            {email : "abc"},               //should be req.email in the future
            {$push : {wishList:"135"}}, {new: true},(err,doc)=>{}
        )
        res.status(200).send({
                message: 'ADD TO WISHLIST OOK',
                  });
});



router.get('/', (req, res)=>{

    U.findOne(
        {email : "abc"}, (err, doc)=>{
            if (err) {
                return res.status(500).send({
                                message: "Error!" ,
                                data: []
                            })
            } else if (doc) {
                return res.status(200).send({
                                message: "GET OK!",
                                data: doc.wishList,
            });
        }
        }
    );
});




router.delete('/:id', (req, res)=>{
    var res = [];
     U.findOne(
        {email : "abc"}, (err, doc)=> {
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
           // console.log(res);
        }
     );
    var out = JSON.stringify(res);

    U.findOneAndUpdate(
        {email : "abc"}, {$set: {wishList: out} }, {returnNewDocument: true }, (err,doc)=>{}
    );




});


module.exports = router;



