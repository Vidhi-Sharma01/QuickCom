import { Button, Divider, Paper, TextField, Grid } from "@mui/material"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { currentDate, postData, serverURL } from "../../../services/FetchNodeAdminServices";
import Drawer from '@mui/material/Drawer';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useRazorpay from "react-razorpay";



export default function PaymentDetails({ refresh, setRefresh }) {
  const Razorpay = useRazorpay();
  const theme = useTheme();
  const navigate = useNavigate()
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false)
  const steps = ['Your Cart', 'Review', 'Payment'];
  const dispatch = useDispatch()
  var cartData = useSelector((state) => state.cart)
  var user = useSelector((state) => state.user)
  var userData = Object.values(user)
  var data = Object.values(cartData)
  var keys = Object.keys(cartData)

  console.log("data", data)
  console.log("user", user)
  /****Address states *****/
  const [userId, setUserId] = useState(userData[0]?.userid)
  const [pinCode, setPinCode] = useState('')
  const [houseNo, setHouseNo] = useState('')
  const [floorNo, setFloorNo] = useState('')
  const [towerNo, setTowerNo] = useState('')
  const [building, setBuilding] = useState('')
  const [address, setAddress] = useState('')
  const [Landmark, setLandmark] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [btnTxt, setBtnTxt] = useState('Place Order')
  /************************/
  var totalamount = data.reduce((f, s) => {
    var ap = 0

    ap = s.price * s.qty
    return f + ap
  }, 0)
  var discount = data.reduce((f, s) => {
    var ap = 0
    if (s.offerprice > 0) {
      ap = (s.price - s.offerprice) * s.qty
    }
    return f + ap
  }, 0)
  /************Payment Gateway */
  const handlePayment = async () => {
    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: (totalamount - discount) * 100,
      currency: "INR",
      name: "QuickCom",
      description: "Test Transaction",
      image: `${serverURL}/images/logo.png`,

      handler: (res) => {
        console.log(res);
        submitOrders(res.razorpay_payment_id)

        dispatch({ type: 'Clear_Cart', payload: [] })
        navigate("/homepage")


      },
      prefill: {
        name: userData[0]?.fullname,
        email: userData[0]?.emailaddress,
        contact: userData[0]?.mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    await rzp1.open();
  }
  useEffect(function () {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

  }, [])

  /*************************** */

  const handleClose = (bool) => {
    setOpen(bool)
  }



  const handlePlaceOrder = async () => {
    if (btnTxt == 'Make Payment') {
      { handlePayment() }
    }
    if (userData.length == 0) {
      navigate('/signin1')
    }
    else {
      var response = await postData('userinterface/check_user_address', { userid: userData[0]?.userid })
      if (response.status) { //var {userid,...remainingData}=userData[0]
        var userDataWithAddress = { ...userData[0], ...response.data[0] }
        dispatch({ type: "ADD_USER", payload: [userData[0]?.userid, userDataWithAddress] })
        setBtnTxt('Make Payment')
      }
      else {
        setOpen(true)
      }
    }
  }

  const submitOrders = async (tid) => {
    var body = {
      orderdate: currentDate(),
      deliverystatus: 'undelivered',
      paymentstatus: tid,
      data: JSON.stringify(data),
      userdata: JSON.stringify(userData)
    }

    var result = await postData('userinterface/submit_orders', body)
  }

  const handleSubmitAddress = async () => {
    var body = { userid: userId, pincode: pinCode, houseno: houseNo, floorno: floorNo, towerno: towerNo, building: building, address: address, landmark: Landmark, city: city, state: state }
    var response = await postData('userinterface/submit_user_address', body)
    if (response.status) {
      var { userid, ...remainingData } = userData[0]
      var userDataWithAddress = { ...userData[0], ...body }
      dispatch({ type: "ADD_USER", payload: [userData[0]?.userid, userDataWithAddress] })
      Swal.fire({
        icon: "success",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
      setBtnTxt('Make Payment')
      setRefresh(!refresh)
      navigate('/cart')
    }
    else {
      Swal.fire({
        icon: "success",
        text: response.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    }
    setOpen(false)
  }

  const addressView = () => {
    return (
      <div>
        <Paper style={{ width: 380, height: 650, borderRadius: 15, justifySelf: 'right' }}>
          <div style={{ marginLeft: 25 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ marginTop: 30, fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: 0.15, lineHeight: 1 }}>
                Add Address
              </div>
              <div>
                <img onClick={() => setOpen(false)} src={'/cross.png'} style={{ width: 15, height: 15, marginTop: 30, marginRight: 20 }} />
              </div>
            </div>
            <div style={{ marginTop: 30, fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: 14, letterSpacing: 0.15, lineHeight: 1 }}>
              Address Details
            </div>

            <div style={{ marginTop: 15, display: "flex" }}>
              <MyLocationIcon style={{ fontSize: 20, color: '#0078ad' }} />
              <div style={{ cursor: 'pointer', color: '#0078ad', fontWeight: 500, fontSize: 13.5, letterSpacing: 0.25, lineHeight: 1.4285714286, marginLeft: 5 }}>
                Use Current Location
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 11.5, letterSpacing: 0.07, lineHeight: 1.4285714286, color: 'rgba(0, 0, 0, .65)', overflow: "hidden", textOverflow: 'ellipsis', display: "-webkit-box", webkitLineClamp: "1", webkitBoxOrient: "vertical", marginLeft: 25 }}>
              Using GPS
            </div>
            <Grid container spacing={1}>
              <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                <TextField onChange={(e) => setPinCode(e.target.value)} label="Pin Code" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={6} style={{ marginTop: 5, width: '45%' }} >
                <TextField onChange={(e) => setHouseNo(e.target.value)} label="House No." variant="standard" fullWidth />
              </Grid>
              <Grid item xs={6} style={{ marginTop: 5, width: '45%' }} >
                <TextField onChange={(e) => setFloorNo(e.target.value)} label="Floor No." variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                <TextField onChange={(e) => setTowerNo(e.target.value)} label="Tower No." variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                <TextField onChange={(e) => setBuilding(e.target.value)} label="Building / Apartment Name" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                <TextField onChange={(e) => setAddress(e.target.value)} label="Address" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                <TextField onChange={(e) => setLandmark(e.target.value)} label="Landmark / Area" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                <TextField onChange={(e) => setCity(e.target.value)} label="City" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                <TextField onChange={(e) => setState(e.target.value)} label="State" variant="standard" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleSubmitAddress} style={{ borderRadius: 25, height: 53, marginTop: 10, color: '#fff', background: '#0078ad', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: -0.07, lineHeight: 1.4285714286, width: '95%' }} fullWidth>Save and Proceed</Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>)

  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28 }}>
      <div style={{ marginLeft: -20, padding: 15, marginTop: 40, borderRadius: 25, width: matches ? '86%' : '90%', background: '#e5f1f7' }}>
        <Stepper activeStep={0} alternativeLabel >
          {steps.map((label) => (
            <Step key={label} >
              <StepLabel  ><b>{label}</b></StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div style={{ marginTop: -50, marginLeft: -20 }}>
        <div style={{ border: '0.5px solid #e2e2e2', marginTop: 70, borderRadius: 20, width: matches ? '89%' : '92%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: '1rem', letterSpacing: -0.72, lineHeight: 1.25, marginLeft: 28, marginBottom: 20, marginTop: 20 }}>
            Payment Details
          </div>
          <div style={{ display: 'flex', marginBottom: 5, justifyContent: 'space-between' }}>
            <div style={{ color: 'rgba(0, 0, 0, .65)', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 550, fontSize: '1rem', letterSpacing: -0.07, lineHeight: 1.4285714286, marginLeft: 30 }}>
              MRP Total
            </div>
            <div style={{ color: 'rgba(0, 0, 0, .65)', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 550, fontSize: '1rem', letterSpacing: -0.07, lineHeight: 1.4285714286, marginRight: 20 }}>
              &#8377;{totalamount.toFixed(2)}
            </div>
          </div>
          <Divider variant="middle" />
          <div style={{ display: 'flex', marginTop: 15, marginBottom: 5, justifyContent: 'space-between' }}>
            <div style={{ color: 'rgba(0, 0, 0, .65)', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 550, fontSize: '1rem', letterSpacing: -0.07, lineHeight: 1.4285714286, marginLeft: 30 }}>
              Product Discount
            </div>
            <div style={{ color: '#00b259', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 550, fontSize: '1rem', letterSpacing: -0.07, lineHeight: 1.4285714286, marginRight: 20 }}>
              - &#8377;{discount.toFixed(2)}
            </div>
          </div>
          <Divider variant="middle" />
          <div style={{ display: 'flex', marginTop: 15, marginBottom: 5, justifyContent: 'space-between' }}>
            <div style={{ color: 'rgba(0, 0, 0, .65)', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 550, fontSize: '1rem', letterSpacing: -0.07, lineHeight: 1.4285714286, marginLeft: 30 }}>
              Delivery Fee
            </div>
            <div style={{ color: '#00b259', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 550, fontSize: '1rem', letterSpacing: -0.07, lineHeight: 1.4285714286, marginRight: 20 }}>
              Free
            </div>
          </div>
          <Divider variant="middle" />
          <div style={{ display: 'flex', marginTop: 15, marginBottom: 10, justifyContent: 'space-between' }}>
            <div style={{ color: 'rgba(0, 0, 0, .65)', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: -0.07, lineHeight: 1.4285714286, marginLeft: 30 }}>
              Total
            </div>
            <div style={{ color: '#141414', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: -0.07, lineHeight: 1.4285714286, marginRight: 20 }}>
              &#8377;{(totalamount - discount).toFixed(2)}
            </div>
          </div>
          <div style={{ color: '#00b259', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: -0.07, lineHeight: 1.4285714286, marginLeft: 230, marginBottom: 10 }}>
            You Saved &#8377;{discount.toFixed(2)}
          </div>
        </div>
        <Button style={{ border: '1px solid #ddd', borderRadius: 25, width: matches ? '91%' : '93%', height: 53, marginTop: 10, color: '#fff', background: '#0078ad', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: -0.07, lineHeight: 1.4285714286 }} onClick={handlePlaceOrder} fullWidth>{btnTxt}</Button>
      </div>
      <Drawer anchor={"right"} open={open} onClose={() => handleClose(false)}>
        {addressView()}
      </Drawer>

    </div>
  )
}