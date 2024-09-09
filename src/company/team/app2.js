import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Step7 from './components/Step7';
import Step8 from './components/Step8';
import "stepper.css";
const steps = ['Basic Information', 'Branch Information', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7', 'Review'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Clear local storage on component mount
    localStorage.removeItem('formData');
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormData = (newData) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  const handleFinish = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <Typography variant="h5">All steps completed</Typography>
        ) : (
          <div>
            <Box id={`step-${activeStep}`}>
            {activeStep === 0 && <Step1 formData={formData} updateFormData={updateFormData} />}
              {activeStep === 1 && <Step2 formData={formData} handleSave={updateFormData} />}
              {activeStep === 2 && <Step3 formData={formData} handleSave={updateFormData} />}
              {activeStep === 3 && <Step4 formData={formData} handleSave={updateFormData} />}
              {activeStep === 4 && <Step5 formData={formData} handleSave={updateFormData} />}
              {activeStep === 5 && <Step6 formData={formData} handleSave={updateFormData} />}
              {activeStep === 6 && <Step7 formData={formData} handleSave={updateFormData} />}
              {activeStep === 7 && <Step8 formData={formData} />}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep !== steps.length - 1 ? (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleFinish}>
                  Finish
                </Button>
              )}
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
}

export default App;

