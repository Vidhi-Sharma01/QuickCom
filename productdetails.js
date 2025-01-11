import { userStyle } from "../productdetails/ProductDetailsCss";
import { useState, useEffect } from "react";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormControl, InputLabel, Select, MenuItem,FormHelperText,ListItemText } from "@mui/material";
import Swal from "sweetalert2"
import { getData,postData,currentDate } from "../../../services/FetchNodeAdminServices";
import pdicon from "../../../assets/pdicon.png"
import logo from '../../../assets/logo.png'

export default function ProductDetails(props){

    const classes = userStyle();

    const [categoryid, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [brandId, setbrandId] = useState('');
    const [productId, setproductId] = useState('');
    const [productdname, setproductdName]= useState('');
    const [weight, setWeight]= useState('');
    const [weighttype, setWeightType]= useState('');
    const [packagingtype, setPackagingType]= useState('');
    const [productdescription, setProductDescription]= useState('');
    const [noofqty, setNoofqty]= useState('')
    const [stock, setStock]= useState('')
    const [price, setPrice]= useState('')
    const [offerprice, setOfferPrice]= useState('')
    const [offertype, setOfferType]= useState('')
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [brandList,setbrandList] = useState([]);
    const [productList,setproductList] = useState([]);
    const [productstatus,setProductstatus] = useState('');
    const [picture, setPicture]= useState({ bytes: '', filename: pdicon })
    const [errorMessages,setErrorMessages]=useState({})

    const weights= ['Miligram','Mililitre','Litre','Kilogram'];
    const packaging=['Box','Packet','Bottle']
    const status= ['Trending','Popular']
    const offertypes= ['Independence Sale','Diwali Sale','New Year Sale']

    

    

        
    const fetchAllCategory = async () => {
        const result = await getData('category/display_all_category');
        setCategoryList(result.data);
        
    };

    useEffect(() => {
        fetchAllCategory();
    }, []);

    const fetchAllSubCategory = async (categoryid) => {
        const body = { categoryid: categoryid };
        const result = await postData('subcategory/get_all_subcategory_by_categoryid', body);
        setSubcategoryList(result.data);
        
    };

    const fetchallbrand = async (subcategoryid) => {
        const body = { subcategoryid: subcategoryid };
        const result = await postData('brand/get_all_brands_by_categoryid', body);
        setbrandList(result.data);
        console.log('brandb:', body)
        console.log('brand:', result.data)
    };
    const fetchallproduct = async (brandid) => {
        const body = { brandid: brandid };
        const result = await postData('productdetail/get_all_product_by_categoryid', body);
        setproductList(result.data);
        console.log('productb:', body)
        console.log('product:', result.data)
    };


    const handleCategoryChange = (categoryid) => {
        setCategoryId(categoryid);
        fetchAllSubCategory(categoryid);
    };

    const handleSubcategoryChange = (subcategoryid) => {
        setSubcategoryId(subcategoryid)
        fetchallbrand(subcategoryid)
    }

    const handleBrandChange=(brandid)=>
    {
        setbrandId(brandid)
        fetchallproduct(brandid)
    }
    const handleProductChange=(productid)=>
    {
        setproductId(productid)
        
    }

    const fillCategory = () => {
        return categoryList.map((item) => (
            <MenuItem key={item.categoryid} value={item.categoryid}>
                {item.categoryname}
            </MenuItem>
        ));
    };

    const fillSubcategory = () => {
        return subcategoryList.map((item) => (
            <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        ));
    };

    const fillbrand = () => {
        return brandList.map((item) => (
            <MenuItem key={item.brandid} value={item.brandid}>
                {item.brandname}
            </MenuItem>
        ));
    };
    const fillProduct = () => {
        return productList.map((item) => (
            <MenuItem key={item.productid} value={item.productid}>
                {item.productname}
            </MenuItem>
        ));
    };
    const handleImage = (e) => {
        handleErrorMessages('picture',null)
        setPicture({ bytes: e.target.files[0], filename: URL.createObjectURL(e.target.files[0]) })
    }
    const validateData=()=>{
        var err=false
   
        
        if(categoryid.length==0)
        {
           err=true
           handleErrorMessages('categoryid','Select A Category!')
        }
        if(subcategoryId.length==0)
        {
           err=true
           handleErrorMessages('subcategoryid','Select A Sub-Category!')
        }
        if(brandId.length==0)
        {
           err=true
           handleErrorMessages('brandid','Select A Brand!')
        }
        if(productId.length==0)
        {
           err=true
           handleErrorMessages('productid','Select A Product!')
        }
        if(productdname.length==0)
        {
           err=true
           handleErrorMessages('Name','Enter Name!')
        }
        if(weight.length==0)
        {
           err=true
           handleErrorMessages('weight','Enter Weight!')
        }
        if(weighttype.length==0)
        {
           err=true
           handleErrorMessages('weighttype','Select Weight Type!')
        }
        if(packagingtype.length==0)
        {
           err=true
           handleErrorMessages('packagingtype','Select Packaging!')
        }
        if(noofqty.length==0)
        {
           err=true
           handleErrorMessages('noofqty','Enter Quantity!')
        }
        if(stock.length==0)
        {
           err=true
           handleErrorMessages('stock','Enter Stock!')
        }
        if(price.length==0)
        {
           err=true
           handleErrorMessages('price','Enter Price!')
        }
        if(offerprice.length==0)
        {
           err=true
           handleErrorMessages('offerprice','Enter Offerprice!')
        }
        if(offertype.length==0)
        {
           err=true
           handleErrorMessages('offertype','Select Type of Offer!')
        }
        if(productstatus.length==0)
        {
           err=true
           handleErrorMessages('productstatus','Select Status!')
        }
        if(productdescription.length==0)
        {
           err=true
           handleErrorMessages('description','Description!')
        }
        if(picture.bytes.length==0)
        {
           err=true
         handleErrorMessages('picture','Select Icon!')
        }
   
        return err
   
       }    
       const handleErrorMessages=(label,message)=>{
        var msg=errorMessages
        msg[label]=message
        setErrorMessages((prev)=>({...prev,...msg}))
        }
    const resetValue=()=>
    {
        setCategoryId('')
        setSubcategoryId('')
        setbrandId('')
        setproductId('')
        setproductdName('')
        setWeight('')
        setWeightType('')
        setPackagingType('')
        setNoofqty('')
        setStock('')
        setPrice('')
        setOfferPrice('')
        setOfferType('')
        setProductstatus('')
        setProductDescription('')
        setPicture({bytes:'',filename:pdicon})
    }
    const handleSubmit=async()=>{
        var err=validateData()
        if(err==false)
            {
        
       var formData= new FormData()
       formData.append('categoryid',categoryid)
       formData.append('subcategoryid',subcategoryId)
       formData.append('brandid',brandId)
       formData.append('productid',productId)
       formData.append('productdetailname',productdname)
       formData.append('weight',weight)
       formData.append('weighttype',weighttype)
       formData.append('packagingtype',packagingtype)
       formData.append('noofqty',noofqty)
       formData.append('stock',stock)
       formData.append('price',price)
       formData.append('offerprice',offerprice)
       formData.append('offertype',offertype)
       formData.append('productstatus',productstatus)
       formData.append('productdescription',productdescription)
       formData.append('created_at',currentDate())
       formData.append('updated_at',currentDate())
       formData.append('picture',picture.bytes)
       
       var result=await postData('productdetail/productd_submit',formData)
       if(result.status)
       {
        Swal.fire({
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast:true
        });
       }
       else{
        Swal.fire({
            icon: "error",
            title: result.message,
            showConfirmButton: false,
            timer: 5000,
            toast:true
          });
       }
       
       resetValue()
        }}

    





   
   
   
   
    return(
        <div>
    <div className={classes.root}>
                <div className={classes.box}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                   <div className={classes.mainHeadingStyle}>
                       <img src={logo} className={classes.imageStyle} />
                       <div className={classes.headingStyle}>
                          Product Details Register
                       </div>
                  </div>
                   </Grid>
                    <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryid}
                                    label="Category Name"
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    onFocus={() => handleErrorMessages('categoryid', null)} 
                                    error={errorMessages?.categoryid} >
                                     
                                    {fillCategory()}
                                    
                                </Select>
                                <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.categoryid}</div></FormHelperText> 
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Sub-Category</InputLabel>
                                <Select
                                    value={subcategoryId}
                                    label="Sub-Category"
                                    onChange={(e)=> handleSubcategoryChange(e.target.value)}
                                    onFocus={() => handleErrorMessages('subcategoryid', null)} 
                                    error={errorMessages?.subcategoryid}
                                >
                                 {fillSubcategory()}
                                </Select>
                                <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.subcategoryid}</div></FormHelperText>  
                            </FormControl>
                        </Grid> 
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    value={brandId}
                                    label="brand"
                                    onChange={(e)=> handleBrandChange(e.target.value)}
                                    onFocus={() => handleErrorMessages('brandid', null)} 
                                    error={errorMessages?.brandid}
                                    >
                                   {fillbrand()}  
                                </Select>
                                <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.brandid}</div></FormHelperText>     
                            </FormControl>
                        </Grid> 
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Product</InputLabel>
                                <Select
                                    value={productId}
                                    label="Product"
                                    onChange={(e)=> handleProductChange(e.target.value)}
                                    onFocus={() => handleErrorMessages('productid', null)} 
                                    error={errorMessages?.productid}
                                    >
                                 {fillProduct()}    
                                </Select>
                                <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.productid}</div></FormHelperText>         
                            </FormControl>
                        </Grid> 
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                value={productdname}
                                onChange={(e) => setproductdName(e.target.value)}
                                onFocus={()=>handleErrorMessages('Name',null)} 
                                error={errorMessages?.Name} 
                                helperText={errorMessages?.Name}
                                
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label="Weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                onFocus={()=>handleErrorMessages('weight',null)} 
                                error={errorMessages?.weight} 
                                helperText={errorMessages?.weight}
                                
                            />
                        </Grid>
                           
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                           <InputLabel >Weight Type</InputLabel>
                               <Select  
                                value={weighttype}
                                label="Weight Type"
                                onChange={(e) => setWeightType(e.target.value)} 
                                onFocus={() => handleErrorMessages('weighttype', null)} 
                                    error={errorMessages?.weighttype}    
                                  >
                                {weights.map((weights) => (
                                <MenuItem key={weights} value={weights}>
              
                                <ListItemText primary={weights} />
                                </MenuItem>
                                 ))}
                                 </Select>
                                 <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.weighttype}</div></FormHelperText>
                               </FormControl>
                        </Grid>  
                        <Grid item xs={4}>
                        <FormControl fullWidth>
                           <InputLabel >Packaging Type</InputLabel>
                               <Select  
                                value={packagingtype}
                                label="Packaging Type"
                                onChange={(e) => setPackagingType(e.target.value)} 
                                onFocus={() => handleErrorMessages('packagingtype', null)} 
                                    error={errorMessages?.packagingtype}     
                                  >
                                {packaging.map((packaging) => (
                               <MenuItem key={packaging} value={packaging}>
              
                               <ListItemText primary={packaging} />
                               </MenuItem>
                                ))}
                                 </Select>
                                 <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.packagingtype}</div></FormHelperText>
                               </FormControl>
                        </Grid> 
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                value={noofqty}
                                onChange={(e) => setNoofqty(e.target.value)}
                                onFocus={()=>handleErrorMessages('noofqty',null)} 
                                error={errorMessages?.noofqty} 
                                helperText={errorMessages?.noofqty}
                                
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                onFocus={()=>handleErrorMessages('stock',null)} 
                                error={errorMessages?.stock} 
                                helperText={errorMessages?.stock} 
                            />
                        </Grid>
                        
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                           <InputLabel >Product Status</InputLabel>
                               <Select  
                                value={productstatus}
                                label="Product Status"
                                onChange={(e) => setProductstatus(e.target.value)}   
                                onFocus={() => handleErrorMessages('productstatus', null)} 
                                    error={errorMessages?.productstatus}  
                                  >
                                {status.map((status) => (
                               <MenuItem key={status} value={status}>
              
                               <ListItemText primary={status} />
                               </MenuItem>
                                ))}
                                
                               
                                 </Select>
                                 <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.productstatus}</div></FormHelperText> 
                               </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                onFocus={()=>handleErrorMessages('price',null)} 
                                error={errorMessages?.price} 
                                helperText={errorMessages?.price}
                            />
                        </Grid> 
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label="Offer Price"
                                value={offerprice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                onFocus={()=>handleErrorMessages('offerprice',null)} 
                                error={errorMessages?.offerprice} 
                                helperText={errorMessages?.offerprice}
                            />
                        </Grid> 
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                           <InputLabel >Offer Type</InputLabel>
                               <Select  
                                value={offertype}
                                label="Offer Type"
                                onChange={(e) => setOfferType(e.target.value)}
                                onFocus={() => handleErrorMessages('offertype', null)} 
                                    error={errorMessages?.offertype}      
                                  >
                                {offertypes.map((offertypes) => (
                               <MenuItem key={offertypes} value={offertypes}>
              
                               <ListItemText primary={offertypes} />
                               </MenuItem>
                                ))}
                               
                                 </Select>
                                 <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.offertype}</div></FormHelperText>
                               </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                           {/* <TextField
                                fullWidth
                                label="Product Description"
                                value={productdescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                onFocus={()=>handleErrorMessages('description',null)} 
                                error={errorMessages?.description} 
                                helperText={errorMessages?.description}
                                />*/}
                            <ReactQuill
               placeholder="Product Description"
               modules={{
                 toolbar: {
                   container: [
                     [{ header: "1" }, { header: "2" }, { font: [] }],
                     [{ size: [] }],
                     ["bold", "italic", "underline", "strike", "blockquote"],
                     [
                       { list: "ordered" },
                       { list: "bullet" },
                       { indent: "-1" },
                       { indent: "+1" },
                     ],
                     ["link", "image", "video"],
                     ["code-block"],
                     ["clean"],
                   ],
                 },
                 clipboard: {
                   matchVisual: false,
                 },
               }}
               formats={["header","font","size","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","video","code-block"]}
             
             theme="snow" value={productdescription} onChange={setProductDescription} />    
                                </Grid>





                        <Grid item xs={6} className={classes.center}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Button variant="contained" component='label'>
                                    Upload
                                    <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                                </Button>
                                <div className={classes.errorMessageStyle}>{errorMessages?.picture!=null?errorMessages?.picture:<></>}</div>   
                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Avatar src={picture.filename} variant="rounded" />
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button fullWidth variant="contained" onClick={resetValue}>Reset</Button>
                        </Grid>
                            













                    </Grid>
                </div>
        </div>



        </div>
    )
}