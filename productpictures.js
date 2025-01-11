import { userStyle } from "../productpictures/productpicturesCss";
import { useState, useEffect } from "react";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem,FormHelperText,ListItemText } from "@mui/material";
import Swal from "sweetalert2"
import { getData,postData,currentDate } from "../../../services/FetchNodeAdminServices";
import logo from '../../../assets/logo.png'

export default function ProductPicture(props)
{
    const classes = userStyle();

    const [categoryid, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [brandId, setbrandId] = useState('');
    const [productId, setproductId] = useState('');
    const [productdetailId, setproductdetailId] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [brandList,setbrandList] = useState([]);
    const [productList,setproductList] = useState([]);
    const [productdetailList,setproductdetailList] = useState([]);
    const [picture, setPicture]= useState({ bytes:[] })
    
        const showThumbnails=()=>{
            return picture?.bytes?.map((item)=>{
             return(<div style={{margin:2,width:30, height:30,borderRadius:5}}><img src={URL.createObjectURL(item)}  style={{width:30,height:30}} /></div>)
        
            })
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
        
    };
    const fetchallproduct = async (brandid) => {
        const body = { brandid: brandid };
        const result = await postData('productdetail/get_all_product_by_categoryid', body);
        setproductList(result.data);
        
    };
    const fetchallproductdetail = async (productid) => {
        const body = { productid: productid };
        const result = await postData('productpicture/get_all_productdetail_by_productid', body);
        setproductdetailList(result.data);
        
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
        fetchallproductdetail(productid)
    }
    const handleProductDetailChange=(productdetailId)=>
    {
        setproductdetailId(productdetailId)
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
    const fillProductDetail = () => {
        return productdetailList.map((item) => (
            <MenuItem key={item.productdetailid} value={item.productdetailid}>
                {item.productdetailname}
            </MenuItem>
        ));
    };
    const handleImage = (e) => {
        console.log("xxxxxxxxxxxxxxxxxx",e.target.files) 
        setPicture({ bytes: Object.values(e.target.files), filename: URL.createObjectURL(e.target.files[0]) })
    }
    const resetValue=()=>{
        setCategoryId('')
        setSubcategoryId('')
        setbrandId('')
        setproductId('')
        setproductdetailId('')
        
    }

    const handleSubmit=async()=>{
            {
        
       var formData= new FormData()
       formData.append('categoryid',categoryid)
       formData.append('subcategoryid',subcategoryId)
       formData.append('brandid',brandId)
       formData.append('productid',productId)
       formData.append('productdetailid',productdetailId)
       picture?.bytes?.map((item,i)=>{
        formData.append('picture'+i,item)
      })
     

       
     
       
       var result=await postData('productpicture/product_picture_submit',formData)
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
                          Product Picture
                       </div>
                  </div>
                   </Grid>
                    <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryid}
                                    label="Category Name"
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                     >
                                     
                                    {fillCategory()}
                                    
                                </Select>
                                
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Sub-Category</InputLabel>
                                <Select
                                    value={subcategoryId}
                                    label="Sub-Category"
                                    onChange={(e)=> handleSubcategoryChange(e.target.value)}
                                    
                                >
                                 {fillSubcategory()}
                                </Select>
                                  
                            </FormControl>
                        </Grid> 
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    value={brandId}
                                    label="brand"
                                    onChange={(e)=> handleBrandChange(e.target.value)}
                                    
                                    >
                                   {fillbrand()}  
                                </Select>
                                     
                            </FormControl>
                        </Grid> 
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel>Product</InputLabel>
                                <Select
                                    value={productId}
                                    label="Product"
                                    onChange={(e)=> handleProductChange(e.target.value)}
                                    
                                    >
                                 {fillProduct()}    
                                </Select>
                                         
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Product Detail</InputLabel>
                                <Select
                                    value={productdetailId}
                                    label="Product"
                                    onChange={(e)=> handleProductDetailChange(e.target.value)}
                                    
                                    >
                                 {fillProductDetail()}    
                                </Select>
                                         
                            </FormControl>
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
                        <div style={{display:'flex'}}>
                          {showThumbnails()}
                        </div>                          
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