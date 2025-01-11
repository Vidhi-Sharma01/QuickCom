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



export default function AdScroll({data}){

   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.up('md'));
 
    var scrollRef=useRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:1,
        slidesToScroll: 1,
        arrows:false
      };
 //var data=['b1.webp','b2.webp','b3.jpg','b5.webp','b6.webp']

 const showImages=()=>{
    return data.map((item)=>{
     return <div>
        <img src={`${serverURL}/images/${item.filenames}`} style={{width:'97%',borderRadius:20}} />
     </div>

    })
 }
 const handleNext=()=>{
scrollRef.current.slickNext()
 }

 const handlePrev=()=>{
    scrollRef.current.slickPrev()
 } 


return(
<div style={{position:'relative'}}>
    
{matches?<div onClick={handleNext} style={{position:'absolute',zIndex:2,top:'45%',left:'0.8%',background:'#b2bec3',opacity:0.5,width:30,height:30,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:15}}>
<KeyboardArrowLeftIcon  style={{color:'#fff'}}/>
</div>:<></>}

<Slider ref={scrollRef} {...settings}>
{showImages()}
</Slider>

{matches?<div onClick={handlePrev} style={{position:'absolute',zIndex:2,top:'45%',right:'4%',background:'#b2bec3',opacity:0.5,width:30,height:30,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:15}}>
<KeyboardArrowRightIcon  style={{color:'#fff'}}/>
</div>:<></>}


</div>)
}