import { useState,useEffect } from "react";
import { getData,serverURL ,createDate,postData,currentDate} from "../../../services/FetchNodeAdminServices";
import MaterialTable from "@material-table/core";
import { Dialog,DialogContent,IconButton } from "@mui/material";
import {Grid,TextField,Button,Avatar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

export default function Orders(){
    var navigate=useNavigate()
    const[orderList,setOrderList]=useState([])

    const fetchAllOrders=async()=>{

        var result=await getData('userinterface/display_all_orders')
        if(result.status)
        {
        setOrderList(result.data)
        }
        else
        {
           alert(result.message)
        }}
    useEffect(function(){
       fetchAllOrders()
    },[])

    function OrderTable() {
        return (
          <div style={{width:'100%',
          height:'100%',
          display:'flex',
          justifyContent:'center',
          marginTop:50}}>
            <div style={{ width:1100,
         height:'auto',
         padding:10,
         margin:10,
         background:"#25CCF7",
         borderRadius:5}}>
          <MaterialTable
            title="Orders"
            columns={[
              { title: 'No.', field: 'ordeeno' },
              { title: 'Date', field: 'orderdate' },
              { title: 'Product', field: 'product' },
              { title: 'Ordered By', field: 'username' },
              { title: 'Quantity', field: 'qty' },
              { title: 'Payment ID', field: 'paymentstatus' },
              { title: 'Address',field: 'address'},
              { title: 'E-Mail', field: 'emailid' },
              { title: 'Phone Number', field: 'mobileno' },
              { title: 'Status', field: 'deliverystatus' }
              ]}
            data={orderList}  
            options={{
              pageSize: 3,
              pageSizeOptions: [3,5,7,{value: orderList.length, label: 'All'}]
            }}
            
            
          />
          </div>
          </div>
        )
      }

    return(
        <div>
        {OrderTable()}
        </div>
    )
}