import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import '../App.css';
import Loading from './Loading';
import Button from '../components/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import 'react-phone-input-2/lib/bootstrap.css'
import PhoneInput from 'react-phone-input-2';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3001/terms_and_condition">
         www.golinkin.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastnameError, setlastnameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [roleError, setRoleError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
    setError('');
  };
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
    setFirstNameError(false);
    setError('');
  };
  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    setlastnameError(false);
    setError('');
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setError('');
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(false);
    setError('');
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!firstname || !email || !phoneNumber || !password || !confirmPassword || !role) {
      setError('All fields are required');
      setFirstNameError(!firstname);
      setEmailError(!email);
      setPhoneNumberError(!phoneNumber);
      setPasswordError(!password);
      setConfirmPasswordError(!confirmPassword);
      setRoleError(!role);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/users', {
        user: {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
          role: role,
          phonenumber: '+' + phoneNumber,
        },
      });
      if(response.data.status.code == 200){
      toast.success("Account created successfully");
      console.log('i got response', response);
      localStorage.setItem('AccessToken', response.data.status.token);
      navigate('/otp_confirmation');
      }else{
        toast.error(response.data.status.message)
      }
    } catch (error) {
      toast.error('Unable to create activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (

        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 7,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <nav className="fixed-navbar">
              <Link href="/">
                <img src='https://cdn-icons-png.flaticon.com/512/3772/3772209.png' className="nav--icon" alt="Learn Now Logo" />
              </Link>
              <h3 className="nav--logo_text">GoLinkIn</h3>
            </nav>
            <Avatar sx={{ m: 1, bgcolor: '#04d9ff' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <div className="App">
                <h1 className="tital_text">Sign up</h1>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      {/* First Name */}
                      <TextField
                        id="filled-hidden-label-normal"
                        defaultValue=""
                        required
                        label="First Name"
                        variant="outlined"
                        value={firstname}
                        onChange={handleFirstNameChange}
                        placeholder="Enter Your First Name"
                        error={firstNameError}
                        helperText={firstNameError ? 'First Name is required' : ''}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* Last Name */}
                      <TextField
                        id="filled-hidden-label-normal"
                        defaultValue=""
                        required
                        label="Last Name"
                        variant="outlined"
                        placeholder="Enter Your Last Name"
                        value={lastname}
                        onChange={handleLastnameChange}
                        error={lastnameError}
                        helperText={lastnameError ? 'Username is required' : ''}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      {/* Email */}
                      <TextField
                        id="filled-hidden-label-normal"
                        defaultValue=""
                        label="Email"
                        required
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter Your Email"
                        error={emailError}
                        helperText={emailError ? 'Email is required' : ''}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* Password */}
                      <TextField
                        id="filled-hidden-label-normal"
                        type="password"
                        defaultValue=""
                        required
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter Your Password"
                        error={passwordError}
                        helperText={passwordError ? 'Password is required' : ''}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <PhoneInput
                      country={'in'}
                      value={phoneNumber}
                      onChange={(value) => setPhoneNumber(value)}
                      inputStyle={{ width: '100%', backgroundColor: 'black', color: 'darkgray' }}
                      dropdownStyle={{
                        backgroundColor: 'black',
                        color: 'darkgray'
                      }}
                      containerStyle={{ backgroundColor: 'black', color: 'darkgray' }}
                      buttonStyle={{ color: 'darkgray' }}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* Confirm Password */}
                      <TextField
                        id="filled-hidden-label-normal"
                        type="password"
                        defaultValue=""
                        required
                        label="Confirm Password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Enter Your Password"
                        error={confirmPasswordError}
                        helperText={confirmPasswordError ? "Password doesn't match" : ''}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}> 
                    <Grid item xs={12} sm={6}>
                      {/* Gender */}
                      <FormControl sx={{  minWidth: 200, width: '100%' }} size="medium">
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder="Role-type"
                          required
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          label="Gender"
                        >
                          <MenuItem value={'male'}>Male</MenuItem>
                          <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* Role */}
                      <FormControl sx={{ minWidth: 200, width: '100%' }} size="medium">
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          placeholder="Role-type"
                          required
                          value={role}
                          label="Role"
                          onChange={(e) => setRole(e.target.value)}
                          error={roleError}
                        >
                          <MenuItem value={'jobseeker'}>Job Seeker</MenuItem>
                          <MenuItem value={'freelancer'}>Freelancer</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    data-testid="submit"
                    variant="contained"
                    type="submit"
                    disabled={!firstname || !email || !phoneNumber || !role || !password ||!lastname ||!confirmPassword}
                    onClick={handleSubmit}
                    sx={{ width: '100%', marginTop:'4%',  backgroundColor: '#04d9ff'  }}
                  >
                    Sign Up
                  </Button>
                </form>
                <Grid item>
                  <Link href="http://localhost:3001/login" variant="body2" style={{color:'#04d9ff'}}>
                    {"Already have an account? login"}
                  </Link>
                </Grid>
                <ToastContainer />
              </div>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default Signup;
