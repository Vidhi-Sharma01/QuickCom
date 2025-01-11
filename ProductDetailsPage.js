import Header from "../homepage/Header"
import Footer from "../homepage/Footer"
import ProductImageComponent from "./ProductImageComponent";
import ProductDescription from "./ProductDescription";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from "react";





export default function ProductDetail(){
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const location=useLocation()
  var p=location?.state?.product
  const[product,setProduct]=useState(p)
  const[refresh,setRefresh]=useState(false)


  const breadcrumbs = [
    <Link underline="hover" color="#0c5273" href="/homepage" style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight: 790,fontSize: 18,letterSpacing:-0.08,lineHeight: 1.5}} >
      QuickComm
    </Link>,
    <Link
      underline="hover"
      color="#0c5273"
      
      style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight: 780,fontSize: 18,letterSpacing:-0.08,lineHeight: 1.5}}
    >
      All Categories
    </Link>,
    <Typography  sx={{ color:"inherit",fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight: 720,fontSize: 18,letterSpacing:-0.08,lineHeight: 1.5}}>
      {product.productdetailname}
    </Typography>,
  ];

  


    return(
        <div>
        <Grid container spacing={2}>
          
        <Grid item xs={12}>
          <Header />
        </Grid>
        
        <Grid item xs={6} style={{width:'60%'}}>
          {matches?
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" style={{marginLeft:'10%'}} >
          {breadcrumbs}
         </Breadcrumbs>:<></>}
        </Grid>
          <Grid item xs={6} style={{width:'40%'}}></Grid>

        <Grid item xs={6}>
          <ProductImageComponent product={product} setProduct={setProduct} refresh={refresh} setRefresh={setRefresh}/>
        </Grid>
        <Grid item xs={6} style={{width:'45%'}}>
          <ProductDescription product={product} setProduct={setProduct}/>
        </Grid>
        
        </Grid>
        </div>
    )
}