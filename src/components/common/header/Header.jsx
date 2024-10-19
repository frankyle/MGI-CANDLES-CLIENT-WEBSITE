import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery, useTheme } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Services", path: "/services" },
    { text: "Blog", path: "/blog" },
    { text: "Pricing", path: "/pricing" },
    { text: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#ffffff', // Light background for a clean look
          boxShadow: 'none', // Remove shadow for minimalist style
          borderBottom: '1px solid #e0e0e0', // Subtle border to separate header
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', paddingLeft: isMobile || isTablet ? 0 : 2, paddingRight: isMobile || isTablet ? 0 : 2 }}>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ position: 'absolute', left: 16, fontWeight: 'bold', color: '#202124' }}>
            MGI Candles
          </Typography>

          {/* Responsive Menu Icon for Mobile/Tablet View */}
          {isMobile || isTablet ? (
            <>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: '#5f6368' }} />
              </IconButton>
              {/* Drawer for Mobile/Tablet Menu */}
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ backgroundColor: '#f5f5f5', borderRight: '1px solid #e0e0e0' }}>
                <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
                  <List>
                    {navItems.map((item) => (
                      <ListItem
                        button
                        key={item.text}
                        component={NavLink}
                        to={item.path}
                        sx={{ textTransform: 'capitalize', color: '#5f6368', '&:hover': { backgroundColor: '#f0f0f0' } }}
                      >
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                    {user ? (
                      <ListItem button onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" sx={{ color: '#d32f2f' }} />
                      </ListItem>
                    ) : (
                      <>
                        <ListItem button component={NavLink} to="/register">
                          <ListItemIcon><PersonAddIcon /></ListItemIcon>
                          <ListItemText primary="Register" sx={{ color: '#1a73e8' }} />
                        </ListItem>
                        <ListItem button component={NavLink} to="/login">
                          <ListItemIcon><LoginIcon /></ListItemIcon>
                          <ListItemText primary="Login" sx={{ color: '#1a73e8' }} />
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            /* Centered Desktop/Tablet Navigation Links */
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={NavLink}
                  to={item.path}
                  sx={{
                    textTransform: 'capitalize',
                    color: '#5f6368',
                    borderRadius: '20px', // Rounded buttons
                    padding: '6px 16px', // Add padding for the button
                    '&:hover': {
                      color: '#1a73e8',
                      backgroundColor: 'transparent',
                    },
                    transition: 'color 0.3s ease-in-out',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* User Authentication Links */}
          {!user ? (
            <Box sx={{ position: 'absolute', right: 16 }}>
              <Button
                color="inherit"
                component={NavLink}
                to="/register"
                sx={{
                  backgroundColor: '#27ae60',
                  color: 'white',
                  borderRadius: '20px', // Rounded button
                  padding: '6px 16px', // Add padding
                  marginRight: 1,
                  '&:hover': {
                    backgroundColor: '#27ae60',
                    transition: 'background-color 0.3s ease-in-out',
                  }
                }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to="/login"
                sx={{
                  backgroundColor: '#27ae60',
                  color: 'white',
                  borderRadius: '20px', // Rounded button
                  padding: '6px 16px', // Add padding
                  '&:hover': {
                    backgroundColor: '#27ae60',
                    transition: 'background-color 0.3s ease-in-out',
                  }
                }}
              >
                Login
              </Button>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" sx={{ position: 'absolute', right: 16 }}>
              <Typography variant="body1" sx={{ marginRight: 2, color: '#202124' }}>
                Hello, {user.username}
              </Typography>
              <Button
                color="error"
                onClick={handleLogout}
                sx={{
                  borderRadius: '20px', // Rounded button
                  padding: '6px 16px', // Add padding
                  '&:hover': {
                    color: '#ecda36',
                    transition: 'color 0.3s ease-in-out',
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
