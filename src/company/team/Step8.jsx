import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  Paper, Button
} from '@mui/material';
function Step8({ formData }) {
  const { workingDays = [] } = formData;
  const { primary, secondary } = formData;
  const instorePayments = formData.instorePayments || [];
  const integrations = formData.integrations || [];
  // Function to handle form submission
  const handleSubmit = () => {
    const formDataToSend = new FormData();

    // Append text data
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('businessType', formData.businessType);
    formDataToSend.append('timeZone', formData.timeZone);
    formDataToSend.append('openingTime', formData.openingTime);
    formDataToSend.append('closingTime', formData.closingTime);
    formDataToSend.append('workingDays', formData.workingDays.join(', '));
    formDataToSend.append('description', formData.description);
    formDataToSend.append('currency', formData.currency);

    // Append numbers: Aadhar, PAN, GST
    formDataToSend.append('aadharNumber', formData.aadharNumber);
    formDataToSend.append('panNumber', formData.panNumber);
    formDataToSend.append('gstNumber', formData.gstNumber);

    // Append notifications (as 1 or 0 for true/false)
    formDataToSend.append('customerNotification', formData.customerNotification ? '1' : '0');
    formDataToSend.append('employeeNotification', formData.employeeNotification ? '1' : '0');
    formDataToSend.append('customNotification', formData.customNotification ? '1' : '0');

    // Append instore payments and integrations (send them as JSON strings)
    formDataToSend.append('instorePayments', JSON.stringify(formData.instorePayments));
    formDataToSend.append('integrations', JSON.stringify(formData.integrations));

    // Append branches as JSON string
    if (formData.addresses && formData.addresses.length > 0) {
        formDataToSend.append('branches', JSON.stringify(formData.addresses)); // Send branches as JSON
    }

    // Append images (if they exist)
    if (formData.profileLogo) {
        formDataToSend.append('profileLogo', formData.profileLogo);
    }
    if (formData.profileBanner) {
        formDataToSend.append('profileBanner', formData.profileBanner);
    }
    if (formData.aadharImage) {
        formDataToSend.append('aadharImage', formData.aadharImage);
    }
    if (formData.panImage) {
        formDataToSend.append('panImage', formData.panImage);
    }
    if (formData.gstImage) {
        formDataToSend.append('gstImage', formData.gstImage);
    }

    // Send the form data using fetch
    fetch('http://localhost:8080/bizwy/saveFormData.php', {
        method: 'POST',
        body: formDataToSend,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit form: ' + data.message);
            }
        })
        .catch((error) => {
            alert('An error occurred: ' + error.message);
        });
};

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3} sx={{mt:200}}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '900px' }}>

        {/* Display Basic Information */}
        <Box mb={3}>
          <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Basic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                value={formData.name || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={formData.email || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                value={formData.phone || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Business Type"
                value={formData.businessType || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Time Zone"
                value={formData.timeZone || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Opening Time"
                value={formData.openingTime || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Closing Time"
                value={formData.closingTime || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <TextField
            label="Working Days"
            value={workingDays.join(', ')}
            fullWidth
            InputProps={{ readOnly: true }}
            sx={{ mb: 1 ,mt:3}}
          />
        </Box>

        {/* Display Branch Information */}
        <Box mb={3}>
          <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Branch Information
          </Typography>
          {(formData.addresses || []).map((address, index) => (
            <Box key={index} mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Branch ID"
                    value={address.id || `Branch ${index + 1}`}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Branch Type"
                    value={address.branchType || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Business Name"
                    value={address.businessName || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address"
                    value={address.address || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Country"
                    value={address.country || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    value={address.state || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    value={address.city || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Pincode"
                    value={address.pincode || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
              <Divider />
            </Box>
          ))}
        </Box>

        {/* Display Uploaded Images */}
        <Box mb={3}>
          <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Uploaded Images
          </Typography>
             {/* Profile Logo */}
             <TextField
            label="Profile Logo"
            value={formData.profileLogo ? formData.profileLogo.name : 'Not uploaded'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          {formData.profileLogo && (
            <img src={URL.createObjectURL(formData.profileLogo)} alt="Profile Logo" style={{ width: '100px', height: '100px' }} />
          )}

          {/* Profile Banner */}
          <TextField
            label="Banner"
            value={formData.profileBanner ? formData.profileBanner.name : 'Not uploaded'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          {formData.profileBanner && (
            <img src={URL.createObjectURL(formData.profileBanner)} alt="Profile Banner" style={{ width: '100px', height: '100px' }} />
          )}
        </Box>

        {/* Display Selected Theme Colors */}
        <Typography variant="h6" gutterBottom>
          Selected Theme Colors
        </Typography>
        <Box>
          <TextField
            label="Primary Theme Color"
            value={primary ? primary : "Not Selected"}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Secondary Theme Color"
            value={secondary ? secondary : "Not Selected"}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
        </Box>

        {/* Display Description */}
        <Box mb={3}>
          <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Description
          </Typography>
          <TextField
            multiline
            rows={4}
            value={formData.description || 'Not provided'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Box>

        {/* Display Social Media Links */}
        <Box mb={3}>
          <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Social Media Links
          </Typography>
          {Object.entries(formData.socialMediaLinks || {}).map(([key, value]) => (
            <TextField
              key={key}
              label={key}
              value={value || 'Not provided'}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          ))}
        </Box>

        {/* Display payment Methods*/}
        <Box mb={4}>
        <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Payment Information
          </Typography>
          <TextField
            label="Currency"
            value={formData.currency || ''}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Instore Payments
            </Typography>
            {instorePayments.length === 1 ? (
              <TextField
                label="Instore Payment"
                value={instorePayments[0] || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            ) : (
              <Box display="flex" flexDirection="row" gap={2}>
                {instorePayments.slice(0, 2).map((payment, index) => (
                  <TextField
                    key={index}
                    label={`Instore Payment ${index + 1}`}
                    value={payment || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                ))}
              </Box>
            )}
          </Box>
          <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              Third Party Integrations
            </Typography>
            {integrations.length === 1 ? (
              <TextField
                label="Third Party Integration"
                value={integrations[0] || ''}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            ) : (
              <Box display="flex" flexDirection="row" gap={2}>
                {integrations.slice(0, 2).map((integration, index) => (
                  <TextField
                    key={index}
                    label={`Third Party Integration ${index + 1}`}
                    value={integration || ''}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
        {/* Display Privacy Policy */}
        <Box mb={3}>
          <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Privacy Policy
          </Typography>
          <TextField
            multiline
            rows={4}
            value={formData.privacyPolicy || 'No privacy policy provided'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Box>

        {/* Display Notifications */}
        <Box mb={3}>
          <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Notifications
          </Typography>
          <TextField
            label="Customer Notification"
            value={formData.customerNotification ? 'On' : 'Off'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Employee Notification"
            value={formData.employeeNotification ? 'On' : 'Off'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Custom Notification"
            value={formData.customNotification ? 'On' : 'Off'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Box>

        {/* Display Document Numbers */}
        <Box mb={3}>
          <Typography variant="h6" bgcolor="#333" color="white" p={2}>
            Document Numbers
          </Typography>
          <TextField
            label="Aadhar Number"
            value={formData.aadharNumber || ''}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
             {/* Aadhar Image */}
      
             {formData.aadharImage && (
            <img src={URL.createObjectURL(formData.aadharImage)} alt="Aadhar Image" style={{ width: '100px', height: '100px' }} />
          )}
          <TextField
            label="PAN Number"
            value={formData.panNumber || ''}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
             {/* PAN Image */}
        
             {formData.panImage && (
            <img src={URL.createObjectURL(formData.panImage)} alt="PAN Image" style={{ width: '100px', height: '100px' }} />
          )}
          <TextField
            label="GST Number"
            value={formData.gstNumber || ''}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
             {/* GST Image */}
             {formData.gstImage && (
            <img src={URL.createObjectURL(formData.gstImage)} alt="GST Image" style={{ width: '100px', height: '100px' }} />
          )}
        </Box>
        
      </Paper>
<Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
    </Box>
  );
}

export default Step8;
