import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Typography, Popover, IconButton, Badge } from '@mui/material';
import { FaBell } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate,useParams } from 'react-router-dom';
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [anchorEl, setAnchorEl] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // Fetch notifications when the component mounts
    getPharmNotifications();
  }, []);

  const getPharmNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/apps/receiver/${id}`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = (event) => {
    onOpen();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    onClose();
    setAnchorEl(null);
  };

  
  return (
    <>
    
      <IconButton onClick={handleNotificationClick} style={{ color: 'black' ,marginRight: '5px',marginTop:"20%"}}>
        <Badge badgeContent={notifications.length} color="error">
          <FaBell />
        </Badge>
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, minWidth: '300px' }}>
          <Typography variant="h6" sx={{ mb: 2 ,  textAlign: 'center', fontWeight: 'bold'}} >
            Notifications
          </Typography>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li key={notification._id}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    You have a {notification.title} appointment
                  </Typography>
                  <Typography variant="body2">Appointment time: {notification.content.appointmentTime}</Typography>
                  <Typography variant="caption">with  {notification.content.patientUsername} </Typography>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No notifications yet.</Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
