import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState,useEffect} from "react"
import { postData,serverURL } from "../../../services/FetchNodeAdminServices";
import { Divider, MenuItem,MenuList } from "@mui/material";
export default function Footer(){

    var data=['Biscuit','Drinks', 'Packaged Food','Fruits and Vegetables','Cooking Essentials','Dairy and Bakery','Personal Care','Beauty','Homecare','Mom & Baby Care','School,Office & Stationery']

    const [categoryList, setCategoryList] = useState([]);

    const popularCategories=()=>{
        return data.map((item)=>{
         return <div>
            <MenuItem><div style={{fontSize:12}}>{item}</div></MenuItem>
         </div>
    
        })
     }
  
    const fetchAllCategory = async () => {
        const result = await postData('userinterface/user_display_all_category',{status:'limit'});
        setCategoryList(result.data);
        
    };
    const showCategoryMenu = () => {
      return categoryList.map((item) => {
          return (<MenuItem><div style={{fontSize:12}}>{item.categoryname}</div></MenuItem>)
    });
    };
    useEffect(() => {
      fetchAllCategory();
    }, []);
    
    return(
      <div>
      <div style={{width:'auto',alignItems:'center',justifyContent:'center',marginLeft:80,height:'auto'}}>
        <div style={{display:'flex'}}>
        <div>
          <Grid2 item xs={2}>
      <MenuList>
    <div style={{fontFamily: 'JioType, helvetica, arial, sans-serif',
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: -0.48,
    lineHeight: 1,
    paddingBottom: 16,
    paddingLeft: 8,
    color: '#141414'}}>All Categories</div>
    <div style={{marginTop:10}}>
    {showCategoryMenu()}
    </div>
      </MenuList>
      </Grid2>
      </div>
      <div>
        <Grid2 item xs={2}>
      <MenuList>
        <div style={{fontFamily: 'JioType, helvetica, arial, sans-serif',
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: -0.48,
    lineHeight: 1,
    paddingBottom: 16,
    paddingLeft: 8,
    color: '#141414'}}>Popular Categories</div>
        <div style={{marginTop:10}}>
        {popularCategories()}
        </div>
      </MenuList>
      </Grid2>
      </div>
      <div>
        <Grid2 item xs={2}>
      <MenuList >
      <div style={{fontFamily: 'JioType, helvetica, arial, sans-serif',
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: -0.48,
    lineHeight: 1,
    paddingBottom: 16,
    paddingLeft: 8,
    color: '#141414'}}>Customer Account</div>
      <div style={{marginTop:10}}>
        <MenuItem><div style={{fontSize:12}}>My Account</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>My Orders</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>Wishlist</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>Delivery Addresses</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>Wallet</div></MenuItem>
        </div>
      </MenuList>
      </Grid2>
      </div>
      <div>
        <Grid2 item xs={2}>
      <MenuList>
        <div style={{fontFamily: 'JioType, helvetica, arial, sans-serif',
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: -0.48,
    lineHeight: 1,
    paddingBottom: 16,
    paddingLeft: 8,
    color: '#141414'}}>Help & Support</div>
        <div style={{marginTop:10}}>
        <MenuItem><div style={{fontSize:12}}>About Us</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>FAQ</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>Terms And Conditions</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>Privacy Policy</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>E-Waste Policy</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>Cancellation & Return Policy</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>Shipping & Delivery Policy</div></MenuItem>
        <MenuItem><div style={{fontSize:12}}>AC installation by resQ</div></MenuItem>
        </div>
      </MenuList>
      </Grid2>
      </div>
      <div>
        <Grid2 item xs={4}>
          <MenuList>
          <div style={{fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 900,fontSize: 18,
    letterSpacing: -0.48,
    lineHeight: 1,
    paddingBottom: 16,
    paddingLeft: 8,
    color: '#141414'}}>Contact Us</div>
    <div style={{marginLeft:12}}>
          <div style={{fontSize:12,marginTop:8}}>
          WhatsApp us: 70003 70003<br></br>
          Call us: 1800 890 1222<br></br>
          8:00 AM to 8:00 PM, 365 days</div><br></br>
            <div style={{fontSize:12,marginTop:2}}>
            Should you encounter any bugs, glitches, lack of functionality, delayed deliveries, billing errors or other problems on the website, please email us on cs@jiomart.com
            </div><br></br>
            </div>
            <div>
            <div style={{fontFamily: 'JioType, helvetica, arial, sans-serif',
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: -0.48,
            lineHeight: 1,
            paddingLeft: 8,
            color: '#141414',
            marginLeft:8,
            marginTop:20}}>
            Download the App:<br></br>
            </div>
            <div style={{alignItems:'center',justifyContent:'center',display:'flex',marginLeft:8}}>
            <img src={`${serverURL}/images/playstore.png`} style={{width:130,height:50}}/>
            <img src={`${serverURL}/images/applestore.png`} style={{width:110,height:100}}/>
            </div>
            
            
            </div>
            
            </MenuList>
        </Grid2>
        </div>
        </div>
        </div>
        <Divider/>
        <div style={{display:'flex',alignItems:'center',marginLeft:60}}>
        <img src={`${serverURL}/images/jio.svg`} style={{width:25,height:25,margin:10}}/>
         <div style={{fontSize:10,marginLeft:5}}>© 2024 All rights reserved. Reliance Retail Ltd.</div>
         <div style={{fontSize:10,marginLeft:'auto',marginRight:30}}>Best viewed on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+, Google Chrome 80+</div>
         </div>




        
        </div>
        
    
  
        
    )
}