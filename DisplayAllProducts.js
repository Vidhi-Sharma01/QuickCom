import { userStyle } from "./ProductCss"
import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { Dialog,DialogContent,DialogActions,IconButton } from "@mui/material";
import {Grid,TextField,Button,Avatar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getData,serverURL,postData,currentDate,createDate } from "../../../services/FetchNodeAdminServices";
import proicon from "../../../assets/proicon.png"
import {MenuItem,FormControl,InputLabel,Select} from "@mui/material";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";



export default function DisplayAllProducts()
{   const classes=userStyle()
    var navigate=useNavigate();
 
    
    const [productname , setproductName]= useState('')
    const [productList, setproductList]= useState([])
    const [productdescription , setProductDescription]= useState('')
    const [open,setOpen]=useState(false)
    const [subcategoryId , setSubcategoryId]= useState('')
    const [brandId , setbrandId]= useState('')
    const [productid , setproductid]= useState('')
    const [picture, setPicture]= useState({ bytes: '', filename: proicon })
    const [categoryid, setCategoryId] = useState('');
    const [brandList,setbrandList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [hideUploadButton,setHideUploadButton]=useState(false);
    const [oldImage,setOldImage]=useState('')


    const handleCancelIcon=()=>{
        setPicture({bytes:'',filename:oldImage})
        setHideUploadButton(false)
        }
    const handleOpenDialog=(rowData)=>
    {

        setCategoryId(rowData.categoryid)
        fetchAllSubCategory(rowData.categoryid)
        setSubcategoryId(rowData.subcategoryid)
        fetchallbrand(rowData.subcategoryid)
        setbrandId(rowData.brandid)
       setproductid(rowData.productid)
       setproductName(rowData.productname)
       setProductDescription(rowData.productdescription)
       setPicture({bytes:'',filename:`${serverURL}/images/${rowData.picture}`})
       setOldImage(`${serverURL}/images/${rowData.picture}`)
       setOpen(true)
    }
    const handleCloseDialog=()=>{
        setOpen(false)
     }

     const handleEditData=async()=>{
     
        var body={'categoryid':categoryid,'subcategoryid':subcategoryId,
         'brandid':brandId,'productname':productname,'productdescription':productdescription,productid:productid}
        
        var result=await postData('product/edit_product_data',body)
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
        fetchAllproducts()
        }

        const handleEditIcon=async()=>{
   
        
            var formData=new FormData()
            formData.append('picture',picture.bytes)
            formData.append('productid',productid)
            
            var result=await postData('product/edit_product_icon',formData)
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
           
            fetchAllproducts()
            setOpen(false)
            }
        
  

    const fetchAllproducts=async()=>{

        var result=await getData('product/display_products')
        if(result.status)
        {
         setproductList(result.data)
        }
        else
        {
           alert(result.message)
        }}
    useEffect(function(){
       fetchAllproducts()
    },[])

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

    const handleImage=(e)=>{
        
        setHideUploadButton(true)
      setPicture({bytes:e.target.files[0],filename:URL.createObjectURL(e.target.files[0])})
      }
      const showSaveCancelButton=()=>{
        return(<div>
          <Button onClick={handleEditIcon} >Save</Button>
          <Button onClick={handleCancelIcon}>Cancel</Button>
        </div>)
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
          
           var body={'productid':productid}
            
            var result=await postData('product/delete_product',body)
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
           
            fetchAllproducts()
         }
        
        }



    const ProductForm=()=>{
        return(
            <div>
             
             <Grid container spacing={2}>
                    <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                value={productname}
                                onChange={(e) => setproductName(e.target.value)}
                                
                            />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Description"
                                value={productdescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                
                            />
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
                            <Button variant="contained" fullWidth onClick={handleEditData} >Update</Button>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Button fullWidth variant="contained" onClick={handleDeleteData} >Delete</Button>
                        </Grid>
                    </Grid>

            </div>
        )
    }


    const showProductDialog=(rowData)=>{
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
           {ProductForm()}
           </DialogContent>
           
         </Dialog>
        </div>)
       
       }

    function ProductTable() {
        return (
            <div  className={classes.root}>
           <div className={classes.displayBox}>
          <MaterialTable
            title="Product List"
            columns={[
              { title: 'Category', field: 'categoryname' },
              { title: 'Sub-Category', field: 'subcategoryname' },
              { title: 'Brand', field: 'brandname' },
              { title: 'Product', field: 'productname' },
              { title: 'Description', field: 'productdescription' },
              { title: 'Icon',  render:(rowData)=><div><img src={`${serverURL}/images/${rowData.picture}`}  style={{width:60,height:60,borderRadius:6}}/></div> },
            ]}
            data={productList} 
            options={{
                pageSize: 3,
                pageSizeOptions: [3,5,7,{value: productList.length, label: 'All'}]
              }}       
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Product',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/products')
              }
            ]}
          />
          </div>
          </div>
        )
      }








    return(
        <div>
     {ProductTable()}
     {showProductDialog()}
        </div>
    )
}