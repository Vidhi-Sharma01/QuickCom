var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')



router.post('/sub_category_submit', upload.single('subcategoryicon'), function (req, res, next) {
   try {
      pool.query("insert into subcategory( categoryid, subcategoryname, subcategoryicon, created_at, updated_at, user_admin) values(?,?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryname, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            res.status(200).json({ message: 'Sub-Category Submitted Successfully', status: true })

         }

      })
   }
   catch (e) {
      console.log(e)
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});


router.get('/display_sub_category', function (req, res, next) {
   try {
      pool.query("select SC.*,(select categoryname from category C where C.categoryid=SC.categoryid) as categoryname from subcategory SC", function (error, result) {
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

router.post('/edit_sub_category_data', function (req, res, next) {
   try {
      pool.query("update subcategory set subcategoryname=?,updated_at=?,user_admin=? where subcategoryid=?", [req.body.subcategoryname, req.body.updated_at, req.body.user_admin, req.body.subcategoryid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            res.status(200).json({ message: 'Sub-Category Updated Successfully', status: true })
         }

      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});

router.post('/edit_sub_category_icon', upload.single('subcategoryicon'), function (req, res, next) {
   try {
      pool.query("update subcategory set subcategoryicon=?,updated_at=?,user_admin=? where subcategoryid=?", [req.file.filename, req.body.updated_at, req.body.user_admin, req.body.subcategoryid], function (error, result) {
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



router.post('/delete_sub_category', function (req, res, next) {
   try {
      pool.query("delete  from subcategory  where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            res.status(200).json({ message: 'Sub-Category deleted successfully', status: true })
         }

      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});


router.post('/get_all_subcategory_by_categoryid', function (req, res, next) {
   try {
      pool.query("select * from subcategory where categoryid=?", [req.body.categoryid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            res.status(200).json({ data: result, message: 'Sub-Category fetched successfully', status: true })
         }
      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});





module.exports = router;