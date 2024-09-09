import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Logo from '../../components/logo.png'
import SearchIcon from "@mui/icons-material/Search";
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
      <img src={Logo} alt="BIZWY" />
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon sx={{ fontSize: "1.75rem" }} />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" sx={{ marginRight:"2rem"}}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon sx={{ fontSize: "1.75rem"  }} />
          ) : (
            <LightModeOutlinedIcon sx={{ fontSize: "1.7rem" }} />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon sx={{ fontSize: "1.75rem" }} />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon sx={{ fontSize: "1.75rem" }} />
        </IconButton>
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon sx={{ fontSize: "1.75rem" }} />
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
