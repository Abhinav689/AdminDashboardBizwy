import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Switch, Grid, Paper, Container } from '@mui/material';

function Step6({ formData = {}, handleSave }) {
  const [notifications, setNotifications] = useState({
    customerNotification: formData.customerNotification || false,
    employeeNotification: formData.employeeNotification || false,
    customNotification: formData.customNotification || false,
  });

  const handleToggle = (name) => (event) => {
    const newState = {
      ...notifications,
      [name]: event.target.checked,
    };
    setNotifications(newState);
    handleSave(newState);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Notification Settings
        </Typography>
        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            <Grid item>
              <Typography variant="body1">Customer Notification</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={notifications.customerNotification}
                onChange={handleToggle('customerNotification')}
                name="customerNotification"
                sx={{ ml: 2 }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between" spacing={2} mt={2}>
            <Grid item>
              <Typography variant="body1">Employee Notification</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={notifications.employeeNotification}
                onChange={handleToggle('employeeNotification')}
                name="employeeNotification"
                sx={{ ml: 2 }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between" spacing={2} mt={2}>
            <Grid item>
              <Typography variant="body1">Custom Notification</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={notifications.customNotification}
                onChange={handleToggle('customNotification')}
                name="customNotification"
                sx={{ ml: 2 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Step6;
