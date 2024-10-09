import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, MenuItem, Box, Popover, Typography, Paper
} from '@mui/material';

function Step2({ formData, handleSave }) {
  const [open, setOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    branchType: '',
    businessName: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: ''
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedAddress, setEditedAddress] = useState({});

  const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const response = await fetch(config.cUrl, { headers: { "X-CSCAPI-KEY": config.ckey } });
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  };

  const loadStates = async (countryCode) => {
    try {
      const response = await fetch(`${config.cUrl}/${countryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } });
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error loading states:', error);
    }
  };

  const loadCities = async (countryCode, stateCode) => {
    try {
      const response = await fetch(`${config.cUrl}/${countryCode}/states/${stateCode}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });

    if (name === 'country') {
      setStates([]);
      setCities([]);
      loadStates(value);
    }

    if (name === 'state') {
      setCities([]);
      loadCities(addressData.country, value);
    }
  };

  const handleAddAddress = () => {
    const updatedFormData = {
      ...formData,
      addresses: [...(formData.addresses || []), addressData]
    };
    handleSave(updatedFormData);
    setOpen(false);
  };

  const handleEditAddress = (address) => {
    setEditMode(true);
    setEditedAddress(address);
    setAddressData(address);
    setOpen(true);
  };

  const handleDeleteAddress = (address) => {
    const updatedFormData = {
      ...formData,
      addresses: formData.addresses.filter((a) => a !== address)
    };
    handleSave(updatedFormData);
  };

  const handlePopoverOpen = (event, address) => {
    setAnchorEl(event.currentTarget);
    setEditedAddress(address);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: '800px', backgroundColor: '#333', color: 'white' }}>
        <Typography variant="h4" gutterBottom textAlign="center">Branch Information</Typography>
        <Table sx={{ color: 'white' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Business Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Branch Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Phone Number</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(formData.addresses || []).map((address, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'white' }}>{index + 1}</TableCell>
                <TableCell sx={{ color: 'white' }}>{address.businessName}</TableCell>
                <TableCell sx={{ color: 'white' }}>{address.branchType}</TableCell>
                <TableCell sx={{ color: 'white' }}>{formData.email}</TableCell>
                <TableCell sx={{ color: 'white' }}>{formData.phone}</TableCell>
                <TableCell sx={{ color: 'white' }}>{address.address}</TableCell>
                <TableCell>
                  <Button
                    aria-owns={anchorEl ? 'simple-popper' : undefined}
                    aria-haspopup="true"
                    onClick={(event) => handlePopoverOpen(event, address)}
                    sx={{ color: 'white', ml: 1 }}
                  >
                    ...
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outlined" onClick={() => setOpen(true)} sx={{ mt: 2, color: 'white', borderColor: 'white' }}>Add Address</Button>
        <Popover
          id="simple-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, color: 'black' }}>
            <Button onClick={() => handleEditAddress(editedAddress)}>Edit</Button>
            <Button onClick={() => handleDeleteAddress(editedAddress)}>Delete</Button>
          </Box>
        </Popover>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" sx={{ color: 'white', backgroundColor: '#333' }}>{editMode ? 'Edit Address' : 'Add Address'}</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#333', color: 'white' }}>
            <TextField
              label="Branch Type"
              name="branchType"
              value={addressData.branchType}
              onChange={handleChange}
              fullWidth
              margin="normal"
              select
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ color: 'white' }}
            >
              <MenuItem value="main">Main</MenuItem>
              <MenuItem value="temporary">Temporary</MenuItem>
            </TextField>
            <TextField
              label="Business Name"
              name="businessName"
              value={addressData.businessName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ color: 'white' }}
            />
            <TextField
              label="Address"
              name="address"
              value={addressData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ color: 'white' }}
            />
            <TextField
              label="Country"
              name="country"
              value={addressData.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
              select
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ color: 'white' }}
            >
              {countries.map((country) => (
                <MenuItem key={country.iso2} value={country.iso2}>{country.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="State"
              name="state"
              value={addressData.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
              select
              disabled={!states.length}
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ color: 'white' }}
            >
              {states.map((state) => (
                <MenuItem key={state.iso2} value={state.iso2}>{state.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="City"
              name="city"
              value={addressData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
              select
              disabled={!cities.length}
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ color: 'white' }}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Pincode"
              name="pincode"
              value={addressData.pincode}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ color: 'white' }}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#333' }}>
            <Button onClick={() => setOpen(false)} sx={{ color: 'white' }}>Cancel</Button>
            <Button
              sx={{ color: 'white' }}
              onClick={editMode ? () => {
                const updatedFormData = {
                  ...formData,
                  addresses: formData.addresses.map((a) => a === editedAddress ? addressData : a)
                };
                handleSave(updatedFormData);
                setOpen(false);
                setEditMode(false);
              } : handleAddAddress}
            >
              {editMode ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}

export default Step2;
