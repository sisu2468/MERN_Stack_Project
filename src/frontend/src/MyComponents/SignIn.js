import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';


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
const theme = createTheme();




const SignIn = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  })
  const nav = useNavigate()




  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // console.log({
  //   //   username: data.get('Username'),
  //   //   password: data.get('password'),
  //   // });

  //   console.log(input.username, input.password)
  //   console.log("username, password")

  //   const url = "http://localhost:80/api/admin/auth/login";  // The URL of your API endpoint
  //   const username = "your_username";  // The username for sign-in
  //   const password = "your_password";  // The password for sign-in

  //   // Prepare the request data
  //   data.append("username", input.username);
  //   data.append("password", input.password);

  //   // Make the POST request to the API
  //   fetch(url, {
  //     method: "POST",
  //     body: data
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         // Extract the response data
  //         return response.json();
  //       } else {
  //         throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //       }
  //     })
  //     .then(responseData => {
  //       // Access the access token, token type, and role from the response data
  //       const access_token = responseData.access_token;
  //       const token_type = responseData.token_type;
  //       const role = responseData.role;
  //       // localStorage.setItem('token',response.data.data.token)
  //       localStorage.setItem("loggedin", true)
  //       // Do whatever you want with the access token, token type, and role
  //       console.log(`Access Token: ${access_token}`);
  //       console.log(`Token Type: ${token_type}`);
  //       console.log(`Role: ${role}`);
  //     })
  //     .catch(error => {
  //       // Handle the error response
  //       console.error(error);
  //     });
  // };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("eifybvc kufyvgul")
    // Create a new FormData object
    const formData = new FormData();
  
    // Append the input values to the formData object
    formData.append('username', input.username);
    formData.append('password', input.password);
  
    // Make the POST request to the API
    fetch('http://localhost:80/api/admin/auth/login', {
      method: 'POST',
      body: formData,
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
        localStorage.setItem("loggedin", true)
        nav("/profile")
      })
      .catch(error => {
        // Handle the error response
        console.error(error);
      });
  };
  





  const LoginSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    if (data.get('Username') === "admin" && data.get('password') === "admin") {
      localStorage.setItem("loggedin", true)
    }
  }

  // console
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
          <img src="https://static.wixstatic.com/media/8f4dc3_f4330f89a1eb4569bd3a978b642a2850~mv2.png/v1/fill/w_432,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Text.png" width='100%' />
          <hr />
          <hr />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <hr />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              value={input.username}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              value={input.username}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
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
              onClick = {handleSubmit}
            >
              Sign In

            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );



//   return (
//     <div className="container">
//         <div className="card mt-4 mx-5">
//             <div className="card-body">
//                 <h5 className="card-title my-3">Log In</h5>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group my-3">
//                         <label htmlFor="exampleInputEmail1">Username</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="exampleInputEmail1"
//                             aria-describedby="emailHelp"
//                             placeholder="Username"
//                             required
//                             name="username" 
//                             value={input.username} 
//                             onChange = {(e)=>setInput({...input,[e.target.name]: e.target.value})}
//                         />
//                         <small id="emailHelp" className="form-text text-muted">
//                             We'll never share your details with anyone else.
//                         </small>
//                     </div>
//                     <div className="form-group ">
//                         <label htmlFor="exampleInputPassword1">Password</label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             id="exampleInputPassword1"
//                             placeholder="Password"
//                             required
//                             name="password" 
//                             value={input.password} 
//                             onChange = {(e)=>setInput({...input,[e.target.name]: e.target.value})}
//                         />
//                     </div>
//                     <div className="my-3 text-center">
//                         <button type="submit" className="btn btn-primary mx-1">
//                         Login
//                         </button>
//                         {/* <button type="submit" className="btn btn-primary mx-1">
//                         Not yet registered?
//                         </button> */}
//                     </div>
                    
//                 </form>
//             </div>
//         </div>
//     </div>
// );
// }
}
export default SignIn