import { useState } from "react";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const CustomSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    
      <Box
        sx={{
          "& .ps-sidebar-container": {
            background: `${colors.primary[400]} !important`,
          },
          "& .ps-menu-button": {
            backgroundColor: "transparent !important",
          },
          "& .ps-menuitem-root": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .ps-menuitem-root:hover": {
            color: "#868dfb !important",
          },
          "& .ps-menuitem-root.ps-active": {
            color: "#6870fa !important",
          },
          height: "100vh",
        }}
      >
        <Sidebar collapsed={isCollapsed} style={{height:"100vh"}}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 10px 20px -15px",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="7.5rem"
                >
               
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
               
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    ADMIN
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon sx={{m:"0 0 0 -35px"}} />}
                selected={selected}
             
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data
              </Typography>
              <Item
                title="Company"
                to="/company"
                icon={<PeopleOutlinedIcon  sx={{m:"0 0 0 -35px"}}/>}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    
  );
};

export default CustomSidebar;
