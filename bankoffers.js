var express = require('express');
var router = express.Router();
var upload= require('./multer')
var pool= require('./pool')


router.post('/bank_and_other_offers_submit', upload.any(), function (req, res, next) {
    var f=[]
    req.files.map((item)=>{
     f.push(item.filename)
    })
  
     try {
        pool.query("insert into bankandotheroffers(status, filenames) values(?,?)",
         [req.body.status,f+""], function (error, result) {
           if (error) {
              console.log(error)
              res.status(200).json({ message: 'Database Error. Contact with backend team', status: false })
           }
           else {
              res.status(200).json({ message: 'Bank Offers Submitted Successfully', status: true })
  
           }
  
        })
     }
     catch (e) {
        console.log(e)
        res.status(200).json({ message: 'Severe Error On Server', status: false })
     }
  });
  


module.exports = router;