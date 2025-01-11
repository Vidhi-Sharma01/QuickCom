import { userStyle } from "../bankandotheroffers/bankandotheroffersCss";
import { Grid, MenuItem,FormControl,InputLabel,Select,Button } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { postData } from "../../../services/FetchNodeAdminServices";
import logo from '../../../assets/logo.png'


export default function Bankoffers(props){
    const classes = userStyle();

    const[status,setStatus]=useState('')
    const [filenames, setFilenames]= useState({ bytes:[]})


    const showThumbnails=()=>{
        return filenames?.bytes?.map((item)=>{
         return(<div style={{margin:2,width:30, height:30,borderRadius:5}}><img src={URL.createObjectURL(item)}  style={{width:30,height:30}} /></div>)
    
        })
    }
    const handleImage = (e) => {
       setFilenames({ bytes: Object.values(e.target.files)})
    }
    const resetValue=()=>
    {
        setStatus('')
        setFilenames([])
    }

    const handleSubmit=async()=>{
        {
    
   var formData= new FormData()
   
   formData.append('status',status)
   filenames?.bytes?.map((item,i)=>{
    formData.append('picture'+i,item)
  })
 

   
 
   
   var result=await postData('bankoffers/bank_and_other_offers_submit',formData)
   if(result.status)
   {
    Swal.fire({
      icon: "success",
      title: result.message,
      showConfirmButton: false,
      timer: 2000,
      toast:true
    });
   }
   else{
    Swal.fire({
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 5000,
        toast:true
      });
   }
   
   resetValue()
    }}




    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                   <div className={classes.mainHeadingStyle}>
                       <img src={logo} className={classes.imageStyle} />
                       <div className={classes.headingStyle}>
                          Bank And Other Offers
                       </div>
                  </div>
                   </Grid>
                <Grid item xs={12} className={classes.center}>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                     >
                                        <MenuItem value="Show">Show</MenuItem>
                                        <MenuItem value="Hide">Hide</MenuItem>
                                        <MenuItem value="Expired">Expired</MenuItem>
                                    
                                </Select>
                                
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Button variant="contained" component='label'>
                                    Upload
                                    <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                                </Button>
                                  
                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                        <div style={{display:'flex'}}>
                          {showThumbnails()}
                        </div>                          
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button fullWidth variant="contained"onClick={resetValue} >Reset</Button>
                        </Grid>







                </Grid>
            </div>
        </div>
    )
}
