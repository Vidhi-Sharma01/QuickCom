var express = require('express');
var router = express.Router();
var upload= require('./multer')
var pool= require('./pool')


router.post('/brand_submit', upload.single('brandicon'), function (req, res, next) {
    try {
       pool.query("insert into brand( categoryid, subcategoryid, brandname, brandicon, created_at, updated_at, user_admin ) values(?,?,?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryid,req.body.brandname, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin], function (error, result) {
          if (error) {
             console.log(error)
             res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
          }
          else {
             res.status(200).json({ message: 'Brand Submitted Successfully', status: true })
 
          }
 
       })
    }
    catch (e) {
       console.log(e)
       res.status(200).json({ message: 'Severe Error On Server', status: false })
    }
 });


 router.get('/display_brands', function (req, res, next) {
   try {
      pool.query("select * , (select categoryname from category C where C.categoryid=B.categoryid) as categoryname, (select subcategoryname from subcategory S where S.subcategoryid=B.subcategoryid) as subcategoryname from brand B", function (error, result) {
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


router.post('/edit_brand_data', function (req, res, next) {
   try {
      pool.query("update brand set categoryid=?, subcategoryid=?, brandname=?, updated_at=?, user_admin=? where brandid=?", [req.body.categoryid, req.body.subcategoryid, req.body.brandname, req.body.updated_at, req.body.user_admin,req.body.brandid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            res.status(200).json({ message: 'Brand Updated Successfully', status: true })
         }

      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});

router.post('/edit_brand_icon', upload.single('brandicon'), function (req, res, next) {
   try {
      pool.query("update brand set brandicon=?,updated_at=?,user_admin=? where brandid=?", [req.file.filename, req.body.updated_at, req.body.user_admin, req.body.brandid], function (error, result) {
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

router.post('/delete_brand', function (req, res, next) {
   try {
      pool.query("delete  from brand  where brandid=?", [req.body.brandid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            res.status(200).json({ message: 'Brand deleted successfully', status: true })
         }

      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});

router.post('/get_all_brands_by_categoryid', function (req, res, next) {
   try {
      pool.query("select * from brand where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            
            res.status(200).json({ data: result, message: 'brand fetched successfully', status: true })
         }
      })

   }
   catch (e) {
      
      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});



 



module.exports = router;
