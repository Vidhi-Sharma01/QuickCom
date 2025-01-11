import { serverURL, postData } from "../../../services/FetchNodeAdminServices";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useRef } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PlusMinusButton from "../homepage/PlusMinusButton";
import { useDispatch,useSelector } from "react-redux";








export default function ProductImageComponent({ product,setProduct,refresh,setRefresh }) {
  
  var scrollRef = useRef();
  const theme = useTheme();
  const dispatch=useDispatch()
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [selectedImage,setSelectedImage]=useState(product.picture)
  const [productpictures, setProductPictures] = useState([])
  var cartData=useSelector((state)=>state.cart)
  var keys=Object.keys(cartData)
  
  const FetchallProductPicturesbyId = async () => {
    var response = await postData('userinterface/user_display_product_pictures_by_productid', { productid: product?.productid })
    setProductPictures(response?.data[0]?.filenames?.split(","))
  }
  useEffect(() => {
    setSelectedImage(product.picture)
    FetchallProductPicturesbyId(product.productid)
  }, [product])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false
  }

  const sliderImages = () => {
    return productpictures.map((item) => {
      return (
        <div style={{ width: '20%' }}>
          <img onClick={()=>handleImage(item)} src={`${serverURL}/images/${item}`} style={{ cursor: 'pointer', width: '45%', border: '1px solid #ddd', borderRadius: 20, padding: 5, marginLeft: 73 }} />
        </div>
      )
    })
  }

  const handleImage=(item)=>{
    setSelectedImage(item)
  }

  

  const proImage = () => {
  
    return (
      <div>
        <div style={{ position: 'relative' }}>

          <img src={`${serverURL}/images/smart.png`} style={{ width: '25%' }} />
          <Paper elevation={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10%', width: '90%' }}>
            <img  src={`${serverURL}/images/${selectedImage}`} style={{ width: '80%', padding: 20 }} />
          </Paper >
          <div style={{ position: 'absolute', zIndex: 2, bottom: '5%', marginLeft: '7%' }}>
            <img src={`${serverURL}/images/veg.png`} style={{ width: '5%' }} />
          </div>
        </div>
        <div  style={{display:'flex',justifyContent:'center',marginTop:10}}>
      <PlusMinusButton qty={keys.includes(product?.productdetailid+'')?product?.qty:0}  onChange={(value)=>handleChange(value,product)}/>
       </div></div>
    )

  }
  const handleChange=(value,item)=>{
    
    if(value==0)
    {
      dispatch({type:'Delete_Cart',payload:[item.productdetailid]})
    }
    else
    {
   item['qty']=value
   dispatch({type:'Add_Cart',payload:[item.productdetailid,item]})
    }
   setRefresh(!refresh)
  }

  const handleNext = () => {
    scrollRef.current.slickNext();
  };

  const handlePrev = () => {
    scrollRef.current.slickPrev();
  };


  return (
    <div style={{ display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
            {matches ? <div onClick={handleNext} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <KeyboardArrowUpIcon style={{ cursor: 'pointer', border: '1px solid #273c75', borderRadius: 20, padding: 3, width: 70, height: 20 }} />
            </div> : <></>}
            <div style={{ width: '80%',marginLeft:-10 }}>
              <Slider ref={scrollRef} {...settings} style={{ marginTop: '5%', marginBottom: '1%' }}>
                {sliderImages()}
              </Slider>
            </div>
            {matches ? <div onClick={handlePrev} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <KeyboardArrowDownIcon style={{ cursor: 'pointer', border: '1px solid #273c75', borderRadius: 20, padding: 3, width: 70, height: 20 }} />
            </div> : <></>}
          </div>
        </Grid>
        <Grid item xs={8}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>{proImage()}</div>
          
          </div>
        </Grid>
      </Grid>
    </div>
  )
}