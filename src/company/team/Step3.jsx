import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  UploadFile as UploadFileIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const socialMediaOptions = [
  { name: 'Facebook', icon: <FaFacebook color="blue" /> },
  { name: 'Twitter', icon: <FaTwitter color="skyblue" /> },
  { name: 'Instagram', icon: <FaInstagram color="purple" /> },
  // Add more as needed
];

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
  quillEditor: {
    minHeight: '200px',
    marginBottom: '2rem',
    width: '100%',
    color: 'white',
  },
  socialMediaLinks: {
    width: '100%',
    marginTop: '1rem',
  },
  container: {
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%', // Full width
    maxWidth: '1200px', // Increase max width to 1200px
    margin: 'auto',
    marginTop: '2rem',
    backgroundColor: '#333', // Dark background
    color: 'white',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'white',
  },
  themeColors: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
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
  },
};

function Step3({ formData = {}, handleSave }) {
  const [data, setData] = useState({
    profileLogo: formData.profileLogo || null,
    profileBanner: formData.profileBanner || null,
    primary: formData.primary || false,
    secondary: formData.secondary || false,
    description: formData.description || '',
    socialMediaLinks: formData.socialMediaLinks || {},
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setData({
      ...data,
      [name]: files[0],
    });
    handleSave({ ...data, [name]: files[0] });
  };

  const handleDeleteImage = (name) => {
    setData({
      ...data,
      [name]: null,
    });
    handleSave({ ...data, [name]: null });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData({
      ...data,
      [name]: checked,
    });
    handleSave({ ...data, [name]: checked });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    handleSave({ ...data, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setData({
      ...data,
      description: value,
    });
    handleSave({ ...data, description: value });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      socialMediaLinks: {
        ...data.socialMediaLinks,
        [name]: value,
      },
    });
    handleSave({
      ...data,
      socialMediaLinks: {
        ...data.socialMediaLinks,
        [name]: value,
      },
    });
  };

  const handleAddSocialMedia = (name) => {
    setData({
      ...data,
      socialMediaLinks: {
        ...data.socialMediaLinks,
        [name]: '',
      },
    });
    handleSave({
      ...data,
      socialMediaLinks: {
        ...data.socialMediaLinks,
        [name]: '',
      },
    });
    setDialogOpen(false);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={styles.container}>
        <Typography variant="h5" gutterBottom>
          Step 3: Profile Setup
        </Typography>

        <Typography variant="h6">Upload Profile Logo</Typography>
        <Box
          sx={styles.uploadBox}
          onClick={() => document.getElementById('profile-logo-upload').click()}
        >
          <input
            type="file"
            name="profileLogo"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.fileInput}
            id="profile-logo-upload"
          />
          {data.profileLogo ? (
            <>
              <img src={URL.createObjectURL(data.profileLogo)} alt="Profile Logo" style={{ width: '100%', height: '100%' }} />
              <Box position="absolute" bottom="0" display="flex" justifyContent="center" width="100%">
                <IconButton size="small" onClick={() => document.getElementById('profile-logo-upload').click()}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDeleteImage('profileLogo')}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <UploadFileIcon fontSize="large" sx={{ color: 'white' }} />
          )}
        </Box>

        <Typography variant="h6" mt={4}>
          Upload Profile Banner
        </Typography>
        <Box
          sx={styles.uploadBox}
          onClick={() => document.getElementById('profile-banner-upload').click()}
        >
          <input
            type="file"
            name="profileBanner"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.fileInput}
            id="profile-banner-upload"
          />
          {data.profileBanner ? (
            <>
              <img src={URL.createObjectURL(data.profileBanner)} alt="Profile Banner" style={{ width: '100%', height: '100%' }} />
              <Box position="absolute" bottom="0" display="flex" justifyContent="center" width="100%">
                <IconButton size="small" onClick={() => document.getElementById('profile-banner-upload').click()}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDeleteImage('profileBanner')}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <UploadFileIcon fontSize="large" sx={{ color: 'white' }} />
          )}
        </Box>

        <Typography variant="h6">Theme Colors</Typography>
        <Box sx={styles.themeColors}>
          <FormControlLabel
            control={<Checkbox checked={data.primary} onChange={handleCheckboxChange} name="primary" />}
            label="Primary"
            sx={styles.checkboxLabel}
          />
          <FormControlLabel
            control={<Checkbox checked={data.secondary} onChange={handleCheckboxChange} name="secondary" />}
            label="Secondary"
            sx={styles.checkboxLabel}
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          <Typography variant="h6">Description</Typography>
          <ReactQuill
            value={data.description}
            onChange={handleDescriptionChange}
            modules={{
              toolbar: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['image'],
              ],
            }}
            style={styles.quillEditor}
          />
        </Box>

        <Box mt={1} sx={styles.socialMediaLinks}>
          <Typography variant="h6" style={{marginTop:"-9rem"}}>Social Media Links</Typography>
          {Object.keys(data.socialMediaLinks).map((key) => (
            <TextField
              key={key}
              label={key}
              name={key}
              value={data.socialMediaLinks[key]}
              onChange={handleSocialMediaChange}
              fullWidth
              margin="normal"
              sx={styles.textField} // Apply white color styles
            />
          ))}
          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)} sx={{ mt: 2, color: 'white', borderColor: 'white' }}>
            Add Social Media
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            PaperProps={{
              sx: { backgroundColor: 'white', color: 'black' }, // Set dialog background to white and text color to black
            }}
          >
            <DialogTitle>Select Social Media</DialogTitle>
            <DialogContent>
              <List>
                {socialMediaOptions.map((option) => (
                  <ListItem button onClick={() => handleAddSocialMedia(option.name)} key={option.name}>
                    <ListItemAvatar>
                      {option.icon}
                    </ListItemAvatar>
                    <ListItemText primary={option.name} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} sx={{ color: 'black' }}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default Step3;
