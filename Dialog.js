import { Paper,Divider, Button } from "@mui/material";







export default function DialogBox(){

    var data=[{
        productdetailname: "Maaza Soft Drink",
        weight: 250,
        weighttype: "gm",
        packagingtype: "1",
        noofqty: "1",
        stock: 5,
        price: 99,
        offerprice: 80,
        offertype: "Festival",
        productstatus: "Trending",
        picture:['thumbs 1.webp','thumbs 2.webp','thumbs 3.webp','thumbs 4.webp','thumbs 5.webp']
      },
      {
      productdetailname: "Thumbs Up Soft Drink",
      weight: 250,
      weighttype: "gm",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 99,
      offerprice: 80,
      offertype: "Festival",
      productstatus: "Trending",
      picture:['thumbs 1.webp','thumbs 2.webp','thumbs 3.webp','thumbs 4.webp','thumbs 5.webp']
    }]

   const CartItems=()=>{
    return data.map((item,index)=>{
        return(<div>


            <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{fontWeight: 500,fontSize: 13.5,letterSpacing: -0.07,lineHeight: 1.4285714286,color: 'rgba(0, 0, 0, .65)',overflow: "hidden",textOverflow: 'ellipsis',display:"-webkit-box",webkitLineClamp: "1",webkitBoxOrient: "vertical",marginTop:5}}>
               {item.productdetailname} {item.weight} {item.weighttype}
            </div>
            <div style={{fontWeight: 500,fontSize: 13.5,letterSpacing: -0.07,lineHeight: 1.4285714286,color: 'rgba(0, 0, 0, .65)',overflow: "hidden",textOverflow: 'ellipsis',display:"-webkit-box",webkitLineClamp: "1",webkitBoxOrient: "vertical",marginTop:5}}>
            &#8377;{item.offerprice} * 1
            </div> 
            </div>
            {index < data.length - 1 && (
            <Divider  style={{width:'100%',marginTop:5,marginBottom:5}}/>
          )}


        </div>)
    })
   }
    
    return(
        <div>
       <div style={{display:'flex',alignItems:'center',justifySelf:'right',marginRight:20}}>
        <Paper style={{width:450,height:'auto',padding:10,borderRadius:20}}>
        <div style={{padding:10}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:15,letterSpacing:-0.72,lineHeight: 1}}>
                Cart Items
            </div>
            <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:15,letterSpacing:-0.72,lineHeight: 1,color:'rgba(0, 0, 0, .65)'}}>
               {data.length} Item(s)
            </div>
            </div>
            <div style={{marginTop:40}}>
                <div>
                 {CartItems()}
                </div>
                <Divider style={{marginBottom:10,width:'100%',marginTop:5}}/>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:800,fontSize:15,letterSpacing:0.15,lineHeight: 1,color:'rgba(0, 0, 0, .65)'}}>
                     Total amount to be paid
                    </div>
                    <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:15,letterSpacing:0.10,lineHeight: 1}}>
                    &#8377;180.00  
                    </div>    
                </div>
                <div style={{color:'#00b259',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:600,fontSize:14.5,letterSpacing:0.10,lineHeight: 1.4285714286,marginLeft:'70%',marginTop:7}}>
                 You Saved &#8377; 20.00
               </div>  
            </div>
            <div>
            <Button style={{borderRadius:25,height:53,marginTop:10,color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286}} fullWidth>Proceed To Cart</Button>
            </div>
        </div>
        </Paper>
       </div>
        </div>
    )
}