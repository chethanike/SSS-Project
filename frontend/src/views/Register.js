import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignUpForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user_api/user_register', formData);
      console.log('Registration successful', response.data);
      setSnackbar({ open: true, message: 'Registration successful!', severity: 'success' });
      navigate('/login');
      
    } catch (error) {
      console.error('Registration failed', error);
      setSnackbar({ open: true, message: 'Registration failed!', severity: 'error' });
      navigate('/');
    }
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
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '10%',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: '500px', backgroundColor: 'purple', borderRadius: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                inputProps={{ minLength: 6 }} 
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" sx={{ backgroundColor: 'black' }} fullWidth type="submit">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SignUpForm;
