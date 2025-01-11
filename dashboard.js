import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {List,ListItem,ListItemButton,ListItemIcon,ListItemText, Divider, Button,Grid} from '@mui/material'
import { Paper } from '@mui/material';
import { serverURL } from '../../../services/FetchNodeAdminServices';
import { Routes,Route,useNavigate } from 'react-router-dom';
import Category from '../category/category';
import DisplayAllCategory from '../category/DisplayAllCategory';
import DisplayAllSubcategory from '../subcategory/DisplayAllSubcategory'
import Subcategory from '../subcategory/subcategory'
import Brand from '../Brands/brand'
import Displayallbrands from '../Brands/Displayallbrands'
import Products from '../products/Products'
import DisplayAllProducts from '../products/DisplayAllProducts'
import ProductDetails from '../productdetails/productdetails'
import DisplayallProductDetail from '../productdetails/DisplayAllProductDetails'
import ProductPicture from '../productpictures/productpictures'
import Mainbanner from '../mainbanner/mainbanner';
import AdOffers from '../adoffers/adoffers'
import Bankoffers from '../bankandotheroffers/bankandotheroffers'
import Orders from '../../userinterface/mycart/Orders';

export default function Dashboard() 
    {
      var navigate=useNavigate();
   return(

    <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         QuickComm
        </Typography>
        <Button color="inherit" >Logout</Button>
      </Toolbar>
    </AppBar>
   
      <Grid container>
        <Grid item xs={2} >
          <Paper elevation={3} style={{flexDirection:'column', display:'flex',alignItems:'center',height:630,margin:10}}>
 
            <div >
              <img src={`${serverURL}/images/5.jpg`} style={{width:70,height:70,borderRadius:35,marginTop:10}}/>
            </div>
            <div style={{fontSize:12,fontWeight:'bold',letterSpacing:1}}>
               Harry Singh
            </div>
            <div style={{fontSize:10,fontWeight:'bold',color:'grey'}}>
               harrysingh@gmail.com
            </div>
            
            <Divider style={{width:'90%',marginTop:10}} />
            <div>
              <List>
                <ListItem>
                  <ListItemButton >
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <img src='/dashboard.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Dashboard
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/order')}>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <img src='/order.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Orders
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <img src='/shopping-cart.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Category
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>

                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/folder-management.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        SubCategory
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/DisplayAllBrands')}>
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/brand-image.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Brands
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/DisplayAllProducts')}>
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/product-market-fit.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Products
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/Displayallproductdetails')}>
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/product-catalog.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Product Details
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/Productpicture')}>
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/product-image.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                        Products Image
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>

                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/mainbanner')}>
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/ribbon.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                       Banners
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
                
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/adoffers')}>
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/advertising.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                       Products Ad
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
               
                <ListItem style={{marginTop:-25}}>
                  <ListItemButton onClick={()=>navigate('/dashboard/bankoffers')}>
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/agent.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                       Bank Offers
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>

                <ListItem style={{marginTop:-25}}>
                  <ListItemButton> 
                    <div style={{display:'flex',flexDirection:'row',alignItem:'center'}}>
                      <img src='/check-out.png' style={{width:30,height:30}}/>
                      <div style={{fontWeight:600,marginLeft:15}}>
                       Logout
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
 
 
              </List>
              </div> 
          </Paper>
        </Grid>
        <Grid item xs={10} >
         
        <Routes>
          <Route element={<Category/>} path="/Category" ></Route>
          <Route element={<DisplayAllCategory/>} path="/displayallcategory" ></Route>
          <Route element={<Subcategory/>} path="/Subcategory" ></Route>
          <Route element={<DisplayAllSubcategory/>} path="/DisplayAllSubcategory" ></Route>
          <Route element={<Brand/>} path="/Brand" ></Route>
          <Route element={<Displayallbrands/>} path="/DisplayAllBrands" ></Route>
          <Route element={<Products/>} path="/Products" ></Route>
          <Route element={<DisplayAllProducts/>} path="/DisplayAllProducts" ></Route>
          <Route element={<ProductDetails/>} path="/Productdetails" ></Route>
          <Route element={<DisplayallProductDetail/>} path="/Displayallproductdetails" ></Route>
          <Route element={<ProductPicture/>} path="/Productpicture" ></Route>
          <Route element={<Mainbanner/>} path="/mainbanner" ></Route>
          <Route element={<Bankoffers/>} path="/bankoffers" ></Route>
          <Route element={<AdOffers/>} path="/adoffers" ></Route>
          <Route element={<Orders/>} path="/order" ></Route>
        
      </Routes> 
        </Grid>

      </Grid>
   
  </div>
   )
    }