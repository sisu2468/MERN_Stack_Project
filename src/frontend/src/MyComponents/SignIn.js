import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.chargekart.co.in/">
        ChargeKart
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const url = "http://localhost:8000/login";  // The URL of your API endpoint
const username = "your_username";  // The username for sign-in
const password = "your_password";  // The password for sign-in

// Prepare the request data
const data = new URLSearchParams();
data.append("username", username);
data.append("password", password);

// Make the POST request to the API
fetch(url, {
  method: "POST",
  body: data
})
.then(response => {
  if (response.ok) {
    // Extract the response data
    return response.json();
  } else {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
})
.then(responseData => {
  // Access the access token, token type, and role from the response data
  const access_token = responseData.access_token;
  const token_type = responseData.token_type;
  const role = responseData.role;
  // Do whatever you want with the access token, token type, and role
  console.log(`Access Token: ${access_token}`);
  console.log(`Token Type: ${token_type}`);
  console.log(`Role: ${role}`);
})
.catch(error => {
  // Handle the error response
  console.error(error);
});

const theme = createTheme();

const SignIn = () => {
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('Username'),
      password: data.get('password'),
    });
  };

  const LoginSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    if(data.get('Username') === "admin" && data.get('password') === "admin"){
        localStorage.setItem("loggedin", true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="https://static.wixstatic.com/media/8f4dc3_f4330f89a1eb4569bd3a978b642a2850~mv2.png/v1/fill/w_432,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Text.png" width= '100%'/>
          <hr/>
          <hr/>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <hr/>
          <Box component="form" onSubmit={LoginSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn