import { userStyle } from "../subcategory/SubCategoryCss";
import { useState,useEffect } from "react"; 
import { getData,serverURL,createDate,postData, currentDate } from "../../../services/FetchNodeAdminServices";
import MaterialTable from "@material-table/core";
import subicon from "../../../assets/subicon.png"
import logo from "../../../assets/logo.png"
import { Dialog,DialogActions,DialogContent,IconButton } from "@mui/material";
import {Grid,TextField,Button,Avatar} from "@mui/material";
import Swal from "sweetalert2"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";




export default function DisplayAllSubcategory(){

    const classes=userStyle()
    var navigate=useNavigate();
    const [subcategoryList,setsubcategoryList]=useState([])
    const [open,setOpen]=useState(false)
    const [Subdata,setsubData]=useState([])
    const [hideUploadButton,setHideUploadButton]=useState(false)
    const [oldImage,setOldImage]=useState('')

  
    const handleOpenDialog=(rowData)=>{
      setSubcategoryName(rowData.subcategoryname)
      setsubcategoryId(rowData.subcategoryid)
      setSubcategoryIcon({bytes:'',filename:`${serverURL}/images/${rowData.subcategoryicon}`})
      setsubData(rowData)
      setOldImage(`${serverURL}/images/${rowData.subcategoryicon}`)
      setOpen(true)
   }



   const handleCancelIcon=()=>{
    setSubcategoryIcon({bytes:'',filename:oldImage})
    setHideUploadButton(false)
    }
  

   const showSaveCancelButton=()=>{
    return(<div>
      <Button onClick={handleEditIcon} >Save</Button>
      <Button onClick={handleCancelIcon}>Cancel</Button>
    </div>)
  }
  

   const handleCloseDialog=()=>{
     setOpen(false)
  }

   const showSubcategoryDialog=(rowData)=>{
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
         {SubcategoryForm()}
        </DialogContent>
        
      </Dialog>
     </div>)
    
    }


    /*************Sub-Category Functions***************/

    const [subcategoryName,setSubcategoryName]=useState('')
    const [categoryId,setcategoryId]=useState('')
    const [subcategoryIcon,setSubcategoryIcon]=useState({bytes:'',filename:subicon})
    const [errorMessages,setErrorMessages]=useState({})
    const [subcategoryId,setsubcategoryId]=useState('')


    const handleEditData=async()=>{
     
      
      
      
      var body={'subcategoryname':subcategoryName,'updated_at':currentDate(),
       'user_admin':'Vidhi',subcategoryid:subcategoryId}
      
      var result=await postData('subcategory/edit_sub_category_data',body)
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
      fetchSubCategory()
      }


      const handleEditIcon=async()=>{
   
        
        var formData=new FormData()
        formData.append('subcategoryicon',subcategoryIcon.bytes)
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Vidhi')
        formData.append('subcategoryid',subcategoryId)
        
        var result=await postData('subcategory/edit_sub_category_icon',formData)
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
       
        fetchSubCategory()
        setOpen(false)
        }


        const handleDeleteData=async()=>{
          Swal.fire({
            title: "Do you want to delete the Sub-Category?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              
                 SubcategoryDelete()
    
            } else if (result.isDenied) {
              Swal.fire("Category not deleted", "", "info");
            }
          });
    
          const SubcategoryDelete=async()=>{
            
             var body={'subcategoryid':subcategoryId}
              
              var result=await postData('subcategory/delete_sub_category',body)
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
             
              fetchSubCategory()
           }
          
          }
 

    

    const handleErrorMessages=(label,message)=>{
      var msg=errorMessages
      msg[label]=message
      setErrorMessages((prev)=>({...prev,...msg}))
      }

      const handleImage=(e)=>{
        setHideUploadButton(true)
        handleErrorMessages('subcategoryIcon',null)
      setSubcategoryIcon({bytes:e.target.files[0],filename:URL.createObjectURL(e.target.files[0])})
      }
      
const SubcategoryForm=()=>
{
  return(
    <div>
      
               <Grid container spacing={2}>
                   <Grid item xs={12}>
                   <div className={classes.mainHeadingStyle}>
                       <img src={logo} className={classes.imageStyle} />
                       <div className={classes.headingStyle}>
                          Sub-Category Register
                       </div>
                  </div>
                   </Grid>
                   <Grid item xs={12}>
                  <TextField label="Category Id" onChange={(e)=>setcategoryId(e.target.value) } value={Subdata.categoryid} fullWidth onFocus={()=>handleErrorMessages('categoryId',null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId}></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Sub-Category Name" onChange={(e)=>setSubcategoryName(e.target.value) } value={subcategoryName} fullWidth onFocus={()=>handleErrorMessages('subcategoryName',null)} error={errorMessages?.subcategoryName} helperText={errorMessages?.subcategoryName}></TextField>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                <div style={{display:'flex',flexDirection:'column'}}>
                {hideUploadButton?<div>{showSaveCancelButton()}</div>:
                  <Button variant="contained" component='label'>Upload
                  <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                  
                  </Button>}
                  <div className={classes.errorMessageStyle}>{errorMessages?.subcategoryIcon!=null?errorMessages?.subcategoryIcon:<></>} 
                </div> 
                    
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                  <Avatar src={subcategoryIcon.filename} variant="rounded"/>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                 <Button  variant="contained" onClick={handleEditData} fullWidth >Update</Button>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                  <Button  fullWidth variant="contained" onClick={handleDeleteData}>Delete</Button>
                </Grid>







               </Grid>
            </div>
       
  )
}



    /*************************************************/

  const fetchSubCategory=async()=>{

    var result=await getData('subcategory/display_sub_category')
    if(result.status)
    {
setsubcategoryList(result.data)
    }
    else
    {
       alert(result.message)
    }}
useEffect(function(){
   fetchSubCategory()
},[])

    

    


    /****************Table******************/
    function subcategoryTable() {
      return (
        <div  className={classes.root}>
           <div className={classes.displayBox}>
        <MaterialTable
          title="Sub-Category List"
          columns={[
            { title: 'Admin', field: 'user_admin' },
            { title: 'Sub-Category Id', field: 'subcategoryid' },
            { title: 'Category', field: 'categoryname' },
            { title: 'Sub-Category', field: 'subcategoryname' },
            { title: 'Created & Updated',  render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div>},
            { title: 'Icon', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.subcategoryicon}`}  style={{width:60,height:60,borderRadius:6}}/></div>},

          ]}
          data=
          {subcategoryList}

          options={{
            pageSize: 3,
            pageSizeOptions: [3,5,7,{value: subcategoryList.length, label: 'All'}]
          }}
                
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Sub-Category',
              onClick: (event, rowData) => handleOpenDialog(rowData)
            },
            {
              icon: 'add',
              tooltip: 'Add Sub-category',
              isFreeAction: true,
              onClick: (event) => navigate('/dashboard/subcategory')
            }
          ]}
        />
        </div>
      </div>     
      )
    
    }
    

    /***************************************/




  return(
<div>
{subcategoryTable()}
{showSubcategoryDialog()}

</div>

  



)}