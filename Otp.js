import Paper from '@mui/material/Paper';
import {Button } from '@mui/material';
import { useState } from 'react';
import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {postData} from '../../services/FetchNodeAdminServices'
import {useDispatch } from 'react-redux';











export default function Otp(){
    const[otp,setOtp]=useState('')

    const handleChange = (newValue) => {
        setOtp(newValue)
      }
      const navigate=useNavigate()
      const dispatch=useDispatch()
      var location=useLocation()
      var mobileno=location?.state?.phonenumber
      var genOtp=location?.state?.genOtp
 
      const handleVerify=async()=>{
        if(otp==genOtp){





      var response=await postData('userinterface/check_user_mobileno',{mobileno})
      if(response.status)
      {  dispatch({type:"ADD_USER",payload:[response.data.userid,response.data]})
      var res=await postData('userinterface/check_user_address',{userid:response.data.userid})
      if(res.status)
      {
      var userDataWithAddress={...response.data,...res.data[0]}
       dispatch({type:"ADD_USER",payload:[response.data.userid,userDataWithAddress]})
      
      }
      
        navigate('/cart')
      }
      else{
        navigate('/signin3',{state:{mobileno}})
      }
    }
    else
    {
      alert('Invalid OTP')
    }
      }
    

    
    return(
        <div>
            <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Paper elevation={4} style={{width:380,height:'auto',padding:10,marginTop:45,borderRadius:20,display:'flex',flexDirection:'column'}}>
        <div style={{padding:15}}>
            <div>
            <img src={'/arrow.png'} style={{width:20,height:20,cursor:'pointer'}}/>    
            </div>

            <div style={{marginTop:20,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:950,fontSize:25,letterSpacing:-0.72,lineHeight: 1}}>
                OTP verification
            </div>
            
            
             <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:'1rem',letterSpacing:0.2,lineHeight: 1.25,marginTop:10,color:'#535c68'}}>
                Enter the OTP sent to you on<br></br><span style={{fontWeight:550}}>+91-{mobileno}</span><span style={{marginLeft:5,color:'#1B1464',fontWeight:550,cursor:'pointer'}} onClick={()=>{navigate('/signin1')}}>Change Number</span>
             </div> 
             <div style={{marginTop:35}}>
             <MuiOtpInput value={otp} length={5} onChange={handleChange} />
            </div> 
            <div style={{cursor:'pointer',marginLeft:'75%',marginTop:'5%',color:'#1B1464',fontWeight:550}}>
             Resend OTP   
            </div>
            <Button fullWidth style={{border:'1px solid #ddd',borderRadius:25, width:'100%',height:50,marginTop:'25%',color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:0.07,lineHeight: 1.4285714286}} onClick={handleVerify}>Verify</Button>
            <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:11,letterSpacing:0.5,lineHeight: 1.10,marginTop:20,marginLeft:2,color:'#535c68',marginBottom:'22%'}}>
               By Continuing, you agree to our terms and conditions of use,Privacy Policy and Retail Account Privacy Policy
            </div>
        </div>
        </Paper>
         </div>

        </div>
    )
}