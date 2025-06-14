import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import {
  Box,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Typography,
  useTheme,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const navigateToLogin = () => {
    navigate('/login');
    handleClose();
  };

  const navigateToSignup = () => {
    navigate('/register');
    handleClose();
  };

  return (
    <Box>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={anchorEl ? 'account-menu' : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {currentUser ? (
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {currentUser?.name?.charAt(0).toUpperCase() || <AccountIcon />}
          </Avatar>
        ) : (
          <AccountIcon />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '"\u00a0"',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {currentUser ? (
          <>
            <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="subtitle2" color="text.primary">
                  {currentUser?.name || 'My Profile'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser?.email || 'View Profile'}
                </Typography>
              </ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography>Logout</Typography>
              </ListItemText>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={navigateToLogin} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="subtitle2" color="text.primary">
                  Sign In
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Already have an account?
                </Typography>
              </ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={navigateToSignup} sx={{ color: theme.palette.primary.main }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography>Sign Up</Typography>
              </ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
