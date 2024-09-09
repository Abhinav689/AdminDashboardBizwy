import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    doSignOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box>
      </Box>
      {/* ICONS */}
      <Box display="flex" sx={{ marginRight: "2rem" }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "light" ? (
            <DarkModeOutlinedIcon sx={{ fontSize: "1.75rem", color: theme.palette.text.secondary }} />
          ) : (
            <LightModeOutlinedIcon sx={{ fontSize: "1.7rem" ,color: theme.palette.text.primary}} />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon sx={{ fontSize: "1.75rem",color: theme.palette.text.primary}} />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon sx={{ fontSize: "1.75rem", color: theme.palette.text.primary }} />
        </IconButton>
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon sx={{ fontSize: "1.75rem", color: theme.palette.text.primary }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
