import { useState } from "react"
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



export default function AddtoCart(){

    const [value,setValue]=useState(0)
    const handlePlus=()=>{
      
        var v=value
         v++
         setValue(v)
     }
     const handleMinus=()=>{
         var v=value
         v--
         setValue(v)
     }
    return(
        <div>
         {value==0? <Button onClick={handlePlus} style={{border:'1px solid #ddd',borderRadius:25, width:'90%',height:50,marginTop:15,color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286}}  fullWidth>Add To Cart</Button>:
          
          <div style={{  marginTop:8,display:'flex',justifyContent:'space-between',alignItems:'center',width:90,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5,marginLeft:'40%'}}>

          <div onClick={handleMinus} style={{ cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',width:20,height:'10%',borderRadius:50,border:`0.7px solid #273c75`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',padding:5}}><RemoveIcon/></div>
           <div>{value}</div>
           <div onClick={handlePlus} style={{ cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',width:20,height:'10%',borderRadius:50,border:`0.7px solid #273c75`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',padding:5}}><AddIcon/></div>
      
      
      </div>}

        </div>
    )
}