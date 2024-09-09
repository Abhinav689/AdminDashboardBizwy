import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  Paper
} from '@mui/material';

function Step8({ formData }) {
  const { workingDays = [] } = formData;
  const { primary, secondary } = formData;
  const instorePayments = formData.instorePayments || [];
  const integrations = formData.integrations || [];
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
          <TextField
            label="Profile Logo"
            value={formData.profileLogo ? formData.profileLogo.name : 'Not uploaded'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Banner"
            value={formData.profileBanner ? formData.profileBanner.name : 'Not uploaded'}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
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
          <TextField
            label="PAN Number"
            value={formData.panNumber || ''}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="GST Number"
            value={formData.gstNumber || ''}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default Step8;
