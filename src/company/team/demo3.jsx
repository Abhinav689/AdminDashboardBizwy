import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, Button, Stepper, Step, StepLabel, StepContent} from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Logo from '../../components/logo.png';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import CheckIcon from "@mui/icons-material/Check";
import Swal from 'sweetalert2';
import Topbar from "../global/Topbar2";
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './styles.css';



const Item = ({ title, to, icon, selected, setSelected }) => (
  <MenuItem
    active={selected === title}
    style={{ color: "#fff" }}
    onClick={() => setSelected(title)}
    icon={icon}
    component={<Link to={to} />}
  >
    <Typography>{title}</Typography>
  </MenuItem>
);

const steps = [
  { label: "Basic Information", icon: <StorefrontOutlinedIcon sx={{ ml: "0.4rem" }} /> },
  { label: "Address", icon: <LocationOnOutlinedIcon sx={{ ml: "0.4rem" }} /> },
  { label: "Branding", icon: <AddPhotoAlternateOutlinedIcon sx={{ ml: "0.4rem" }} /> },
  { label: "Payments", icon: <AccountBalanceOutlinedIcon sx={{ ml: "0.4rem" }} /> },
  { label: "Privacy Policy", icon: <PrivacyTipOutlinedIcon sx={{ ml: "0.4rem" }} /> },
  { label: "Notification", icon: <NotificationsOutlinedIcon sx={{ ml: "0.4rem" }} /> },
  { label: "Legal Documents", icon: <ReceiptLongOutlinedIcon sx={{ ml: "0.4rem" }} /> },
  { label: "Review and Submit", icon: <CheckCircleOutlineOutlinedIcon sx={{ ml: "0.4rem" }} /> },
];

