import React, { useEffect ,useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import S1 from '../css/open-iconic-bootstrap.min.css';
import S2 from '../css/animate.css';
import S3 from '../css/owl.carousel.min.css';
import S4 from '../css/owl.theme.default.min.css';
import S5 from '../css/magnific-popup.css';
import S6 from '../css/aos.css';
import S7 from '../css/ionicons.min.css';
import S8 from '../css/bootstrap-datepicker.css';
import S9 from '../css/jquery.timepicker.css';
import S10 from '../css/flaticon.css';
import S11 from '../css/icomoon.css';
import S12 from '../css/style.css';
import I1 from "../images/about.jpg";
import I2 from "../images/bg_1.jpg";
import I3 from "../images/bg_2.jpg";
import { FaUser, FaWallet } from 'react-icons/fa';
import { FaMessage} from 'react-icons/fa6';
import axios from 'axios';
import WalletModal from './walletModal';
import Notif from "./notifModal";

 export default function() {
  const [currentImage, setCurrentImage] = useState(I2);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
const [passwords, setPasswords] = useState({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
const [success, setSuccess] = useState(false); 
const handleChange = (prop) => (event) => {
  setPasswords({ ...passwords, [prop]: event.target.value });
  setSuccess(false); 
};

const [alertType, setAlertType] = useState(null);
const [isAlertOpen, setAlertOpen] = useState(false);


const handleAlertClose = () => {
  setAlertOpen(false);
  setAlertType(null);
};



const handleSubmit = (event) => {
  event.preventDefault();
  
  setSuccess(false);

  
  if (passwords.newPassword !== passwords.confirmNewPassword) {
    alert("New passwords don't match.");
    return;
  }

  if (!isValidPassword(passwords.newPassword)) {
    alert("Password must contain at least one capital letter, one number, and be at least 4 characters long.");
    return;
  }

  console.log('Passwords submitted:', passwords);
  
  
  
  setSuccess(true);

 
  updatePassword(passwords.newPassword)
  setChangePasswordOpen(false);
  
};
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  return regex.test(password);
};
const handleCloseChangePassword = () => {
  setChangePasswordOpen(false);
};
const updatePassword = async (newPassword) => {
  try {
    // Replace '/api/reset-password' with your actual API endpoint
    const response = await axios.put('http://localhost:3000/changepassword', { id, newPassword });
    console.log(response.data);
    setAlertType('success');
    setAlertOpen(true);
  } catch (error) {
    console.error('Error updating password:', error);
    setAlertType('error');
    setAlertOpen(true);
  }
};
  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };
  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
  };

  useEffect(() => {
    const intervalId = setInterval(toggleImage, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isAlertOpen) {
      const timer = setTimeout(() => {
        handleAlertClose();
      }, 5000); // Adjust the time as needed (in milliseconds)
  
      return () => clearTimeout(timer);
    }
  }, [isAlertOpen]);
  


    return (
<div style={{ backgroundColor: "white" }}>
  <title>MetaCare </title>
  <Modal
        open={isAlertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-title"
        aria-describedby="alert-description"
      >
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            // width: '300px',
            backgroundColor: '#fff',
            padding: '2px',
            borderRadius: '8px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {alertType === 'success' && (
            <Alert severity="success" onClose={handleAlertClose}>
             Password changed successfully
            </Alert>
          )}
          {alertType === 'error' && (
            <Alert severity="error" onClose={handleAlertClose}>
             Failed to change password
            </Alert>
          )}
        </div>
      </Modal>
   <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
        <div className="container"  >
          <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
            <div className="col-lg-2 pr-4 align-items-center">
              <a className="navbar-brand">
                Meta<span>Care</span>
              </a>
              
            </div>
          </div>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light"
        id="ftco-navbar"
        
      >
        <div className="container d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
        
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active" style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  style={{cursor:"pointer" } } onClick={() => navigate(`/clinic-patient-home/${id}`)}>
                  Home
                </a>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowPersonalDropdown(true)}
                onMouseLeave={() => setShowPersonalDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  style={{cursor:"pointer" } }
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowPersonalDropdown}
                >
                  Personal
                </a>
                <div
                  className={`dropdown-menu ${
                    showPersonalDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="personalDropdown"
                >
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/my-fam/${id}`)}>
                    My Family
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/MedHistory/${id}`)}>
                    My Medical History
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Prescription/${id}`)}>
                    My Prescriptions
                  </a>
                 
                </div>
              </li>
              {/* New dropdown for Doctors */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowDoctorsDropdown(true)}
                onMouseLeave={() => setShowDoctorsDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  style={{cursor:"pointer" } }
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={showDoctorsDropdown}
                >
                  Doctors
                </a>
                <div
                  className={`dropdown-menu ${
                    showDoctorsDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="doctorsDropdown"
                >
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/doctorsTable/${id}`)}>
                    Doctors List
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/appPagePatient/${id}`)}>
                    My Appointments
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/appPagePatientt/${id}`)}>
                    Book Appointment
                  </a>
                </div>
              </li>
              {/* New dropdown for Health Packages */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowHealthPackagesDropdown(true)}
                onMouseLeave={() => setShowHealthPackagesDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  style={{cursor:"pointer" } }
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowHealthPackagesDropdown}
                  
                >
                  Pricings
                </a>
                <div
                  className={`dropdown-menu ${
                    showHealthPackagesDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="doctorsDropdown"
                >
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                 onClick={() => navigate(`/health-packages-VIEW/${id}`)}>
                    Health Packages
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                 onClick={() => navigate(`/health-packages-sub/${id}`)}>
                    Subscribed Packages
                  </a>
                 
                </div>
              </li>
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"520px"}}
>
  <a style={{cursor:"pointer" } }
    className="nav-link dropdown-toggle"
   
    id="profileDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded={showProfileDropdown}
    
  >
    <FaUser style={{ fontSize: '20px', marginRight: '5px' }} />
    
  </a>
  <div
    className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`}
    aria-labelledby="profileDropdown"
  >
    <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={handleOpenChangePassword}>
      Change Password
    </a>
    <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
              onClick={() => navigate(`/clinic`)}>
      Logout
    </a>
  </div>
