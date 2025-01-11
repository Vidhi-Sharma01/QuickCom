import { serverURL } from "../../../services/FetchNodeAdminServices";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {MenuItem} from "@mui/material";
import { useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PlusMinusButton from '../homepage/PlusMinusButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {useSelector,useDispatch } from "react-redux";









export default function ProductDetailsCategory({productData,refresh,setRefresh}){
  const [selected, setSelected] = useState("");
  var cartData=useSelector((state)=>state.cart)
  var keys=Object.keys(cartData)
  var dispatch=useDispatch()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(
      typeof value === 'string' ? value.split(',') : value,
    );
    
  };

  const handleChangeQty=(value,item)=>{
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
  

  const names = [
    'Popularity',
    'Price: High to Low',
    'Price: Low to High',
    'Discount',
    'All Products'];
   
    const showImages = () => {
        return productData.map((item) => {
            var op=parseInt(((item.price-item.offerprice)/item.price)*100)
          return (
      <div style={{border:'1px solid #ddd',width:270,borderRadius:30,margin:'1%',height:'auto',justifyContent:'center'}}>
      
         <div style={{display:'flex',position:'relative',alignItems:'center',justifyContent:'center'}}>
          <div style={{position:'absolute',zIndex:1,top:'4%',right:'5%',cursor:'pointer'}}><FavoriteBorderIcon/></div>
          <img src={`${serverURL}/images/${item.picture}`} style={{width:'90%',padding:10}}/>
          <div style={{position:'absolute',zIndex:1}}><img src={`${serverURL}/images/veg.png`} style={{width:'6%',marginBottom:-130,marginRight:30}}/></div>
          </div>
          <div>
          <img src={`${serverURL}/images/smart.png`} style={{width:'28%',marginLeft:'5%'}}/>
              <div style={{fontWeight:500,fontSize: 13,letterSpacing: -0.07,lineHeight: 1.428571428,fontFamily:'JioType, helvetica, arial, sans-serif',
                overflow: "hidden",textOverflow: "ellipsis",display: "-webkit-box",ebkitLineClamp: "2",WebkitBoxOrient: "vertical",color:'#57606f',
                    marginLeft:'5%'}}>
                {item.productdetailname} {item.weight} {item.weighttype}
              </div>
              <div>
              &nbsp;
              </div>
            {item.productdetailname.length<=33?<div>&nbsp;</div>:<></>}
                                                                                                                                                                             
          </div>
          <div style={{display:'flex'}}>
               <div style={{fontWeight:750,fontSize: 18,letterSpacing: -0.07,lineHeight: 1.428571428,marginLeft:'5%'}}>
                 <span>&#8377;</span>{item.offerprice}
              </div>
              <div style={{fontWeight:500,fontSize: 14,letterSpacing: -0.07,lineHeight: 1.428571428,color:'grey',marginLeft:'1%'}}>
              <div style={{display:'flex',alignItems:'center',fontSize:12}}> <s><span>&#8377;{item.price}</span></s><span style={{margin:5,marginLeft:3,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:2,background:'#e5f7ee',color:'#03753c'}}>{op}% OFF</span></div>
              </div>
          </div>
          <div>&nbsp;</div>
          <div style={{marginLeft:'3%',marginBottom:'5%'}}>
          <PlusMinusButton qty={keys.includes(item?.productdetailid+"")?cartData[item?.productdetailid].qty:0}  onChange={(value)=>handleChangeQty(value,item)} />
          </div>
        









      
      </div>
            
            
          );
        });
      };
      
    

    return(<div>
      <div style={{marginBottom:10,marginTop:20}}>
      <FormControl sx={{ m: 1, width:200,marginLeft:85 }}>
        <Select displayEmpty value={selected} onChange={handleChange} input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Sort By:</em>;
            }
           return `Sort by:  ${selected.join(', ')}`;
          }}
          style={{borderRadius:35,height:35,fontSize:14}}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}              
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
        <div style={{display:'flex',flexWrap:'wrap'}}>
        {showImages()}
        
        </div>
        </div>
    )
}