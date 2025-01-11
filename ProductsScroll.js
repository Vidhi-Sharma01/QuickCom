import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PlusMinusButton from "./PlusMinusButton";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";





export default function ProductsScroll({title,data,refresh,setRefresh}) {
  
  var scrollRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch=useDispatch()
  const navigate=useNavigate()
  var cartData=useSelector((state)=>state.cart)
  var keys=Object.keys(cartData)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches?6:2,
    slidesToScroll: 1,
    arrows: false,
  };

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

  const handleNavigateProductDetail=(item)=>{
   navigate('/productdetail',{state:{product:item}})
  }
  
  const showImages = () => {
    return data.map((item) => {
        var op=parseInt(((item.price-item.offerprice)/item.price)*100)
      return (
        <div  style={{ display: "flex", flexDirection: "column"}}>
        
        <div style={{ alignSelf:'center' }}>
          <img
            onClick={()=>handleNavigateProductDetail(item)}
            src={`${serverURL}/images/${item.picture}`}
            style={{borderRadius: 10,width:150,height:180,cursor:'pointer' }}
          />
          </div>
          <div>&nbsp;</div>

        
          <div
            style={{
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
              width: "70%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
             
            }}
          >
            {item.productdetailname}
          </div>

          {item.productdetailname.length<=16?<div>&nbsp;</div>:<></>}
          <div   style={{
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
          }}>
            {item.weight} {item.weighttype}
          </div>
          {item.offerprice>0?<div style={{marginTop:7,display:'flex',flexDirection:'column'}}>
          <div   style={{
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
          }}>
             <span>&#8377;</span>{item.offerprice}
          </div>
          <div   style={{
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
                color:'grey'
          }}>
            <div style={{display:'flex',alignItems:'center',fontSize:12}}> <s><span>&#8377;{item.price}</span></s><span style={{margin:5,width:60,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:2,background:'#e5f7ee',color:'#03753c'}}>{op}% OFF</span></div>
          </div>
          
          </div>:<div> <div   style={{
            marginTop:7,
                fontWeight:500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
             
          }}>
             <span>&#8377;</span>{item.price}
             
          </div>
          <div style={{   lineHeight: 1.428571428,}}>&nbsp;</div>      
          </div>}
        
          <div>
            <PlusMinusButton  qty={keys.includes(item?.productdetailid+"")?cartData[item?.productdetailid].qty:0} onChange={(value)=>handleChange(value,item)}/>
          </div>
          </div>
        
        
      );
    });
  };
  const handleNext = () => {
    scrollRef.current.slickNext();
  };

  const handlePrev = () => {
    scrollRef.current.slickPrev();
  };

  return (
    <div>
      <div style={{fontWeight: 900,
    textTransform: 'capitalize',
    fontSize:24,
    letterSpacing:-0.72,
    lineHeight: 1,
    color: '#141414'}}>{title}</div>
    <div style={{ position: "relative",marginTop:10 }}>
      {matches ? (
        <div
          onClick={handleNext}
          style={{
            top: "43%",
            left: "0.3%",
            zIndex: 2,
            position: "absolute",
            background: "#b2bec3",
            opacity: 0.5,
            width: 30,
            height: 30,
            borderRadius: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowLeftIcon style={{ color: "#fff" }} />
        </div>
      ) : (
        <div></div>
      )}

      <Slider ref={scrollRef} {...settings}>
        {showImages()}
      </Slider>

      {matches ? (
        <div
          onClick={handlePrev}
          style={{
            top: "43%",
            right: "2.8%",
            zIndex: 2,
            position: "absolute",
            opacity: 0.5,
            background: "#b2bec3",
            width: 30,
            height: 30,
            borderRadius: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowRightIcon style={{ color: "#fff" }} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
    </div>
  );
}
