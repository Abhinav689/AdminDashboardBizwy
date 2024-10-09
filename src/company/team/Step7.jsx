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

const styles = {
  uploadBox: {
    border: '2px dashed grey',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    width: '100%',
    height: '200px',
    marginBottom: '1rem',
  },
  fileInput: {
    display: 'none',
  },
  container: {
    padding: '2rem',
    marginTop: '30rem',
    marginBottom: '2rem',
    backgroundColor: '#333', // Dark background
    color: 'white',
    borderRadius: '8px',
  },
  textField: {
    '& .MuiInputLabel-root': { color: 'white' }, // White label color
    '& .MuiInputBase-input': { color: 'white' }, // White text color
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // White border
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    marginBottom: '1rem',
  },
  sectionTitle: {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem',
    borderRadius: '4px',
  },
  divider: {
    backgroundColor: 'grey',
    marginY: '2rem',
    width: '100%',
  },
  iconButtonBox: {
    position: 'absolute',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
};

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

  const renderImagePreview = (image) => {
    if (image) {
      return (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      );
    }
    return <UploadFileIcon fontSize="large" sx={{ color: 'white' }} />;
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={styles.container}>
        <Box display="flex" flexDirection="column" alignItems="center">
          
          {/* Aadhar Section */}
          <Box width="100%" mb={3}>
            <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
              Aadhar
            </Typography>
            <TextField
              label="Aadhar Number"
              name="aadharNumber"
              value={formData.aadharNumber || ''}
              onChange={(e) => handleSave({ aadharNumber: e.target.value })}
              fullWidth
              sx={styles.textField}
            />
            <Box sx={styles.uploadBox}>
              <input
                type="file"
                name="aadharImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setAadharImage)}
                style={styles.fileInput}
                id="aadhar-upload"
              />
              <label htmlFor="aadhar-upload" style={{ width: '100%', height: '100%' }}>
                {renderImagePreview(aadharImage)}
              </label>
              {aadharImage && (
                <Box sx={styles.iconButtonBox}>
                  <IconButton size="small" onClick={() => document.getElementById('aadhar-upload').click()}>
                    <EditIcon sx={{ color: 'white' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteImage('aadharImage', setAadharImage)}>
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={styles.divider} />

          {/* PAN Card Section */}
          <Box width="100%" mb={3}>
            <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
              PAN Card
            </Typography>
            <TextField
              label="PAN Number"
              name="panNumber"
              value={formData.panNumber || ''}
              onChange={(e) => handleSave({ panNumber: e.target.value })}
              fullWidth
              sx={styles.textField}
            />
            <Box sx={styles.uploadBox}>
              <input
                type="file"
                name="panImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setPanImage)}
                style={styles.fileInput}
                id="pan-upload"
              />
              <label htmlFor="pan-upload" style={{ width: '100%', height: '100%' }}>
                {renderImagePreview(panImage)}
              </label>
              {panImage && (
                <Box sx={styles.iconButtonBox}>
                  <IconButton size="small" onClick={() => document.getElementById('pan-upload').click()}>
                    <EditIcon sx={{ color: 'white' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteImage('panImage', setPanImage)}>
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={styles.divider} />

          {/* GST Section */}
          <Box width="100%">
            <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
              GST
            </Typography>
            <TextField
              label="GST Number"
              name="gstNumber"
              value={formData.gstNumber || ''}
              onChange={(e) => handleSave({ gstNumber: e.target.value })}
              fullWidth
              sx={styles.textField}
            />
            <Box sx={styles.uploadBox}>
              <input
                type="file"
                name="gstImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setGstImage)}
                style={styles.fileInput}
                id="gst-upload"
              />
              <label htmlFor="gst-upload" style={{ width: '100%', height: '100%' }}>
                {renderImagePreview(gstImage)}
              </label>
              {gstImage && (
                <Box sx={styles.iconButtonBox}>
                  <IconButton size="small" onClick={() => document.getElementById('gst-upload').click()}>
                    <EditIcon sx={{ color: 'white' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteImage('gstImage', setGstImage)}>
                    <DeleteIcon sx={{ color: 'white' }} />
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
