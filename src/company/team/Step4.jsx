import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Paper,
  IconButton,
  Container,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const currencies = [
  'USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', // Add more currencies as needed
];

const paymentOptions = [
  'Cash Payments', 'UPI', 'Net Banking', 'Credit Cards', 'Debit Cards',
];

const integrationOptions = [
  'Razorpay', 'Stripe', 'PayPal', 'UPI',
];

function Step4({ formData, handleSave }) {
  const [currency, setCurrency] = useState(formData.currency || '');
  const [instorePayments, setInstorePayments] = useState(formData.instorePayments || []);
  const [integrations, setIntegrations] = useState(formData.integrations || []);
  const [openInstoreDialog, setOpenInstoreDialog] = useState(false);
  const [openIntegrationDialog, setOpenIntegrationDialog] = useState(false);

  useEffect(() => {
    handleSave({
      currency,
      instorePayments,
      integrations,
    });
  }, [currency, instorePayments, integrations]);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleInstoreDialogOpen = () => {
    setOpenInstoreDialog(true);
  };

  const handleInstoreDialogClose = () => {
    setOpenInstoreDialog(false);
  };

  const handleIntegrationDialogOpen = () => {
    setOpenIntegrationDialog(true);
  };

  const handleIntegrationDialogClose = () => {
    setOpenIntegrationDialog(false);
  };

  const handleInstorePaymentChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setInstorePayments([...instorePayments, value]);
    } else {
      setInstorePayments(instorePayments.filter(payment => payment !== value));
    }
  };

  const handleIntegrationChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setIntegrations([...integrations, value]);
    } else {
      setIntegrations(integrations.filter(integration => integration !== value));
    }
  };

  const handleInstorePaymentDelete = (payment) => {
    const updatedInstorePayments = instorePayments.filter((p) => p !== payment);
    setInstorePayments(updatedInstorePayments);
  };

  const handleIntegrationDelete = (integration) => {
    const updatedIntegrations = integrations.filter((i) => i !== integration);
    setIntegrations(updatedIntegrations);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Payment Settings
        </Typography>

        {/* Currency Dropdown */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Select Currency
          </Typography>
          <FormControl fullWidth>
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Currency</MenuItem>
              {currencies.map((curr) => (
                <MenuItem key={curr} value={curr}>{curr}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Instore Payments Box */}
        <Box mb={4}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Instore Payments</Typography>
            <Button variant="contained" color="primary" onClick={handleInstoreDialogOpen} startIcon={<AddIcon />}>
              Add Payment
            </Button>
          </Box>
          <Box mt={2}>
            {instorePayments.map((payment, index) => (
              <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography>{payment}</Typography>
                <IconButton onClick={() => handleInstorePaymentDelete(payment)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Third Party Integrations Box */}
        <Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Third Party Integrations</Typography>
            <Button variant="contained" color="primary" onClick={handleIntegrationDialogOpen} startIcon={<AddIcon />}>
              Add Integration
            </Button>
          </Box>
          <Box mt={2}>
            {integrations.map((integration, index) => (
              <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography>{integration}</Typography>
                <IconButton onClick={() => handleIntegrationDelete(integration)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Instore Payments Dialog */}
        <Dialog open={openInstoreDialog} onClose={handleInstoreDialogClose}>
          <DialogTitle>Add Payment Option</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              {paymentOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={instorePayments.includes(option)}
                      onChange={handleInstorePaymentChange}
                      value={option}
                    />
                  }
                  label={option}
                />
              ))}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInstoreDialogClose} color="secondary">Cancel</Button>
            <Button onClick={handleInstoreDialogClose} color="primary">Done</Button>
          </DialogActions>
        </Dialog>

        {/* Third Party Integrations Dialog */}
        <Dialog open={openIntegrationDialog} onClose={handleIntegrationDialogClose}>
          <DialogTitle>Add Integration Option</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              {integrationOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={integrations.includes(option)}
                      onChange={handleIntegrationChange}
                      value={option}
                    />
                  }
                  label={option}
                />
              ))}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleIntegrationDialogClose} color="secondary">Cancel</Button>
            <Button onClick={handleIntegrationDialogClose} color="primary">Done</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}

export default Step4;
