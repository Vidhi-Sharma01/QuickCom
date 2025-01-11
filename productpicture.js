var express = require('express');
var router = express.Router();
var upload= require('./multer')
var pool= require('./pool')


router.post('/get_all_productdetail_by_productid', function (req, res, next) {
    try {
       pool.query("select * from productdetails where productid=?", [req.body.productid], function (error, result) {
          if (error) {
             console.log(error)
             res.status(500).json({ message: 'Database Error Pls contact with backend team...', status: false })
          }
          else {
             
             res.status(200).json({ data: result, message: 'Product Details fetched successfully', status: true })
          }
       })
 
    }
    catch (e) {
       
       res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
    }
 });

 router.post('/product_picture_submit', upload.any(), function (req, res, next) {
  var f=[]
  req.files.map((item)=>{
   f.push(item.filename)
  })

   try {
      pool.query("insert into productpictures(categoryid, subcategoryid, brandid, productid, productdetailid, filenames) values(?,?,?,?,?,?)",
       [req.body.categoryid, req.body.subcategoryid,req.body.brandid, req.body.productid,req.body.productdetailid,f+""], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            res.status(200).json({ message: 'Product Picture Submitted Successfully', status: true })

         }

      })
   }
   catch (e) {
      console.log(e)
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});



module.exports = router;