const ParentSidebar = ({ selected, setSelected }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": { background: "#141b2d" },
        "& .ps-menu-button": { backgroundColor: "transparent !important" },
        "& .ps-menuitem-root": { padding: "5px 35px 5px 20px !important" },
        "& .ps-menuitem-root:hover": { color: "#868dfb !important" },
        "& .ps-menuitem-root.ps-active": { color: "#6870fa !important" },
        height: "100vh",
        marginTop: "-9rem"
      }}
    >
      <Sidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 10px 20px -15px", color: "#fff" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="7.5rem"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
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
                  color="#fff"
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
              icon={<HomeOutlinedIcon sx={{ m: "0 0 0 -35px" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" color="#bbb" sx={{ m: "15px 0 5px 20px" }}>
              Data
            </Typography>
            <Item
              title="Company"
              to="/company"
              icon={<PeopleOutlinedIcon sx={{ m: "0 0 0 -35px" }} />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

const ChildSidebar = ({ activeStep, completedSteps, handleStepClick, isExpanded, setIsExpanded }) => {
  const [isCollapsed, setIsCollapsed] = useState(!isExpanded);

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": { background: "#333" },
        "& .ps-menu-button": { backgroundColor: "transparent !important" },
        "& .ps-menuitem-root": { padding: "5px 35px 5px 20px !important" },
        "& .ps-menuitem-root:hover": { color: "#868dfb !important" },
        "& .ps-menuitem-root.ps-active": { color: "#6870fa !important" },
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "-0.1rem",
        marginTop: "-9rem"
      }}
    >
      <Sidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <KeyboardDoubleArrowRightIcon style={{ color: "#fff", fontSize: "1.5rem" }} /> : <KeyboardDoubleArrowLeftOutlinedIcon onClick={() => setIsExpanded(isCollapsed)} style={{ color: "#fff", marginLeft: "20rem" }} />}
            style={{ margin: "10px 10px 20px -15px", color: "#fff" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="7.5rem"
              >
              </Box>
            )}
          </MenuItem>

          <Box
            paddingLeft={isCollapsed ? undefined : "20%"}
            sx={{ mt: isCollapsed ? 0 : "0rem" }}
          >
            <Box sx={{ width: "100%", mt: 2 }}>
              <Stepper activeStep={activeStep} orientation="vertical" sx={{ ml: "0.75rem" }}>
                {steps.map((step, index) => (
                  <Step key={step.label} completed={completedSteps[index]}>
                    <StepLabel
                      onClick={() => handleStepClick(index)}
                      sx={{
                        cursor: "pointer",
                        color: "#fff", // Color of step labels
                        ".MuiStepLabel-label": { display: isCollapsed ? "none" : "block", marginLeft: "0.5rem", color: "#fff" }, // All step labels should be white
                        ".MuiStepLabel-iconContainer": {
                          backgroundColor: completedSteps[index] ? "#4caf50" : index === activeStep ? "#1e88e5" : "#fff", // Green for completed steps, blue for current step, white for others
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: completedSteps[index] ? "#fff" : index === activeStep ? "#fff" : "#000", // White icon for completed and current step, black for others
                        },
                        ".MuiStepConnector-line": {
                          borderColor: completedSteps[index] ? "#4caf50" : "#eaeafc",
                          borderWidth: "2px",
                          marginLeft: "2rem"
                        }
                      }}
                      icon={
                        completedSteps[index] ? (
                          <CheckIcon style={{ marginLeft: "0.35rem" }} />
                        ) : (
                          step.icon
                        )
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent sx={{ color: "#fff" }} />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

const CustomSidebar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(Array(steps.length).fill(false));
  const [formData, setFormData] = useState({
    startTime: null,
    endTime: null,
    timeZone: '',
    branchType: '',
    businessName: '',
    address: '',
    email: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });
  const [isChildSidebarExpanded, setIsChildSidebarExpanded] = useState(true); // Set to true for default expanded state

  const handleNext = () => {
    setCompletedSteps((prev) => {
      const newCompletedSteps = [...prev];
      newCompletedSteps[activeStep] = true;
      saveToLocalStorage()
      return newCompletedSteps;
    });

    if (activeStep === steps.length - 1) {
      Swal.fire({
        title: 'Success',
        text: 'All steps completed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
 
  const saveToLocalStorage = () => {
    localStorage.setItem('formData', JSON.stringify(formData));
  };
  

  
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setCompletedSteps((prevCompletedSteps) => {
        const newCompletedSteps = [...prevCompletedSteps];
        newCompletedSteps[activeStep - 1] = false; // Mark the previous step as incomplete
        return newCompletedSteps;
      });
    }
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };


  return (
    <>
      <Topbar />
      <Box display="flex" flexDirection="row" sx={{ mt: "64px", backgroundColor: "#141b2d", height: "100vh" }}>
        <ParentSidebar selected={selected} setSelected={setSelected} />
        <ChildSidebar
          activeStep={activeStep}
          completedSteps={completedSteps}
          handleStepClick={handleStepClick}
          isExpanded={isChildSidebarExpanded}
          setIsExpanded={setIsChildSidebarExpanded}
        />
        <img src={Logo} alt="BIZWY" style={{ width: "150px", height: "60px", marginLeft: "1rem", marginTop: "-8rem" }} />
        <Typography variant="h4" sx={{ mb: 2, color: "#fff", marginTop: "-1rem", marginLeft: "-9rem" }}>
          <b>{steps[activeStep].label}</b>
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#141b2d",
            padding: "1rem",
          }}
        >
          
          {activeStep === 0 && (
            <>
           
</>


           )}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            {activeStep > 0 && (
              <Button
                onClick={handleBack}
                sx={{
                  mr: 1,
                  backgroundColor: "#f2f0f0",
                  color: "#000",
                  '&:hover': { backgroundColor: "#ddd" },
                }}
                style={{marginLeft:"5rem" , marginTop:"1rem"}}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{
                backgroundColor: "#f2f0f0",
                color: "#000",
                '&:hover': { backgroundColor: "#ddd" },
              }}
              style={{marginLeft:"30rem" , marginTop:"1rem"}}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomSidebar;
