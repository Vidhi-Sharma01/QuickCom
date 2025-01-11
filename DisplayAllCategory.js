import { useState,useEffect } from "react";
import { getData,serverURL ,createDate,postData,currentDate} from "../../../services/FetchNodeAdminServices";
import MaterialTable from "@material-table/core";
import { userStyle } from "./CategoryCss";
import { Dialog,DialogContent,IconButton } from "@mui/material";
import {Grid,TextField,Button,Avatar} from "@mui/material";
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import Swal from "sweetalert2"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";


export default function DisplayAllCategory()
{
  var navigate=useNavigate();
  const classes=userStyle()
    const [categoryList,setCategoryList]=useState([])
    const [open,setOpen]=useState(false)
    const [hideUploadButton,setHideUploadButton]=useState(false)
    const [oldImage,setOldImage]=useState('')
    

    /********Category Functions********/

    const [categoryName,setCategoryName]=useState('')
const [categoryIcon,setCategoryIcon]=useState({bytes:'',filename:cart})
const [loadingStatus,setLoadingStatus]=useState(false)
const [errorMessages,setErrorMessages]=useState({})
const [categoryId,setCategoryId]=useState('')

const showSaveCancelButton=()=>{
  return(<div>
    <Button onClick={handleEditIcon}>Save</Button>
    <Button onClick={handleCancelIcon}>Cancel</Button>
  </div>)
}

const handleErrorMessages=(label,message)=>{
  var msg=errorMessages
  msg[label]=message
  setErrorMessages((prev)=>({...prev,...msg}))
  }

 
const handleImage=(e)=>{
  handleErrorMessages('categoryIcon',null) 
setCategoryIcon({bytes:e.target.files[0],filename:URL.createObjectURL(e.target.files[0])})
setHideUploadButton(true)
}

const categoryForm=()=>{
  return(
     <Grid container spacing={2}>
     <Grid item xs={12}>
       <div className={classes.mainHeadingstyle} >
        <img src={logo} className={classes.imageStyle}  />
        
       <div className={classes.headingStyle}>
        Category Register
       </div>
       
       </div>
       </Grid>
       <Grid item xs={12}>
        <TextField onFocus={()=>handleErrorMessages('categoryName',null)} error={errorMessages?.categoryName} helperText={errorMessages?.categoryName}  onChange={(e)=>setCategoryName(e.target.value)} label="Category Name" value={categoryName} fullWidth />
       </Grid>
       <Grid item xs={6}  className={classes.center}>
        <div style={{display:'flex',flexDirection:'column'}}>
        {hideUploadButton?<div>{showSaveCancelButton()}</div>:
        <Button variant="contained" component='label' >Upload
            <input onChange={handleImage}  hidden  type="file"  accept="image/*" multiple/>
              

        </Button>}
        <div className={classes.errorMessageStyle}>{errorMessages?.categoryIcon!=null?errorMessages?.categoryIcon:<></>}</div>
        </div>
       </Grid>
       <Grid item xs={6} className={classes.center}>
        <Avatar src={categoryIcon.filename} style={{width:70,height:70}}  variant="rounded"/>
       </Grid>
       <Grid item xs={6}  className={classes.center}>
       <Button onClick={handleEditData} variant="contained" fullWidth>Update</Button>
      
       </Grid>
       <Grid item xs={6} className={classes.center}>
       <Button  variant="contained" onClick={handleDeleteCategory} fullWidth>Delete</Button>
       </Grid>
        

     </Grid>
    )
 }


    /*********************************/

    const validateData=()=>{
      var err=false
       if(categoryName.length==0)
       {handleErrorMessages('categoryName','Input Category!')
          err=true
      }
      /*if(categoryIcon.bytes.length==0)
         {
          handleErrorMessages('categoryIcon','Select An Icon!')
           err=true
        
  
         }*/
      return err
    }

    const handleEditData=async()=>{
      var err=validateData()
      if(err==false)
      {
      setLoadingStatus(true)
      var body={'categoryname':categoryName,'updated_at':currentDate(),
       'user_admin':'Farzi',categoryid:categoryId}
      
      var result=await postData('category/edit_category_data',body)
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
         
    
      }
      fetchAllCategory()
      }
    

      const handleEditIcon=async()=>{
   
        setLoadingStatus(true)
        var formData=new FormData()
        formData.append('categoryicon',categoryIcon.bytes)
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Farzi')
        formData.append('categoryid',categoryId)
        
        var result=await postData('category/edit_category_icon',formData)
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
       
        fetchAllCategory()
        }
      

    const fetchAllCategory=async()=>{

        var result=await getData('category/display_all_category')
        if(result.status)
        {
   setCategoryList(result.data)
        }
        else
        {
           alert(result.message)
        }}
    useEffect(function(){
       fetchAllCategory()
    },[])

    const handleDeleteCategory=async()=>{
      Swal.fire({
        title: "Do you want to delete the category?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't delete`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          
             categoryDelete()

        } else if (result.isDenied) {
          Swal.fire("Category not deleted", "", "info");
        }
        setOpen(false)
      });

      const categoryDelete=async()=>{
        setLoadingStatus(true)
         var body={'categoryid':categoryId}
          
          var result=await postData('category/delete_category',body)
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
             setLoadingStatus(false)
             setHideUploadButton(false)
         
          fetchAllCategory()
       }
      
      }
    
    const handleOpenDialog=(rowData)=>{
      setCategoryId(rowData.categoryid)
      setCategoryName(rowData.categoryname)
      setCategoryIcon({bytes:'',filename:`${serverURL}/images/${rowData.categoryicon}`})
      setOldImage(`${serverURL}/images/${rowData.categoryicon}`)
       setOpen(true)
    }

    const handleCloseDialog=()=>{
      setOpen(false)
   }

   const handleCancelIcon=()=>{
    setCategoryIcon({bytes:'',filename:oldImage})
    setHideUploadButton(false)
    }
  

    const showCategoryDialog=()=>{
      return(<div>
       <Dialog open={open}>
       <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
  
         <DialogContent>
          {categoryForm()}
         </DialogContent>
         
       </Dialog>
      </div>)
     
     }
 /*********Table**********/  
 
 function categoryTable() {
    return (
      <div  className={classes.root}>
        <div className={classes.displayBox}>
      <MaterialTable
        title="Category List"
        columns={[
          
          { title: 'Category Id', field: 'categoryid' },
          { title: 'User', field: 'user_admin' },
          { title: 'Name', field: 'categoryname' },
          { title: 'Created & Updated',  render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div>},
          
          { title: 'Icon', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.categoryicon}`}  style={{width:60,height:60,borderRadius:6}}/></div>},
        ]}
        data={categoryList}  

        options={{
          pageSize: 3,
          pageSizeOptions: [3,5,7,{value: categoryList.length, label: 'All'}]
        }}
            
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (event, rowData) => handleOpenDialog(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/category')
          }
        ]}
      />
      </div>
      </div>
    )
  }
 




 /************************/




   return(
    <div>
   {categoryTable()}
   {showCategoryDialog()}

    </div>
   )

}