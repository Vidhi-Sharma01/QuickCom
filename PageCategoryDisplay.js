import Footer from "../homepage/Footer"
import Header from "../homepage/Header"
import ProductDetailsCategory from "./ProductDetailsCategory"
import Accordian from "./ShowCategory"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect,useState } from 'react'
import { getData } from "../../../services/FetchNodeAdminServices"
import { useLocation } from "react-router-dom"




export default function DisplayCategory(){
    const theme = useTheme();
    const location=useLocation()
    const [category,setCategory]=useState([])
    const[refresh,setRefresh]=useState(false)
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    var productData=location?.state?.productData
    

    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/user_display_all_subcategory')
        setCategory(result.data)
      }
      useEffect(()=>{
          fetchAllCategory()
      },[])
      
    return(
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
        <Grid item xs={12}>
            <Header/>
        </Grid>
        {matches?
        <div style={{display:'flex'}}>
            
        <Grid item xs={4} style={{width:'35%',marginTop:'3%'}}>
         <Accordian data={category} scid={productData[0].subcategoryid}/>
        </Grid>
        
        <Grid item xs={8} style={{width:'82%',marginLeft:50}}>   
        <ProductDetailsCategory refresh={refresh} setRefresh={setRefresh} productData={productData}/>
        </Grid>
        </div>:<Grid item xs={12} style={{width:'100%'}}><ProductDetailsCategory/></Grid>}
        
        {matches?
        <div style={{width:'82%',alignSelf:'center',marginTop:35}}>
        <Footer/>
        </div>:<></>}
        </div>
        

        
            
        
    )
}