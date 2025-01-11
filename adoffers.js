var express = require('express');
var router = express.Router();
var upload= require('./multer')
var pool= require('./pool')

router.post('/ad_offer_submit', upload.any(), function (req, res, next) {
    var f=[]
    req.files.map((item)=>{
     f.push(item.filename)
    })
  
     try {
        pool.query("insert into adoffers(categoryid, subcategoryid, brandid, productid, productdetailid, filenames) values(?,?,?,?,?,?)",
         [req.body.categoryid, req.body.subcategoryid,req.body.brandid, req.body.productid,req.body.productdetailid,f+""], function (error, result) {
           if (error) {
              console.log(error)
              res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
           }
           else {
              res.status(200).json({ message: 'Ad Offer Submitted Successfully', status: true })
  
           }
  
        })
     }
     catch (e) {
        console.log(e)
        res.status(200).json({ message: 'Severe Error On Server', status: false })
     }
  });
  

module.exports = router;