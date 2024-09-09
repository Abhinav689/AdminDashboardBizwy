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
        <Typography variant="h4" gutterBottom textAlign="center">Registration Form</Typography>
        
        <TextField
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        
        <Box display="flex" justifyContent="space-between">
          <TextField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ mr: 1 }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ ml: 1 }}
          />
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Business Type</InputLabel>
          <Select
            label="Business Type"
            name="businessType"
            value={data.businessType}
            onChange={handleChange}
          >
            <MenuItem value="Retail">Retail</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Service">Service</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Time Zone</InputLabel>
          <Select
            label="Time Zone"
            name="timeZone"
            value={data.timeZone}
            onChange={handleChange}
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
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }} // 5 minutes
            sx={{ mr: 1 }}
          />
          <TextField
            label="Closing Time"
            name="closingTime"
            value={data.closingTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="time"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }} // 5 minutes
            sx={{ ml: 1 }}
          />
        </Box>

        <InputLabel style={{marginTop:"1rem"}}>Working Days</InputLabel>
        <FormGroup style={{display:"flex",flexDirection:"row"}}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.workingDays.length === 7}
                onChange={handleAllWorkingDaysChange}
                value="all"
              />
            }
            label="All"
          />
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={data.workingDays.includes(day)}
                  onChange={handleWorkingDaysChange}
                  value={day}
                />
              }
              label={day}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}

export default Step1;
