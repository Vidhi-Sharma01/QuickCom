const mysql=require('mysql')
var pool=mysql.createConnection({
  host:'localhost',
  port:3306,
  user:'root',
  password:'12345',
  database:'quickcom',
  multipleStatements:true,
})


module.exports=pool