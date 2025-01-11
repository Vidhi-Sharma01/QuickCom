import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRef } from "react";



export default function OfferScroll({state,data}){

   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.up('md'));
 
    var scrollRef=useRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:matches?3:2,
        slidesToScroll: 1,
        arrows:false
      };
 
 const showImages=()=>{
    return data.map((item)=>{
     return <div>
        <img src={`${serverURL}/images/${item.filenames}`} style={{width:'96%',borderRadius:20}} />
     </div>

    })
 }
 const handleNext=()=>{
scrollRef.current.slickNext()
 }

 const handlePrev=()=>{
    scrollRef.current.slickPrev()
 } 


return(<div style={{position:'relative'}}>
    
{matches?<div onClick={handleNext} style={{position:'absolute',zIndex:2,top:'43%',left:'0.8%',background:'#b2bec3',opacity:0.5,width:30,height:30,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:15}}>
<KeyboardArrowLeftIcon  style={{color:'#fff'}}/>
</div>:<></>}

<Slider ref={scrollRef} {...settings}>
{showImages()}
</Slider>

{matches?<div onClick={handlePrev} style={{position:'absolute',zIndex:2,top:'43%',right:'2.8%',background:'#b2bec3',opacity:0.5,width:30,height:30,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:15}}>
<KeyboardArrowRightIcon  style={{color:'#fff'}}/>
</div>:<></>}


</div>)
}