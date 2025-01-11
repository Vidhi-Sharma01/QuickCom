import {useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { postData } from '../../../services/FetchNodeAdminServices';
import { Button,Menu,MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function MyMenuBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  
  const [anchorEl,setAnchorEl]= useState(null)
  const open= Boolean(anchorEl);
  const navigate=useNavigate()
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchAllSubCategory(event.currentTarget.value)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchAllProductDetailsbySubcategory = async (subcategoryid) => {
    const result = await postData('userinterface/user_display_product_detail_by_subcategoryid',{subcategoryid});
    navigate('/displaycategory',{state:{productData:result.data}})
    
};
  const fetchAllSubCategory = async (categoryid) => {
    const result = await postData('userinterface/user_get_all_subcategory_by_categoryid',{categoryid});
    setSubCategoryList(result.data);
    
};
const showSubcategoryMenu = () => {
  return subcategoryList.map((item) => {
      return (<MenuItem  onClick={()=>fetchAllProductDetailsbySubcategory(item.subcategoryid)} >{item.subcategoryname}</MenuItem>)
});
};

  const fetchAllCategory = async () => {
    const result = await postData('userinterface/user_display_all_category',{status:'limit'});
    setCategoryList(result.data);
    
};
const showCategoryMenu = () => {
  return categoryList.map((item) => {
      return (<Button value={item.categoryid} onClick={handleClick} style={{color:'#fff',fontWeight:'bold',marginLeft:10}}>{item.categoryname}</Button>)
});
};
useEffect(() => {
  fetchAllCategory();
}, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{height:50,background:'#0c5273'}}>
        <Toolbar style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
       {showCategoryMenu()}
       <Button  style={{color:'#fff',fontWeight:'bold',marginLeft:10}}>All Categories</Button>
       <Menu
        
        
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {showSubcategoryMenu()}
      </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
