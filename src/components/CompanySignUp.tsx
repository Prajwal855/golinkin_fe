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

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CompanySignup = () => {
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
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

    if (!email || !phoneNumber || !password || !confirmPassword) {
      setError('All fields are required');
      setEmailError(!email);
      setPhoneNumberError(!phoneNumber);
      setPasswordError(!password);
      setConfirmPasswordError(!confirmPassword);
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
          email: email,
          password: password,
          role: 'company',
          phonenumber: '+' + phoneNumber,
        },
      });
      if (response.data.status.code == 200) {
        toast.success("Account created successfully");
        console.log('i got response', response);
        localStorage.setItem('AccessToken', response.data.status.token);
        navigate('/otp_confirmation');
      } else {
        toast.error(response.data.status.message)
      }
    } catch (error) {
      toast.error('Unable to create Account');
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
                  <br /><br />
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
                  <br /><br />
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
                  <br /><br />
                  <PhoneInput
                    country={'in'}
                    value={phoneNumber}
                    placeholder='Enter Contact Number'
                    onChange={(value) => setPhoneNumber(value)}
                    inputStyle={{ width: '100%', backgroundColor: 'black', color: 'darkgray' }}
                    dropdownStyle={{
                      backgroundColor: 'black',
                      color: 'darkgray'
                    }}
                    containerStyle={{ backgroundColor: 'black', color: 'darkgray' }}
                    buttonStyle={{ color: 'darkgray' }}
                  />

                </form>
                <Button
                  data-testid="submit"
                  variant="contained"
                  type="submit"
                  disabled={!email || !phoneNumber || !password || !confirmPassword}
                  onClick={handleSubmit}
                  sx={{ width: '100%', marginTop: '4%', backgroundColor: '#04d9ff' }}
                >
                  Sign Up
                </Button>

                <Grid item>
                  <Link href="http://localhost:3001/login" variant="body2" style={{ color: '#04d9ff' }}>
                    {"Already have an account? login"}
                  </Link>
                </Grid>
                <ToastContainer />
              </div>
            </Box>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
};

export default CompanySignup;
