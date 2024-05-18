import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, IconButton, Snackbar, Alert, TextField } from '@mui/material';
import axios from 'axios';
import Header from '../components/header';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MyCodes() {
  const [codes, setCodes] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [editedCodes, setEditedCodes] = useState({});

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/code/api/get', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCodes(response.data);
      // Initialize editedCodes state with default values
      const initialEditedCodes = {};
      response.data.forEach(code => {
        initialEditedCodes[code._id] = { title: code.title, code: code.code };
      });
      setEditedCodes(initialEditedCodes);
    } catch (error) {
      console.error('Failed to fetch codes', error);
    }
  };

  const handleDelete = async (codeId) => {
    try {
      await axios.delete(`http://localhost:3001/code/api/delete/${codeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCodes(codes.filter((code) => code._id !== codeId));
      setSnackbar({ open: true, message: 'Code deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Failed to delete code', error);
      setSnackbar({ open: true, message: 'Failed to delete code', severity: 'error' });
    }
  };

  const handleUpdate = async (codeId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/code/api/update/${codeId}`,
        {
          title: editedCodes[codeId].title,
          code: editedCodes[codeId].code
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Updated code:', response.data);
      setSnackbar({ open: true, message: 'Code updated successfully', severity: 'success' });
      window.location.reload();
    } catch (error) {
      console.error('Failed to update code', error);
      setSnackbar({ open: true, message: 'Failed to update code', severity: 'error' });
    }
  };

  const handleInputChange = (e, codeId, field) => {
    // Update the editedCodes state with the new value
    setEditedCodes(prevState => ({
      ...prevState,
      [codeId]: {
        ...prevState[codeId],
        [field]: e.target.value
      }
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Header />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: '20px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          color: 'black',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          padding: '10px 20px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        My Codes
      </Typography>
      <Box sx={{ width: '80%', maxWidth: '800px', marginBottom: 2 }}>
        {codes.map((code) => (
          <Paper key={code._id} elevation={3} sx={{ padding: 2, marginBottom: 2,backgroundColor: '#F0FA20' }}>
            <TextField
              label="Title"
              fullWidth
              value={editedCodes[code._id]?.title || ''}
              onChange={(e) => handleInputChange(e, code._id, 'title')}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Code"
              fullWidth
              multiline
              minRows={10}
              value={editedCodes[code._id]?.code || ''}
              onChange={(e) => handleInputChange(e, code._id, 'code')}
              sx={{ marginBottom: 2}}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => handleDelete(code._id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleUpdate(code._id)}>
                <EditIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MyCodes;
