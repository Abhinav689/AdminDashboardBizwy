import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, TextField, Button, Stepper, Step, StepLabel, StepContent, Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";
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
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './styles.css';

dayjs.extend(utc);
dayjs.extend(timezone);

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
                          color: completedSteps[index] ? "#fff" : index === activeStep ? "#fff" : "#000", // White color for icon inside circle if completed or current step, black for others
                          border: "2px solid", // Adding a border to the icon container
                          borderColor: index === activeStep ? "#1e88e5" : completedSteps[index] ? "#4caf50" : "#fff", // Blue border for current step, green for completed, white for others
                          boxSizing: "border-box", // Ensuring the border doesn't affect the size
                        },
                        ".MuiStepLabel-iconContainer:hover": {
                          borderColor: "#1e88e5", // Blue border on hover
                        },
                      }}
                      StepIconComponent={() =>
                        completedSteps[index] ? (
                          <CheckIcon />
                        ) : (
                          step.icon
                        )
                      }
                    >
                      <Typography variant="caption">{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                      {/* Content for each step, if needed */}
                    </StepContent>
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

const BusinessDetailsForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [formValues, setFormValues] = useState({
    companyName: "",
    companyType: "",
    GSTNumber: "",
    PANNumber: "",
    TANNumber: "",
    websiteURL: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    primaryPhone: "",
    secondaryPhone: "",
    businessHours: [],
    logo: null,
    branding: {
      color: "",
      font: "",
    },
    bankDetails: {
      accountNumber: "",
      bankName: "",
      branchName: "",
      IFSCCode: "",
    },
    privacyPolicy: "",
    notificationPreferences: {
      email: false,
      sms: false,
      push: false,
    },
    legalDocuments: [],
  });

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleCompleteStep = () => {
    setCompletedSteps((prevCompletedSteps) => ({
      ...prevCompletedSteps,
      [activeStep]: true,
    }));
    handleNext();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  return (
    <Box display="flex" height="100vh">
      <ParentSidebar />
      <ChildSidebar activeStep={activeStep} completedSteps={completedSteps} handleStepClick={handleStepClick} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        <Box width="100%" maxWidth={600}>
          <Typography variant="h4" align="center" gutterBottom>
            Business Details
          </Typography>
          <form>
            {activeStep === 0 && (
              <>
                <TextField
                  fullWidth
                  label="Company Name"
                  variant="outlined"
                  margin="normal"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.companyName ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.companyName ? '#fff' : undefined },
                  }}
                />
                <Box
                  mt={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Typography variant="h6" gutterBottom>
                    Type of Company
                  </Typography>
                  <select
                    name="companyType"
                    value={formValues.companyType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      borderColor: '#fff',
                      color: '#fff',
                      appearance: 'none', // Hide the default dropdown arrow
                      backgroundImage: 'linear-gradient(45deg, transparent 50%, #fff 50%), linear-gradient(135deg, #fff 50%, transparent 50%)', // Custom arrow
                      backgroundPosition: 'calc(100% - 12px) calc(1em + 1px), calc(100% - 8px) calc(1em + 1px)', // Position of the custom arrow
                      backgroundSize: '5px 5px, 5px 5px', // Size of the custom arrow
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="" disabled>Select Type</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="Public Limited">Public Limited</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                  </select>
                </Box>
                <TextField
                  fullWidth
                  label="GST Number"
                  variant="outlined"
                  margin="normal"
                  name="GSTNumber"
                  value={formValues.GSTNumber}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.GSTNumber ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.GSTNumber ? '#fff' : undefined },
                  }}
                />
                <TextField
                  fullWidth
                  label="PAN Number"
                  variant="outlined"
                  margin="normal"
                  name="PANNumber"
                  value={formValues.PANNumber}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.PANNumber ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.PANNumber ? '#fff' : undefined },
                  }}
                />
                <TextField
                  fullWidth
                  label="TAN Number"
                  variant="outlined"
                  margin="normal"
                  name="TANNumber"
                  value={formValues.TANNumber}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.TANNumber ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.TANNumber ? '#fff' : undefined },
                  }}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  margin="normal"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.address ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.address ? '#fff' : undefined },
                  }}
                />
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  margin="normal"
                  name="city"
                  value={formValues.city}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.city ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.city ? '#fff' : undefined },
                  }}
                />
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  margin="normal"
                  name="state"
                  value={formValues.state}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.state ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.state ? '#fff' : undefined },
                  }}
                />
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  margin="normal"
                  name="country"
                  value={formValues.country}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.country ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.country ? '#fff' : undefined },
                  }}
                />
                <TextField
                  fullWidth
                  label="Postal Code"
                  variant="outlined"
                  margin="normal"
                  name="postalCode"
                  value={formValues.postalCode}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { color: formValues.postalCode ? '#fff' : undefined },
                  }}
                  InputProps={{
                    style: { color: '#fff', borderColor: formValues.postalCode ? '#fff' : undefined },
                  }}
                />
              </>
            )}
            {/* Continue for other steps similarly */}
          </form>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Handle form submission or final action
                }}
              >
                Finish
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCompleteStep}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessDetailsForm;
