import { userStyle } from "./BrandCss";
import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { Dialog,DialogActions,DialogContent,IconButton } from "@mui/material";
import {Grid,TextField,Button,Avatar} from "@mui/material";
import Swal from "sweetalert2"
import CloseIcon from '@mui/icons-material/Close';
import { getData,createDate,serverURL,postData,currentDate } from "../../../services/FetchNodeAdminServices";
import {MenuItem,FormControl,InputLabel,Select} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllBrands(props){
    const classes=userStyle()
    var navigate=useNavigate();

    const [brandList,setbrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subcategoryList,setSubcategoryList]=useState([])
    const [open,setOpen]=useState(false)
    const [categoryid,setCategoryId]=useState('')
    const [subcategoryid,setSubcategoryId]=useState('')
    const [brandName,setbrandname]=useState('')
    const [brandIcon,setBrandIcon]=useState('')
    const [hideUploadButton,setHideUploadButton]=useState(false)
    const [oldImage,setOldImage]=useState('')
    const [brandid,setbrandId]=useState('')
    
    const handleDeleteData=async()=>{
        Swal.fire({
          title: "Do you want to delete this brand?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Delete",
          denyButtonText: `Don't delete`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            
               BrandDelete()
  
          } else if (result.isDenied) {
            Swal.fire("brand not deleted", "", "info");
          }

          setOpen(false)
        });
  
        const  BrandDelete=async()=>{
          
           var body={'brandid':brandid}
            
            var result=await postData('brand/delete_brand',body)
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
           
            FetchAllBrands()
         }
        
        }

    const handleEditIcon=async()=>{
         
        var formData=new FormData()
        formData.append('brandicon',brandIcon.bytes)
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Vidhi')
        formData.append('brandid',brandid)
        
        var result=await postData('brand/edit_brand_icon',formData)
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
       
        FetchAllBrands()
        setOpen(false)
        }


    const handleEditData=async()=>{
       
        var body={'categoryid':categoryid,'subcategoryid':subcategoryid,'brandname':brandName,'updated_at':currentDate(),
         'user_admin':'Vidhi','brandid':brandid}
        
        var result=await postData('brand/edit_brand_data',body)
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
        FetchAllBrands()
        }
  
    const handleImage=(e)=>{
        setHideUploadButton(true)
        
      setBrandIcon({bytes:e.target.files[0],filename:URL.createObjectURL(e.target.files[0])})
      }

    const handleCancelIcon=()=>{
        setBrandIcon({bytes:'',filename:oldImage})
        setHideUploadButton(false)
        }

    const showSaveCancelButton=()=>{
            return(<div>
              <Button onClick={handleEditIcon} >Save</Button>
              <Button onClick={handleCancelIcon}>Cancel</Button>
            </div>)
        }    

    const showBrandDialog=(rowData)=>{
        return(<div>
         <Dialog open={open}>
         <IconButton
             aria-label="close"
             onClick={handleCloseDialog}
             sx={{
               position: 'absolute',
               right: 0,
               top: 0,
               color: (theme) => theme.palette.grey[500],
             }}
           >
             <CloseIcon />
           </IconButton>
     
           <DialogContent>
            {Brandform()}
           </DialogContent>
           
         </Dialog>
        </div>)
       
       }

    const FetchAllBrands=async()=>{

        var result=await getData('brand/display_brands')
        if(result.status)
        {
          setbrandList(result.data)
          
        }
        else
        {
           alert(result.message)
        }}
    useEffect(function(){
       FetchAllBrands()
    },[])

    const handleOpenDialog=(rowData)=>{
        
        setCategoryId(rowData.categoryid)
        fetchAllSubCategory(rowData.categoryid)
        setSubcategoryId(rowData.subcategoryid)
        setbrandId(rowData.brandid)
        setbrandname(rowData.brandname)
        setBrandIcon({bytes:'',filename:`${serverURL}/images/${rowData.brandicon}`})
        setOldImage(`${serverURL}/images/${rowData.brandicon}`)
        setOpen(true)
     }



    /*************Table************/

    function BrandTable() {
        return (
            <div  className={classes.root}>
           <div className={classes.displayBox}>
          <MaterialTable
            title="Brand List"
            columns={[
              { title: 'Admin', field: 'user_admin' },
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Category', field: 'categoryname' },
              { title: 'Sub-Category', field: 'subcategoryname' },
              { title: 'Brand', field: 'brandname' },
              { title: 'Created & Updated',  render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div>},
              { title: 'Icon',  render:(rowData)=><div><img src={`${serverURL}/images/${rowData.brandicon}`}  style={{width:60,height:60,borderRadius:6}}/></div> },
              
            ]}
            data={brandList} 
            
            options={{
                pageSize: 3,
                pageSizeOptions: [3,5,7,{value: brandList.length, label: 'All'}]
              }}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Brand',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/brand')
              }
            ]}
          />
          </div>
          </div>
        )
      }

    /******************************/
    /*****Brand Functions******/

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
        console.log('body:', body)
        console.log('data:', result.data)
    };

    const handleCategoryChange = (cid) => {
        setCategoryId(cid);
        console.log(categoryid)
        fetchAllSubCategory(cid);
    };

    const handleSubcategoryChange = (categoryid) => {
        setSubcategoryId(categoryid)
        console.log(subcategoryid)
        
    }

    const fillCategory = () => {
        return categoryList.map((item) => (
            <MenuItem key={item.categoryid} value={item.categoryid}>
                {item.categoryname}
            </MenuItem>
        ));
    };

    const fillSubcategory = () => {
        return subcategoryList?.map((item) => (
            <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        ));
    };

    const handleCloseDialog=()=>{
        setOpen(false)
     }


    const Brandform=()=>{
        return(
            <div>
              
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Sub-Category</InputLabel>
                                <Select
                                    value={subcategoryid}
                                    label="Sub-Category"
                                    onChange={(e)=> handleSubcategoryChange(e.target.value)}
                                   
                                >
                                    {fillSubcategory()}
                                </Select>
                                
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Brand Name"
                                value={brandName}
                                onChange={(e) => setbrandname(e.target.value)}
                                
                                
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {hideUploadButton?<div>{showSaveCancelButton()}</div>:
                                <Button variant="contained" component='label'>
                                    Upload
                                    <input onChange={handleImage}  hidden type="file" accept="image/*" multiple />
                                </Button>}
                                
                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Avatar src={brandIcon.filename} variant="rounded" />
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


    /**************************/








    return(
        <div>
         {BrandTable()}
         {showBrandDialog()}
        </div>
    )
}
