import { postData, serverURL } from "../../../services/FetchNodeAdminServices";
import React, { useEffect } from "react";
import { Divider } from "@mui/material";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
import parse from 'html-react-parser'





export default function ProductDescription({ product,setProduct }) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [productList, setProductList] = useState([])
  const [productDetailid,setProductDetailId]=useState(product.productdetailid)

  const FetchallProductsbybrandId = async () => {
    var response = await postData('userinterface/user_display_product_detail_by_brandid', { brandid: product?.brandid })
    setProductList(response.data)
  }
  useEffect(() => {
    FetchallProductsbybrandId(product.brandid)
  }, [product.brandid])

  const handleSelectedProductSize=(item)=>{
    setProductDetailId(item.productdetailid)
    setProduct(item)
  }

  const size = () => {
    
    return productList.map((item) => {
      var op = parseInt(((item.price - item.offerprice) / item.price) * 100)
      return (
        <div onClick={()=>handleSelectedProductSize(item)}>
          <div style={{ cursor: 'pointer', marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 60,border:item.productdetailid==productDetailid?`2px solid #4cd137`:`1px solid #0078ad`, fontSize: 16, fontWeight: 'bold', borderRadius: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '55px' }} >
                <div style={{ marginRight: '18px' }} >
                  <Radio size="small" style={{ marginLeft: matches ? 10 : 45 }} />

                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 15 }}>
                  {matches ? <img src={`${serverURL}/images/${item.picture}`} style={{ width: '10%', height: '55%', marginTop: 5 }} /> : <></>}
                  <div style={{ marginLeft: matches ? '15px' : '1px', marginTop: matches ? 1 : 5 }}>{item.weight} {item.weighttype}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414', marginLeft: matches ? 25 : 40 }}>
                    &#8377;{item.offerprice}&nbsp;<div style={{ color: '#b5b5b5', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: -0.07, lineHeight: 1.4285714286 }}><s>&#8377;{item.price}</s></div>
                  </div>
                  <div>
                    <span style={{ marginLeft: '20px', width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 2, background: '#e5f7ee', color: '#03753c' }}>{op}% OFF </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }


  const productDescription = () => {

    var op = parseInt(((product.price - product.offerprice) / product.price) * 100)
    return (<div>

      <div style={{
        fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: -0.08, lineHeight: 1.5,
        display: 'inline-flex', alignproducts: 'center', color: '#0c5273', textDecoration: 'none'
      }}>
        {product.productdetailname}
      </div>
      <div style={{ fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: -0.09, lineHeight: 1.3333333333, marginTop: 15 }}>
        {product.productdetailname}&nbsp;{product.weight} {product.weighttype}
      </div>
      <div style={{ display: 'flex', alignproducts: 'center', justifyContent: 'center' }}>
        {matches ? <div style={{ marginLeft: -250 }}>
          <Rating name="read-only" value={4} readOnly />
        </div> : <></>}
        <div style={{ marginLeft: 200, display: 'flex' }}>
          <div>
            <ShareIcon />
          </div>
          <div style={{ marginLeft: 5 }} >
            <FavoriteBorderIcon />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignproducts: 'center', fontFamily: 'JioType, helvetica, arial, sans-serif', letterSpacing: -0.72, lineHeight: 1 }}>
        <div style={{ fontWeight: 900, fontSize: 24 }}>&#8377;{product.offerprice}</div>
        <div style={{ marginLeft: 10, width: '18%', display: 'flex', justifyContent: 'center', alignproducts: 'center', borderRadius: 2, background: '#e5f7ee', color: '#03753c', fontWeight: 700, height: '25%' }}>{op}% OFF</div>
      </div>
      <div style={{ fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 500, marginBottom: 20, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, marginTop: 10 }}>M.R.P: <s>&#8377;{product.price}</s> (Incl. of all taxes)</div>
      <Divider />
      <div style={{ fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: -0.72, lineHeight: 1, marginTop: 15 }}>
        Packsize
      </div>
      <div>
        <div style={{ cursor: 'pointer', marginTop: 20, display: 'flex', justifyContent: 'center', alignproducts: 'center', width: '100%', height: 60, border: '0.7px solid #0078ad', fontSize: 16, fontWeight: 'bold', borderRadius: 20 }}>
          <div>
            <div style={{ display: 'flex', alignproducts: 'center', marginRight: '55px' }} >
              <div style={{ marginRight: '30px' }} >
                <Radio size="small" style={{ marginTop: 10, marginLeft: matches ? 10 : 45 }} />
              </div>
              <div style={{ display: 'flex', alignproducts: 'center' }}>
                {matches ? <img src={`${serverURL}/images/${product.picture}`} style={{ width: '10%', height: '55%', marginTop: 15 }} /> : <></>}
                <div style={{ marginLeft: matches ? '15px' : '1px', marginTop: matches ? 16 : 5 }}>Pack of 1</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignproducts: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 5 }}>
                <div style={{ display: 'flex', alignproducts: 'center', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414', marginLeft: matches ? 25 : 40 }}>
                  &#8377;{product.offerprice}&nbsp;<div style={{ color: '#b5b5b5', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: -0.07, lineHeight: 1.4285714286 }}><s>&#8377;{product.price}</s></div>
                </div>
                <div>
                  <span style={{ marginLeft: '20px', width: 80, display: 'flex', justifyContent: 'center', alignproducts: 'center', borderRadius: 2, background: '#e5f7ee', color: '#03753c' }}>{op}% OFF </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider style={{ marginTop: '10px' }} />
      </div>
      <div style={{ fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: -0.72, lineHeight: 1, marginTop: 15 }}>
        Size
      </div>
      {size()}

      <Divider style={{ marginTop: '20px' }} />
      <div>
        {parse(product.productdescription)}
      </div>
      <Divider style={{ marginTop: '20px' }} />
    </div>
    )

  }



  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {productDescription()}
        </Grid>
      </Grid>

    </div>
  )
}