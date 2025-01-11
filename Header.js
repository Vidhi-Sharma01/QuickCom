import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../../assets/logo.png'
import TextBoxSearch from './TextBoxSearch';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import MyMenuBar from './MyMenuBar';
import MyDrawer from './MyDrawer';
import {useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const [open, setOpen] = useState(false);
    const theme = useTheme();
    const navigate=useNavigate()
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  var cartData=useSelector(state=>state.cart)
  var user=useSelector(state=>state.user)
  var userData=Object.values(user)
  
  var keys=Object.keys(cartData)

  const handleClick=()=>
  {
    setOpen(true)
  }
  
  return (<div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         {matches?<div></div>:<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
          <Typography variant="h6" component="div" style={{display:'flex',alignItems:'center' }} onClick={()=>navigate('/homepage')}>
            <img src={logo} style={{width:70,height:70}}/>
            <div style={{fontWeight:'bold',fontSize:24,cursor:'pointer'}}>QuickComm</div>
          </Typography>
       {matches?<TextBoxSearch/>:<div></div>}
          


          <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={keys.length} color="secondary">
            <ShoppingCartIcon onClick={()=>navigate('/cart')} style={{cursor:'pointer'}}/>
            </Badge>
          </IconButton>
           
          <IconButton
           
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon style={{fontSize:30}}/>
            {userData.length==0?<div style={{marginLeft:5,fontWeight:'bold',fontSize:16}}>Sign In</div>:<div style={{marginLeft:5,fontWeight:'bold',fontSize:16}}>{userData[0].firstname}</div>}
          </IconButton>
           </div>
           </div>
          
        </Toolbar>
      </AppBar>
      { matches?<div></div>:
      <AppBar position="static" >
        <Toolbar>
        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <TextBoxSearch width="90%"/>
        </div>
        </Toolbar>
      </AppBar>
     }
     { matches?<MyMenuBar/>:<div></div>}
     <MyDrawer open={open} setOpen={setOpen}/>

     
    </Box>
  </div>
      )
}
