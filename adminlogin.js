var express = require('express');
var router = express.Router();
var upload= require('./multer')
var pool= require('./pool')

router.post('/chk_admin_login', function(req, res, next) {
    try{
       pool.query("select * from admins where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid, req.body.password],function(error,result){
       if(error)
       {
           console.log(error)
           res.status(200).json({message:'Database Error. Contact with backend team',status:false})
       }
       else{
        if(result.length==1)
        {
            res.status(200).json({message:'Login Success',status:true})
        }
        else
        {
           res.status(200).json({message:'Invalid Details',status:false})
        }
       }
   
       })
    }
    catch(e)
    {
       console.log(e)
       res.status(200).json({message:'Severe Error On Server',status:false})
    }
   });



module.exports = router;