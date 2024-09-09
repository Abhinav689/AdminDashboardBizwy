import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Typography, Paper, Container } from '@mui/material';

const toolbarOptions = [
  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
  [{size: []}],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ['link', 'image', 'video'],
  ['clean']
];

function Step5({ formData, handleSave }) {
  const [text, setText] = useState(formData.privacyPolicy || '');

  const handleChange = (value) => {
    setText(value);
    handleSave({ privacyPolicy: value });
  };

  return (
    <Container maxWidth="sm" style={{marginTop:"2rem"}}>
      
        <Typography variant="h5" align="center" gutterBottom>
          Privacy Policy
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%' }}>
            <ReactQuill
              value={text}
              onChange={handleChange}
              modules={{ toolbar: toolbarOptions }}
              formats={[
                'header', 'font', 'size',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image', 'video'
              ]}
              style={{ height: '300px', marginBottom: '20px' }}
            />
          </Box>
        </Box>
      
    </Container>
  );
}

export default Step5;