</li>

{/* Wallet icon without dropdown */}
<li className="nav-item ">
<WalletModal/>
</li>
<li className="nav-item ">
<Notif/>
</li>
<li className="nav-item "  >
                <a  className="nav-link pl-0"  style={{cursor:"pointer" ,marginLeft:'5px'} } onClick={() => navigate(`/messages/${id}`)}>
                <FaMessage style={{ fontSize: '20px'}} />
                </a>
              </li>  


            </ul>
          </div>
        </div>
      </nav>

      
  <section >
    <div
      className="slider-item"
      style={{ backgroundImage: `url(${currentImage})`, height: '560px' }}
      >
      <div className="overlay" />
      <div className="container">
        <div
          className="row no-gutters slider-text align-items-center justify-content-start"
          data-scrollax-parent="true"
          style={{height: "200px"}}
        >
          <div style={{ fontWeight: "900"}}>
            <h1 className="mb-4" style={{ fontWeight: "900" , color: "black", marginTop: "100px"}}>
              We Care
            </h1>
            <h1 className="mb-4" style={{ fontWeight: "900", fontSize: "60px" , color: "#2f89fc", marginTop: "-55px"}}>
             About your health
            </h1>
            <h3 className="subheading" style={{  fontSize: "20px" }} >
              Everyday We Bring Hope to the Patient We Serve
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div
  style={{
    marginTop:"-30px",
    paddingLeft: '120px', 
    paddingRight: '120px', 
  }}
