import { userStyle } from "./ProductDetailsCss";
import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { Dialog,DialogContent,IconButton } from "@mui/material";
import {Grid,TextField,Button,Avatar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import pdicon from "../../../assets/pdicon.png"
import { getData,createDate,serverURL,postData ,currentDate} from "../../../services/FetchNodeAdminServices";
import {MenuItem,FormControl,InputLabel,Select,ListItemText} from "@mui/material";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";


export default function DisplayallProductDetail()
{
    const classes=userStyle()
    var navigate=useNavigate();

    const [productdetailid, setProductDetailid] = useState('');
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
    const [hideUploadButton,setHideUploadButton]=useState(false);
    const [oldImage,setOldImage]=useState('')
    const [open,setOpen]=useState(false)

    const weights= ['Miligram','Mililitre','Litre','Kilogram'];
    const packaging=['Box','Packet','Bottle']
    const status= ['Trending','Popular']
    const offertypes= ['Independence Sale','Diwali Sale','New Year Sale']

    const handleEditData=async()=>{
     
        var body={
         'categoryid':categoryid,
         'subcategoryid':subcategoryId,
         'brandid': brandId,
         'productid': productId,
         'productdetailname': productdname,
         'weight': weight,
         'weighttype': weighttype,
         'packagingtype': packagingtype,
         'noofqty': noofqty, 
         'stock': stock,
         'price': price,
         'offerprice': offerprice,
         'offertype': offertype,
         'productstatus': productstatus,
         'productdescription': productdescription,
          'updated_at': currentDate(),
          'productdetailid':productdetailid}
        
        var result=await postData('productdetail/edit_productd_data',body)
        if(result.status)
        {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast:true
              });
              
           }
           else
           {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast:true
              });
           }
           
      
        setOpen(false)
        fetchAllProductDetail()
        }

        const handleDeleteData=async()=>{
            Swal.fire({
              title: "Do you want to delete this product?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Delete",
              denyButtonText: `Don't delete`
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                
                   ProductDelete()
                   setOpen(false)
      
              } else if (result.isDenied) {
                Swal.fire("Product not deleted", "", "info");
              }
            });
      
            const ProductDelete=async()=>{
              
               var body={'productdetailid':productdetailid}
                
                var result=await postData('productdetail/delete_productd',body)
                if(result.status)
                {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: result.message,
                        showConfirmButton: false,
                        timer: 2000,
                        toast:true
                      });
                      
                   }
                   else
                   {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: result.message,
                        showConfirmButton: false,
                        timer: 2000,
                        toast:true
                      });
                   }
                   
                   setHideUploadButton(false)
               
                fetchAllProductDetail()
             }
            
            }
    

    const handleImage=(e)=>{
        
        setHideUploadButton(true)
        
      setPicture({bytes:e.target.files[0],filename:URL.createObjectURL(e.target.files[0])})
      }
      const showSaveCancelButton=()=>{
        return(<div>
          <Button onClick={handleEditIcon} >Save</Button>
          <Button onClick={handleCancelIcon} >Cancel</Button>
        </div>)
      }
      const handleCancelIcon=()=>{
        setPicture({bytes:'',filename:oldImage})
        setHideUploadButton(false)
        }
        const handleEditIcon=async()=>{
   
        
            var formData=new FormData()
            formData.append('picture',picture.bytes)
            formData.append('productdetailid',productdetailid)
            
            var result=await postData('productdetail/edit_productd_icon',formData)
            if(result.status)
            {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast:true
                  });
                  
               }
               else
               {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast:true
                  });
               }
               
               setHideUploadButton(false)
           
            fetchAllProductDetail()
            setOpen(false)
            }
    

    const handleOpenDialog=(rowData)=>
    {

        setProductDetailid(rowData.productdetailid)
        setCategoryId(rowData.categoryid)
        fetchAllSubCategory(rowData.categoryid)
        setSubcategoryId(rowData.subcategoryid)
        fetchallbrand(rowData.subcategoryid)
        setbrandId(rowData.brandid)
        fetchallproduct(rowData.brandid)
       setproductId(rowData.productid)
       setproductdName(rowData.productname)
       setProductDescription(rowData.productdescription)
       setWeight(rowData.weight)
       setWeightType(rowData.weighttype)
       setPackagingType(rowData.packagingtype)
       setProductstatus(rowData.productstatus)
       setNoofqty(rowData.noofqty)
       setStock(rowData.stock)
       setPrice(rowData.price)
       setOfferPrice(rowData.offerprice)
       setOfferType(rowData.offertype)
       setPicture({bytes:'',filename:`${serverURL}/images/${rowData.picture}`})
       setOldImage(`${serverURL}/images/${rowData.picture}`)
       setOpen(true)
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
    const fetchAllProductDetail=async()=>{

        var result=await getData('productdetail/display_product_detail')
        if(result.status)
        {
          setproductList(result.data)
        }
        else
        {
           alert(result.message)
        }}
    useEffect(function(){
       fetchAllProductDetail()
    },[])
    const handleCloseDialog=()=>{
        setOpen(false)
     }

    const showProductDetailDialog=(rowData)=>{
        return(<div>
         <Dialog open={open}>
         <IconButton
             aria-label="close"
             onClick={handleCloseDialog}
             sx={{
               position: 'absolute',
               right: 1,
               top: 1,
               color: (theme) => theme.palette.grey[500],
             }}
           >
             <CloseIcon />
           </IconButton>
     
           <DialogContent>
           {DetailForm()}
           </DialogContent>
           
         </Dialog>
        </div>)
       
       }


    /**********Detail Form**********/

    const DetailForm=()=>
    {
        return(
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
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
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
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
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                value={productdname}
                                onChange={(e) => setproductdName(e.target.value)}
                                
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label="Weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                
                            />
                        </Grid>
                           
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                           <InputLabel >Weight Type</InputLabel>
                               <Select  
                                value={weighttype}
                                label="Weight Type"
                                onChange={(e) => setWeightType(e.target.value)}     
                                  >
                                {weights.map((weights) => (
                                <MenuItem key={weights} value={weights}>
              
                                <ListItemText primary={weights} />
                                </MenuItem>
                                ))}
                                 </Select>
                               </FormControl>
                        </Grid>  
                        <Grid item xs={4}>
                        <FormControl fullWidth>
                           <InputLabel >Packaging Type</InputLabel>
                               <Select  
                                value={packagingtype}
                                label="Packaging Type"
                                onChange={(e) => setPackagingType(e.target.value)}     
                                  >
                                {packaging.map((packaging) => (
                               <MenuItem key={packaging} value={packaging}>
              
                               <ListItemText primary={packaging} />
                               </MenuItem>
                                ))}
                                 </Select>
                               </FormControl>
                        </Grid> 
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                value={noofqty}
                                onChange={(e) => setNoofqty(e.target.value)}
                                
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Product Description"
                                value={productdescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl fullWidth>
                           <InputLabel >Product Status</InputLabel>
                               <Select  
                                value={productstatus}
                                label="Product Status"
                                onChange={(e) => setProductstatus(e.target.value)}     
                                  >
                                {status.map((status) => (
                               <MenuItem key={status} value={status}>
              
                               <ListItemText primary={status} />
                               </MenuItem>
                                ))}
                                
                               
                                 </Select>
                               </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Grid> 
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Offer Price"
                                value={offerprice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                            />
                        </Grid> 
                        <Grid item xs={4}>
                        <FormControl fullWidth>
                           <InputLabel >Offer Type</InputLabel>
                               <Select  
                                value={offertype}
                                label="Offer Type"
                                onChange={(e) => setOfferType(e.target.value)}     
                                  >
                                {offertypes.map((offertypes) => (
                               <MenuItem key={offertypes} value={offertypes}>
              
                               <ListItemText primary={offertypes} />
                               </MenuItem>
                                ))}
                               
                                 </Select>
                               </FormControl>
                        </Grid>




                        <Grid item xs={6} className={classes.center}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {hideUploadButton?<div>{showSaveCancelButton()}</div>:
                                <Button variant="contained" component='label'>
                                    Upload
                                    <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                                </Button>}
                                
                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Avatar src={picture.filename} variant="rounded" />
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button variant="contained" fullWidth onClick={handleEditData}>Update</Button>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button fullWidth variant="contained" onClick={handleDeleteData}>Delete</Button>
                        </Grid>
                            













                    </Grid>
            </div>
        )
    }


    /*******************************/

    /***********Table*********/
    function ProductDetailsTable() {
        return (
            <div  className={classes.root}>
              <div className={classes.displayBox}>
          <MaterialTable
            title="Product Detail List"
            columns={[
              { title: 'Product Detail Id', field: 'productdetailid' },
              { title: 'Category, Subcategory, Brand , Product', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div><div>{rowData.brandname}</div><div>{rowData.productname}</div></div> },
              { title: 'Product Name & Details, Product Status', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.productdetailname}</div><div>{rowData.productstatus}</div></div> },
              { title: 'weight & packaging', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.weight} {rowData.weighttype}</div><div>{rowData.packagingtype}</div></div>},
              { title: 'Price & OfferPrice', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div><s>Rs:{rowData.price}</s></div><div>Rs:{rowData.offerprice}</div></div> },
              { title: 'Description & created&updated at', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.productdescription}</div><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div>},
              {title:'qty,Stock,offertype', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.noofqty}</div><div>{rowData.stock}</div><div>{rowData.offertype}</div></div>},
              {title:'Picture', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.picture}`}  style={{width:60,height:60,borderRadius:6}}/></div>}
            ]}
            data={productList}   
            
            options={{
                pageSize: 3,
                pageSizeOptions: [3,5,7,{value: productList.length, label: 'All'}]
              }}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Details',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add ProductDetail',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/productdetails')
              }
            ]}
          />
          </div>
        </div>    
        )
      }

    /*************************/




























    return(
        <div>
    {ProductDetailsTable()}
    {showProductDetailDialog()}

        </div>
    )
}