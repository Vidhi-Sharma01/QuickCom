var express = require('express');
var router = express.Router();
var upload= require('./multer')
var pool= require('./pool')

router.post('/product_submit', upload.single('picture'), function (req, res, next) {
    try {
       pool.query("insert into products(  categoryid, subcategoryid, brandid, productname, productdescription, picture ) values(?,?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.productdescription, req.file.filename], function (error, result) {
          if (error) {
             console.log(error)
             res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
          }
          else {
             res.status(200).json({ message: 'Product Submitted Successfully', status: true })
 
          }
 
       })
    }
    catch (e) {
       console.log(e)
       res.status(200).json({ message: 'Severe Error On Server', status: false })
    }
 });

 router.get('/display_products', function (req, res, next) {
    try {
       pool.query("select * , (select categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname , (select brandname from brand B where B.brandid=P.brandid) as brandname  from products P", function (error, result) {
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

 router.post('/edit_product_data', function (req, res, next) {
    try {
       pool.query("update products set categoryid=?, subcategoryid=?, brandid=?, productname=?, productdescription=? where productid=?", [req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productname, req.body.productdescription,req.body.productid], function (error, result) {
          if (error) {
             console.log(error)
             res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
          }
          else {
             res.status(200).json({ message: 'Product Updated Successfully', status: true })
          }
 
       })
 
    }
    catch (e) {
 
       res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
    }
 });

 router.post('/edit_product_icon', upload.single('picture'), function (req, res, next) {
    try {
       pool.query("update products set picture=? where productid=?", [req.file.filename,req.body.productid], function (error, result) {
          if (error) {
             console.log(error)
             res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
          }
          else {
             res.status(200).json({ message: 'Picture Changed successfully', status: true })
          }
 
       })
 
    }
    catch (e) {
 
       res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
    }
 });
 
 
 router.post('/delete_product', function (req, res, next) {
    try {
       pool.query("delete  from products  where productid=?", [req.body.productid], function (error, result) {
          if (error) {
             console.log(error)
             res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
          }
          else {
             res.status(200).json({ message: 'Product deleted successfully', status: true })
          }
 
       })
 
    }
    catch (e) {
 
       res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
    }
 });
 


module.exports = router;