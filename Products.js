import { userStyle } from "../products/ProductCss";
import { useState, useEffect } from "react";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem,FormHelperText } from "@mui/material";
import Swal from "sweetalert2"
import proicon from "../../../assets/proicon.png"
import logo from '../../../assets/logo.png'
import { getData,postData } from "../../../services/FetchNodeAdminServices";


export default function Products(props)
{
    const classes = userStyle();

    const [categoryid, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [brandId, setbrandId] = useState('');
    const [productname, setproductName]= useState('');
    const [productdescription, setProductDescription]= useState('');
    const [picture, setPicture]= useState({ bytes: '', filename: proicon })
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [brandList,setbrandList] = useState([]);
    const [errorMessages,setErrorMessages]=useState({})

    
    const handleErrorMessages=(label,message)=>{
        var msg=errorMessages
        msg[label]=message
        setErrorMessages((prev)=>({...prev,...msg}))
        }

    const validateData=()=>{
     var err=false

     if(categoryid.length==0)
     {
        err=true
        handleErrorMessages('categoryid','Select Category!')
     }
     if(subcategoryId.length==0)
     {
        err=true
        handleErrorMessages('subcategoryid','Select Sub-Category!')
     }
     if(brandId.length==0)
     {
        err=true
        handleErrorMessages('brandid','Select Brand!')
     }

     if(productname.length==0)
     {
      err=true
      handleErrorMessages('productname','Enter Product Name!')
     }
     if(productdescription.length==0)
     {
        err=true
        handleErrorMessages('productdescription','Enter Description!')
     }
     
     if(picture.bytes.length==0)
     {
        err=true
      handleErrorMessages('picture','Select Icon!')
     }

     return err

    }    

    const handleImage = (e) => {
        
        setPicture({ bytes: e.target.files[0], filename: URL.createObjectURL(e.target.files[0]) })
    }

    const handleSubmit=async()=>{
        var err=validateData()
        if(err==false)
            {
        
       var formData= new FormData()
       formData.append('categoryid',categoryid)
       formData.append('subcategoryid',subcategoryId)
       formData.append('brandid',brandId)
       formData.append('productname',productname)
       formData.append('productdescription',productdescription)
       formData.append('picture',picture.bytes)
       
       var result=await postData('product/product_submit',formData)
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

    const resetValue=()=>{
        setCategoryId('')
        setSubcategoryId('')
        setbrandId('')
        setproductName('')
        setProductDescription('')
        setPicture({bytes:'',filename:proicon})
      
      }
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
        console.log('body:', body)
        console.log('data:', result.data)
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


   return(
    <div>
        <div className={classes.root}>
                <div className={classes.box}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                   <div className={classes.mainHeadingStyle}>
                       <img src={logo} className={classes.imageStyle} />
                       <div className={classes.headingStyle}>
                          Products Register
                       </div>
                  </div>
                   </Grid>
                    <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryid}
                                    label="Category Name"
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    onFocus={() => handleErrorMessages('categoryid', null)} 
                                    error={errorMessages?.categoryid}
                                     >
                                    
                                    {fillCategory()} 
                                </Select>
                                <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.categoryid}</div></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    value={brandId}
                                    label="brand"
                                    onChange={(e)=> handleBrandChange(e.target.value)}
                                    onFocus={()=>handleErrorMessages('brandid',null)}
                                    error={errorMessages?.brandid}
                                >
                                 {fillbrand()}    
                                </Select>
                                <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.brandid}</div></FormHelperText> 
                            </FormControl>
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                value={productname}
                                onChange={(e) => setproductName(e.target.value)}
                                onFocus={()=>handleErrorMessages('productname',null)} 
                                error={errorMessages?.productname} 
                                helperText={errorMessages?.productname}
                            />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Description"
                                value={productdescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                onFocus={()=>handleErrorMessages('productdescription',null)} 
                                error={errorMessages?.productdescription} 
                                helperText={errorMessages?.productdescription}
                            />
                        </Grid>  
                        <Grid item xs={6} className={classes.center}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Button variant="contained" component='label'>
                                    Upload
                                    <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                                </Button>
                                
                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Avatar src={picture.filename} variant="rounded" />
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button variant="contained" fullWidth onClick={handleSubmit} >Submit</Button>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button fullWidth variant="contained" onClick={resetValue} >Reset</Button>
                        </Grid>
                            













                    </Grid>
                </div>
        </div>
    </div>
 )
}