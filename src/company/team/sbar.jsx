import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowForward, ArrowBack, Done } from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import VerifiedIcon from '@mui/icons-material/Verified';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Check from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';


const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    transform: 'rotate(90deg)',
    marginLeft: 12,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      height: 'calc(100% + 22px)',
      width: 3,
      borderRadius: 1,
      marginLeft: 10,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      height: 'calc(100% + 22px)',
      width: 3,
      borderRadius: 1,
      marginLeft: 10,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 'calc(100% + 22px)',
    width: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
    marginLeft: 10,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: 'green',
    color: '#fff',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <BusinessIcon />,
    2: <BusinessIcon />,
    3: <PersonIcon />,
    4: <AssignmentIndIcon />,
    5: <VerifiedIcon />,
    6: <AssignmentTurnedInIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ['Business Type', 'Business Information', 'Owner Details', 'Aadhar, PAN, GST', 'Licenses', 'Review Your Details'];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState([]);
  const [stepData, setStepData] = React.useState({
    businessType: '',
    businessInfo: '',
    ownerDetails: '',
    aadharPanGst: '',
    licenses: '',
  });

  const handleNext = () => {
    setCompletedSteps([...completedSteps, activeStep]);
    if (activeStep === steps.length - 1) {
      Swal.fire({
        title: "Account Created Successfully",
        text: "Login for more",
        icon: "success",
        confirmButtonText: 'LOGIN',
        showCloseButton: true,
        showConfirmButton: true,
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCompletedSteps(completedSteps.filter(step => step !== activeStep - 1));
  };



  const handleChange = (step, value) => {
    setStepData({ ...stepData, [step]: value });
  };

  const toggleDrawer = () => {
    setDrawerOpen(drawerOpen);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack direction="column" alignItems="center">
            <Typography variant="h5" style={{ marginTop: "-15rem" }}>Business Type</Typography>
            <FormControl fullWidth sx={{ width: '90%', marginTop: "2rem" }}>
              <InputLabel id="business-type-label" sx={{ color: 'black' }}>Business Type</InputLabel>
              <Select
                labelId="business-type-label"
                value={stepData.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
                label="Business Type"
                fullWidth
              >
                <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
                <MenuItem value="Partnership">Partnership</MenuItem>
                <MenuItem value="Corporation">Corporation</MenuItem>
                <MenuItem value="Limited Liability Company">Limited Liability Company</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        );
      case 1:
        return (
          <Stack direction="column" alignItems="center">
            <Typography variant="h5" style={{ marginTop: "-15rem" }}>Business Information</Typography>
            <TextField label="Business Information" value={stepData.businessInfo} onChange={(e) => handleChange('businessInfo', e.target.value)} fullWidth sx={{ width: '80%', marginTop: "2rem" }} />
          </Stack>
        );
      case 2:
        return (
          <Stack direction="column" alignItems="center">
            <Typography variant="h5" style={{ marginTop: "-15rem" }}>Owner Details</Typography>
            <TextField label="Owner Details" value={stepData.ownerDetails} onChange={(e) => handleChange('ownerDetails', e.target.value)} fullWidth sx={{ width: '80%', marginTop: "2rem" }} />
          </Stack>
        );
      case 3:
        return (
          <Stack direction="column" alignItems="center">
            <Typography variant="h5" style={{ marginTop: "-15rem" }}>Aadhar, PAN, GST</Typography>
            <TextField label="Aadhar, PAN, GST" value={stepData.aadharPanGst} onChange={(e) => handleChange('aadharPanGst', e.target.value)} fullWidth sx={{ width: '80%', marginTop: "2rem" }} />
          </Stack>
        );
      case 4:
        return (
          <Stack direction="column" alignItems="center">
            <Typography variant="h5" style={{ marginTop: "-15rem" }}>Licenses</Typography>
            <TextField label="Licenses" value={stepData.licenses} onChange={(e) => handleChange('licenses', e.target.value)} fullWidth sx={{ width: '80%', marginTop: "2rem" }} />
          </Stack>
        );
      case 5:
        return (
          <Stack spacing={2}>
            <Typography variant="h5">Review Your Details</Typography>
            <TextField label="Business Type" value={stepData.businessType} InputProps={{ readOnly: true }} fullWidth sx={{ width: '80%' }} />
            <TextField label="Business Information" value={stepData.businessInfo} InputProps={{ readOnly: true }} fullWidth sx={{ width: '80%' }} />
            <TextField label="Owner Details" value={stepData.ownerDetails} InputProps={{ readOnly: true }} fullWidth sx={{ width: '80%' }} />
            <TextField label="Aadhar, PAN, GST" value={stepData.aadharPanGst} InputProps={{ readOnly: true }} fullWidth sx={{ width: '80%' }} />
            <TextField label="Licenses" value={stepData.licenses} InputProps={{ readOnly: true }} fullWidth sx={{ width: '80%' }} />
          </Stack>
        );
      default:
        return 'Unknown step';
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: '100vh' }} >
      <Drawer anchor="left" style={{marginLeft:"2rem",zIndex:"-1"}}open variant="persistent" sx={{ width: drawerOpen ? 240 : 80 }}>
        <Stack direction="column" style={{marginLeft:"6rem" ,zIndex:"-1"}} alignItems="flex-end" sx={{ width: drawerOpen ? 240 : 80, padding: 2 }}>
          <IconButton onClick={toggleDrawer} sx={{ marginBottom: 2 }}>
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Stepper activeStep={activeStep} orientation="vertical" connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
              <Step key={label} completed={completedSteps.includes(index)}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  onClick={() => handleStepClick(index)}
                  sx={{ cursor: 'pointer' }}
                >
                  {drawerOpen && label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </Drawer>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ flex: 1 }}>
        {renderStepContent(activeStep)}
        <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} startIcon={<ArrowBack />}>
              Back
            </Button>
          )}
          {!isLastStep ? (
            <Button onClick={handleNext} endIcon={<ArrowForward />}>
              Next
            </Button>
          ) : (
            <Button onClick={handleNext} endIcon={<Done />}>
              Finish
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
