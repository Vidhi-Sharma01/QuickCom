import AdScroll from './AdScroll'
import Footer from './Footer'
import Header from './Header'
import OfferScroll from './OfferScroll'
import ProductsScroll from './ProductsScroll'
import { getData, postData } from '../../../services/FetchNodeAdminServices'
import { useState,useEffect } from 'react'
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
export default function HomePage()
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const[banners,setBanners]=useState([])
    const[bankoffer,setBankOffer]=useState([])
    const[adoffer,setAdoffer]=useState([])
    const[trendingProducts,setTrendingProducts]=useState([])
    const[refresh,setRefresh]=useState(false)
    

    const fetchAllBanners=async()=>{
       var result=await getData('userinterface/user_show_all_mainbanner')
       setBanners(result.data)
    }
    const fetchAllProductDetails=async(productstatus)=>{
        var result=await postData('userinterface/user_display_product_detail_by_status',{productstatus})
        setTrendingProducts(result.data)
        
     }
    const fetchAllAdoffer=async()=>{
        var result=await getData('userinterface/user_show_all_adoffer')
        setAdoffer(result.data)
     }
     
    const fetchAllBankoffer=async()=>{
        var result=await getData('userinterface/user_show_all_bankoffer')
        setBankOffer(result.data)
     }
    useEffect(function(){
        fetchAllBanners()
        fetchAllBankoffer()
        fetchAllAdoffer()
        fetchAllProductDetails('Trending')
    },[])

    return(<div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>

        <div>
        <Header />
        </div>

        <div style={{width:'82%',alignSelf:'center',marginTop:35}}>
        <OfferScroll state="offer" data={adoffer}/>
        </div>

        <div style={{width:'82%',alignSelf:'center',marginTop:35}}>
        <OfferScroll state="bank" data={bankoffer}/>
        </div>

        <div style={{width:'82%',alignSelf:'center',marginTop:40}}>
        <ProductsScroll refresh={refresh} setRefresh={setRefresh} title={"Trending"} data={trendingProducts} />
        </div>
        <div style={{width:'82%',alignSelf:'center',marginTop:40}}>
        <ProductsScroll refresh={refresh} setRefresh={setRefresh} title={"Popular"} data={trendingProducts} />
        </div>

        <div style={{width:'82%',alignSelf:'center',marginTop:35}}>
        <AdScroll data={banners}/>
        </div>
        {matches?
        <div style={{width:'85%',alignSelf:'center',marginTop:35}}>
        <Footer/>
        </div>:<></>}
    </div>)
}