>
<section style={{
    display: 'block',
    width: '100%',
    position: 'relative',
    MozTransition: 'all 0.3s ease',
    OTransition: 'all 0.3s ease',
    WebkitTransition: 'all 0.3s ease',
    MSTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
  }}>
  <div className="container">
    <div className="row no-gutters" style={{ background: '#2f89fc' }}>
      {/* First column */}
      <div className="col-md-3 p-4 " style={{
        padding: '0 0 5em 0',
        }}>
        <div className="media block-6 d-block text-center">
          <div
            className="icon d-flex justify-content-center align-items-center"
            style={{
              lineHeight: '1.3',
              position: 'relative',
              width: '80px',
              height: '80px',
              background: '#61a6fd',
              margin: '0 auto',
              WebkitBorderRadius: '50%',
              MozBorderRadius: '50%',
              MsBorderRadius: '50%',
              borderRadius: '50%',
            }}
          >
            <span className="flaticon-doctor" style={{ fontSize: '50px', color: '#fff' }} />
          </div>
          <div className="media-body p-2 mt-3">
            <h3 style={{ fontWeight: '500', fontSize: '22px', color: '#fff' }}>Qualitfied Doctors</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Our doctor's at MetaCare graduated from top-tier Med-Schools around the Globe.
            </p>
          </div>
        </div>
      </div>

      {/* Second column */}
      <div className="col-md-3 p-4 " style={{
        padding: '0 0 5em 0',
        background: '#0c75fb',
        }}>
        <div className="media block-6 d-block text-center" >
          <div
            className="icon d-flex justify-content-center align-items-center"
            style={{
              lineHeight: '1.3',
              position: 'relative',
              width: '80px',
              height: '80px',
              background: '#61a6fd',
              margin: '0 auto',
              WebkitBorderRadius: '50%',
              MozBorderRadius: '50%',
              MsBorderRadius: '50%',
              borderRadius: '50%',
             
            }}
          >
            <span className="flaticon-ambulance" style={{ fontSize: '50px', color: '#fff' }} />
          </div>
          <div className="media-body p-2 mt-3">
            <h3 style={{ fontWeight: '500', fontSize: '22px', color: '#fff' }}>Emergency Care</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              You can contact emercency care through our website at any time of the day.
            </p>
          </div>
        </div>
      </div>

      {/* Third column */}
      <div className="col-md-3 d-flex p-4 " style={{ background: '#2f89fc' }}>
        <div className="media block-6 d-block text-center">
          <div className="icon d-flex justify-content-center align-items-center" style={{
              lineHeight: '1.3',
              position: 'relative',
              width: '80px',
              height: '80px',
              background: '#61a6fd',
              margin: '0 auto',
              WebkitBorderRadius: '50%',
              MozBorderRadius: '50%',
              MsBorderRadius: '50%',
              borderRadius: '50%',
             
            }}>
            <span className="flaticon-stethoscope" style={{ fontSize: '50px', color: '#fff' }} />
          </div>
          <div className="media-body p-2 mt-3">
            <h3 className="heading" style={{ fontWeight: '500', fontSize: '22px', color: '#fff' }}>Instant Booking</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            You can book an appointment right away in case of any need through our Web-App.
            </p>
          </div>
        </div>
      </div>

      {/* Fourth column */}
      <div className="col-md-3 d-flex  p-4 " style={{
        padding: '0 0 5em 0',
        background: '#0c75fb',
        }}>
        <div className="media block-6 d-block text-center">
          <div className="icon d-flex justify-content-center align-items-center" style={{
              lineHeight: '1.3',
              position: 'relative',
              width: '80px',
              height: '80px',
              background: '#61a6fd',
              margin: '0 auto',
              WebkitBorderRadius: '50%',
              MozBorderRadius: '50%',
              MsBorderRadius: '50%',
              borderRadius: '50%',
             
            }}>
            <span className="flaticon-24-hours"  style={{ fontSize: '50px', color: '#fff' }}/>
          </div>
          <div className="media-body p-2 mt-3">
            <h3 className="heading" style={{ fontWeight: '500', fontSize: '20px', color: '#fff' }}>24 Hours Service</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              We are always at your service no matter when or how.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  </div>
  <section >
    <div className="container">
      <div className="row no-gutters" style={{marginLeft:"15px"}}>
        <div
          className="col-md-5 p-md-5 img img-2 mt-5 mt-md-0"
          style={{ backgroundImage: `url(${I1})`, backgroundSize: 'cover'  }}
        ></div>
        <div className="col-md-7 wrap-about py-4 py-md-5 ">
          <div className=" mb-5">
            <div className="pl-md-5 ml-md-5">
              <span 
              style={{
                fontWeight: '400',
                fontSize: '13px',
                display: 'block',
                marginBottom: '0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'black',
                position: 'relative'
              }} >About MetaCare</span>
              <h2 className="mb-4" style={{ fontSize: 24 , fontWeight:"900",color: 'black', }}>
                Medical specialty concerned with the care of acutely ill
                hospitalized patients
              </h2>
            </div>
          </div>
          <div className="pl-md-5 ml-md-5 mb-5" style={{ fontSize: 13 }}>
            <p>
            MetaCare is a leading healthcare provider dedicated to the specialized and compassionate care of acutely ill hospitalized patients. Our team of highly qualified medical professionals is committed to delivering exceptional medical services with a focus on patient well-being and recovery.
            </p>
            <div className="row mt-5 pt-2">
              <div className="col-lg-6">
                <div className="services-2 d-flex">
                  <div className="icon mt-2 mr-3 d-flex justify-content-center align-items-center">
                    <span className="flaticon-first-aid-kit" />
                  </div>
                  <div className="text">
                    <h3 style={{ color: 'black', }}>Primary Care</h3>
                    <p>
                    Your partner in comprehensive and personalized healthcare, ensuring your well-being at every stage of life.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="services-2 d-flex">
                  <div className="icon mt-2 mr-3 d-flex justify-content-center align-items-center">
                    <span className="flaticon-dropper" />
                  </div>
                  <div className="text">
                    <h3 style={{ color: 'black', }}>Lab Test</h3>
                    <p>
                    Accurate diagnostics and swift results, ensuring precise insights for your health.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="services-2 d-flex">
                  <div className="icon mt-2 mr-3 d-flex justify-content-center align-items-center">
                    <span className="flaticon-experiment-results" />
                  </div>
                  <div className="text">
                    <h3 style={{ color: 'black', }}>Symptom Check</h3>
                    <p>
                    Your first step to understanding and addressing your health concerns, ensuring prompt and accurate guidance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="services-2 d-flex">
                  <div className="icon mt-2 mr-3 d-flex justify-content-center align-items-center">
                    <span className="flaticon-heart-rate" />
                  </div>
                  <div className="text">
                    <h3 style={{ color: 'black', }}>Heart Rate</h3>
                    <p>
                    Keeping a close watch on your cardiovascular health for a proactive approach to well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
   {/* Change Password pop-up */}
   <Modal
        open={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
        aria-labelledby="change-password-popup"
      >
        <Box
          sx={{
            marginTop: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '400px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center'}}>
              Change Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                value={passwords.newPassword}
                onChange={handleChange('newPassword')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                id="confirmNewPassword"
                autoComplete="new-password"
                value={passwords.confirmNewPassword}
                onChange={handleChange('confirmNewPassword')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

</div>
)}