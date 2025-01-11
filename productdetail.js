var express = require('express');
var router = express.Router();
var upload= require('./multer')
var pool= require('./pool')


router.post('/get_all_product_by_categoryid', function (req, res, next) {
    try {
       pool.query("select * from products where brandid=?", [req.body.brandid], function (error, result) {
          if (error) {
             console.log(error)
             res.status(500).json({ message: 'Database Error Pls contact with backend team...', status: false })
          }
          else {
             
             res.status(200).json({ data: result, message: 'product fetched successfully', status: true })
          }
       })
 
    }
    catch (e) {
       
       res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
    }
 });

 router.post('/productd_submit', upload.single('picture'), function (req, res, next) {
    try {
       pool.query("insert into productdetails(categoryid, subcategoryid, brandid, productid, productdetailname, weight, weighttype, packagingtype, noofqty, stock, price, offerprice, offertype, productstatus, productdescription, created_at, updated_at, picture ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [ req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailname, req.body.weight, req.body.weighttype, req.body.packagingtype, req.body.noofqty, req.body.stock, req.body.price, req.body.offerprice, req.body.offertype, req.body.productstatus, req.body.productdescription, req.body.created_at, req.body.updated_at, req.file.filename], function (error, result) {
          if (error) {
             console.log(error)
             res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
          }
          else {
             res.status(200).json({ message: 'Product Details Submitted Successfully', status: true })
 
          }
 
       })
    }
    catch (e) {
       console.log(e)
       res.status(200).json({ message: 'Severe Error On Server', status: false })
    }
 });

 router.get('/display_product_detail', function (req, res, next) {
    try {
       pool.query("select * , (select categoryname from category C where C.categoryid=D.categoryid) as categoryname, (select subcategoryname from subcategory S where S.subcategoryid=D.subcategoryid) as subcategoryname,  (select brandname from brand B where B.brandid=D.brandid) as brandname,  (select productname from products P where P.productid=D.productid) as productname from productdetails D", function (error, result) {
          if (error) {
             console.log(error)
             res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
          }
          else {
             res.status(200).json({ message: 'Success', data: result, status: true })
          
          }
 
       })
    }
    catch (e) {
       console.log(e)
       res.status(200).json({ message: 'Severe Error On Server', status: false })
    }
 });
 router.post('/edit_productd_icon', upload.single('picture'), function (req, res, next) {
   try {
      pool.query("update productdetails set picture=?,updated_at=? where productdetailid=?", [req.file.filename, req.body.updated_at, req.body.productdetailid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            res.status(200).json({ message: 'Icon Changed successfully', status: true })
         }

      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});

router.post('/edit_productd_data', function (req, res, next) {
   try {
      pool.query("update productdetails set categoryid=?, subcategoryid=?, brandid=?, productid=?, productdetailname=?, weight=?, weighttype=?, packagingtype=?, noofqty=?, stock=?, price=?, offerprice=?, offertype=?, productstatus=?, productdescription=?, updated_at=? where productdetailid=?", [ req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailname, req.body.weight, req.body.weighttype, req.body.packagingtype, req.body.noofqty, req.body.stock, req.body.price, req.body.offerprice, req.body.offertype, req.body.productstatus, req.body.productdescription, req.body.updated_at,req.body.productdetailid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            res.status(200).json({ message: 'Product Details Updated Successfully', status: true })
         }

      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});

router.post('/delete_productd', function (req, res, next) {
   try {
      pool.query("delete  from productdetails  where productdetailid=?", [req.body.productdetailid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            res.status(200).json({ message: 'Product Details deleted successfully', status: true })
         }

      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});




 
 


  module.exports = router;