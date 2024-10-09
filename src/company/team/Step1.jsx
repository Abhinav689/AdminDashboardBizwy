import React, { useState, useEffect } from 'react';
import { TextField, Box, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, InputLabel, FormControl, Typography } from '@mui/material';

function Step1({ formData, updateFormData }) {
  const [data, setData] = useState({
    name: formData.name || '',
    email: formData.email || '',
    phone: formData.phone || '',
    businessType: formData.businessType || '',
    timeZone: formData.timeZone || '',
    openingTime: formData.openingTime || '',
    closingTime: formData.closingTime || '',
    workingDays: formData.workingDays || []
  });

  useEffect(() => {
    updateFormData(data);
  }, [data, updateFormData]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleWorkingDaysChange = (e) => {
    const workingDays = [...data.workingDays];
    if (e.target.checked) {
      workingDays.push(e.target.value);
    } else {
      workingDays.splice(workingDays.indexOf(e.target.value), 1);
    }
    setData({ ...data, workingDays });
  };

  const handleAllWorkingDaysChange = (e) => {
    if (e.target.checked) {
      setData({ ...data, workingDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] });
    } else {
      setData({ ...data, workingDays: [] });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box width="100%" maxWidth="600px" p={3} border={1} borderRadius={2} boxShadow={3}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ color: 'white' }}>Registration Form</Typography>
        
        <TextField
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: { color: 'white' }, // Set label color to white
          }}
          sx={{ input: { color: 'white' } }} // Set input text color to white
        />
        
        <Box display="flex" justifyContent="space-between">
          <TextField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' }, // Set label color to white
            }}
            sx={{ input: { color: 'white' }, mr: 1 }} // Set input text color to white
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' }, // Set label color to white
            }}
            sx={{ input: { color: 'white' }, ml: 1 }} // Set input text color to white
          />
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel style={{ color: 'white' }}>Business Type</InputLabel>
          <Select
            label="Business Type"
            name="businessType"
            value={data.businessType}
            onChange={handleChange}
            sx={{ color: 'white' }} // Set selected text color to white
          >
            <MenuItem value="Retail">Retail</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Service">Service</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel style={{ color: 'white' }}>Time Zone</InputLabel>
          <Select
            label="Time Zone"
            name="timeZone"
            value={data.timeZone}
            onChange={handleChange}
            sx={{ color: 'white' }} // Set selected text color to white
          >
            <MenuItem value="PST">PST</MenuItem>
            <MenuItem value="EST">EST</MenuItem>
            <MenuItem value="CST">CST</MenuItem>
            <MenuItem value="MST">MST</MenuItem>
          </Select>
        </FormControl>
        
        <Box display="flex" justifyContent="space-between">
          <TextField
            label="Opening Time"
            name="openingTime"
            value={data.openingTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="time"
            InputLabelProps={{ shrink: true, style: { color: 'white' } }} // Set label color to white
            inputProps={{ step: 300 }} // 5 minutes
            sx={{ input: { color: 'white' }, mr: 1 }} // Set input text color to white
          />
          <TextField
            label="Closing Time"
            name="closingTime"
            value={data.closingTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="time"
            InputLabelProps={{ shrink: true, style: { color: 'white' } }} // Set label color to white
            inputProps={{ step: 300 }} // 5 minutes
            sx={{ input: { color: 'white' }, ml: 1 }} // Set input text color to white
          />
        </Box>

        <InputLabel style={{marginTop:"1rem", color: 'white'}}>Working Days</InputLabel>
        <FormGroup style={{display:"flex",flexDirection:"row"}}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.workingDays.length === 7}
                onChange={handleAllWorkingDaysChange}
                value="all"
                sx={{
                  color: 'white', // Checkbox outline color
                  '&.Mui-checked': {
                    color: 'white', // Checkbox checked color
                    backgroundColor: 'rgba(255, 255, 255, 0.2)' // White background on check
                  }
                }}
              />
            }
            label="All"
            style={{ color: 'white' }} // Set label text color to white
          />
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={data.workingDays.includes(day)}
                  onChange={handleWorkingDaysChange}
                  value={day}
                  sx={{
                    color: 'white', // Checkbox outline color
                    '&.Mui-checked': {
                      color: 'white', // Checkbox checked color
                      backgroundColor: 'rgba(255, 255, 255, 0.2)' // White background on check
                    }
                  }}
                />
              }
              label={day}
              style={{ color: 'white' }} // Set label text color to white
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}

export default Step1;
