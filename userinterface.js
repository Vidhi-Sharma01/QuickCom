var express = require('express');
var router = express.Router();
var pool = require('./pool')


router.post('/user_display_all_category', function (req, res, next) {
   try {
      if (req.body.status == "all") {
         q = "select * from category";
      }
      else if (req.body.status == "limit") {
         q = "select * from category limit 7"
      }
      pool.query(q, function (error, result) {
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

router.get('/user_show_all_mainbanner', function (req, res, next) {
   try {
      pool.query("select * from mainbanner where status='show'", function (error, result) {
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

router.get('/user_show_all_bankoffer', function (req, res, next) {
   try {
      pool.query("select * from bankandotheroffers where status='show'", function (error, result) {
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

router.get('/user_show_all_adoffer', function (req, res, next) {
   try {
      pool.query("select * from adoffers ", function (error, result) {
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

router.post('/user_get_all_subcategory_by_categoryid', function (req, res, next) {
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

router.post('/user_get_category_and_subcategory_name', function (req, res, next) {
   try {
      pool.query("SELECT c.categoryname, GROUP_CONCAT(s.subcategoryname SEPARATOR ',') AS subcategories FROM category c JOIN subcategory s ON c.categoryid = s.categoryid GROUP BY c.categoryname;", function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error Pls contact with backend team...', status: false })
         }
         else {
            console.log(result)
            res.status(200).json({ data: result, message: 'Sub-Category fetched successfully', status: true })
         }
      })

   }
   catch (e) {

      res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
   }
});

router.get('/user_display_all_subcategory', function (req, res, next) {
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


router.post('/user_get_all_brand_by_subcategoryid', function (req, res, next) {
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

router.post('/user_display_product_detail_by_status', function (req, res, next) {
   try {
      pool.query("select * , (select categoryname from category C where C.categoryid=D.categoryid) as categoryname, (select subcategoryname from subcategory S where S.subcategoryid=D.subcategoryid) as subcategoryname,  (select brandname from brand B where B.brandid=D.brandid) as brandname,  (select productname from products P where P.productid=D.productid) as productname from productdetails D where D.productstatus=?", [req.body.productstatus], function (error, result) {
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

router.post('/user_display_product_detail_by_subcategoryid', function (req, res, next) {
   try {
      pool.query("select * , (select categoryname from category C where C.categoryid=D.categoryid) as categoryname, (select subcategoryname from subcategory S where S.subcategoryid=D.subcategoryid) as subcategoryname,  (select brandname from brand B where B.brandid=D.brandid) as brandname,  (select productname from products P where P.productid=D.productid) as productname from productdetails D where D.subcategoryid=?", [req.body.subcategoryid], function (error, result) {
         if (error) {

            res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            res.status(200).json({ message: 'Success', data: result, status: true })

         }

      })
   }
   catch (e) {
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});


router.post('/user_display_product_detail_by_brandid', function (req, res, next) {
   try {
      pool.query("select * , (select categoryname from category C where C.categoryid=D.categoryid) as categoryname, (select subcategoryname from subcategory S where S.subcategoryid=D.subcategoryid) as subcategoryname,  (select brandname from brand B where B.brandid=D.brandid) as brandname,  (select productname from products P where P.productid=D.productid) as productname from productdetails D where D.brandid=?", [req.body.brandid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error. Contact with backend team', status: false })
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

router.post('/user_display_product_pictures_by_productid', function (req, res, next) {

   try {
      pool.query("select * from productpictures where productid=?", [req.body.productid], function (error, result) {
         if (error) {
            res.status(500).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            res.status(200).json({ message: 'Success', data: result, status: true })
         }

      })
   }
   catch (e) {
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});


router.post('/check_user_mobileno', function (req, res, next) {
   try {
      pool.query("select * from usersdata where mobileno=?", [req.body.mobileno], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            if (result.length == 1) {
               res.status(200).json({ message: 'Mobile No. Found', data: result[0], status: true })
            }
            else {
               res.status(200).json({ message: 'Mobile No. Not Found', data: [], status: false })
            }
         }
      })
   }
   catch (e) {
      console.log(e)
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});


router.post('/submit_user_data', function (req, res, next) {
   try {
      pool.query("insert into usersdata(firstname, lastname, gender, emailaddress, dob, mobileno) values(?,?,?,?,?,?)", [req.body.firstname, req.body.lastname, req.body.gender, req.body.emailaddress, req.body.dob, req.body.mobileno], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            res.status(200).json({ message: 'Successfully Registered', status: true, userid: result.insertId })


         }
      })
   }
   catch (e) {
      console.log(e)
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});


router.post('/check_user_address', function (req, res, next) {
   try {
      pool.query("select * from useraddress where userid=?", [req.body.userid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            if (result.length >= 1) {
               res.status(200).json({ message: 'Address Found', data: result, status: true })
            }
            else {
               res.status(200).json({ message: 'Address Not Found', data: [], status: false })
            }
         }
      })
   }
   catch (e) {
      console.log(e)
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});

router.post('/submit_user_address', function (req, res, next) {
   try {
      pool.query("insert into useraddress(userid, pincode, houseno, floorno, towerno, building, address, landmark, city, state) values(?,?,?,?,?,?,?,?,?,?)", [req.body.userid, req.body.pincode, req.body.houseno, req.body.floorno, req.body.towerno, req.body.building, req.body.address, req.body.landmark, req.body.city, req.body.state], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            res.status(200).json({ message: 'Successfully Registered', status: true })
         }
      })
   }
   catch (e) {
      console.log(e)
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});

router.post('/submit_orders', function (req, res, next) {
   console.log("vii", req.body)
   try {
      var userdata = JSON.parse(req.body.userdata)[0]
      var data = JSON.parse(req.body.data)
      // console.log("user", user)
      // console.log("data", data)
      pool.query("insert into orders(orderdate, productdetailid, qty, paymentstatus, deliverystatus, mobileno, emailid, address, username) values ?", [
         data.map((item) => {
            return [ req.body.orderdate, item.productdetailid, item.qty, req.body.paymentstatus, req.body.deliverystatus, userdata.mobileno, userdata.emailaddress, userdata.address, userdata.firstname]
         })
         // req.body.orderdate, req.body.productdetailid, req.body.qty, req.body.paymentstatus, req.body.deliverystatus, req.body.mobileno, req.body.emailid, req.body.address, req.body.username
      ], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ message: 'Database Error. Contact with backend team', status: false })
         }
         else {
            console.log("data:", req.body)
            res.status(200).json({ message: 'Successfully Registered', status: true })
         }
      })
   }
   catch (e) {
      console.log(e)
      res.status(200).json({ message: 'Severe Error On Server', status: false })
   }
});

router.get('/display_all_orders', function (req, res, next) {
   try {
      pool.query("SELECT o.*,pd.productdetailname AS product FROM orders o JOIN productdetails pd ON o.productdetailid = pd.productdetailid", function (error, result) {
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




module.exports = router;
