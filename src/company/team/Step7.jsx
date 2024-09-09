import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Divider,
  Paper,
  Container
} from '@mui/material';
import { UploadFile as UploadFileIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

function Step7({ formData = {}, handleSave }) {
  const [aadharImage, setAadharImage] = useState(formData.aadharImage || null);
  const [panImage, setPanImage] = useState(formData.panImage || null);
  const [gstImage, setGstImage] = useState(formData.gstImage || null);
  
  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    setImage(file);
    handleSave({ [e.target.name]: file });
  };

  const handleDeleteImage = (name, setImage) => {
    setImage(null);
    handleSave({ [name]: null });
  };

  return (
    <Container maxWidth="md" style={{marginTop:"30rem"}}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Aadhar Section */}
          <Box width="100%" mb={3}>
            <Typography variant="h5" component="h2" sx={{ bgcolor: '#333', color: 'white', p: 2 }}>
              Aadhar
            </Typography>
            <TextField
              label="Aadhar Number"
              name="aadharNumber"
              value={formData.aadharNumber || ''}
              onChange={(e) => handleSave({ aadharNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Box
              border="2px dashed grey"
              borderRadius="4px"
              width="100%"
              height="200px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              mb={2}
            >
              <input
                type="file"
                name="aadharImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setAadharImage)}
                style={{ display: 'none' }}
                id="aadhar-upload"
              />
              <label htmlFor="aadhar-upload">
                <UploadFileIcon fontSize="large" />
              </label>
              {aadharImage && (
                <Box position="absolute" bottom="0" display="flex" justifyContent="center" width="100%">
                  <IconButton size="small" onClick={() => document.getElementById('aadhar-upload').click()}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteImage('aadharImage', setAadharImage)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 3, width: '100%' }} />

          {/* PAN Card Section */}
          <Box width="100%" mb={3}>
            <Typography variant="h5" component="h2" sx={{ bgcolor: '#333', color: 'white', p: 2 }}>
              PAN Card
            </Typography>
            <TextField
              label="PAN Number"
              name="panNumber"
              value={formData.panNumber || ''}
              onChange={(e) => handleSave({ panNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Box
              border="2px dashed grey"
              borderRadius="4px"
              width="100%"
              height="200px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              mb={2}
            >
              <input
                type="file"
                name="panImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setPanImage)}
                style={{ display: 'none' }}
                id="pan-upload"
              />
              <label htmlFor="pan-upload">
                <UploadFileIcon fontSize="large" />
              </label>
              {panImage && (
                <Box position="absolute" bottom="0" display="flex" justifyContent="center" width="100%">
                  <IconButton size="small" onClick={() => document.getElementById('pan-upload').click()}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteImage('panImage', setPanImage)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 3, width: '100%' }} />

          {/* GST Section */}
          <Box width="100%">
            <Typography variant="h5" component="h2" sx={{ bgcolor: '#333', color: 'white', p: 2 }}>
              GST
            </Typography>
            <TextField
              label="GST Number"
              name="gstNumber"
              value={formData.gstNumber || ''}
              onChange={(e) => handleSave({ gstNumber: e.target.value })}
              fullWidth
              margin="normal"
            />
            <Box
              border="2px dashed grey"
              borderRadius="4px"
              width="100%"
              height="200px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              mb={2}
            >
              <input
                type="file"
                name="gstImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setGstImage)}
                style={{ display: 'none' }}
                id="gst-upload"
              />
              <label htmlFor="gst-upload">
                <UploadFileIcon fontSize="large" />
              </label>
              {gstImage && (
                <Box position="absolute" bottom="0" display="flex" justifyContent="center" width="100%">
                  <IconButton size="small" onClick={() => document.getElementById('gst-upload').click()}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteImage('gstImage', setGstImage)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Step7;
