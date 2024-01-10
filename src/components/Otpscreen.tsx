import { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import Button from '../components/Button';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loading from './Loading';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';




const StyledOTPInput = styled(TextField)`
  && {
    width: 3em;
    margin: 0 0.2em;
    input {
      text-align: center;
      font-size: 1.5em;
    }
  }
`;

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        www.golinkin.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const OTPConfirmation: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerId);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    setOtp((prevOtp) => {
      const newOtp = prevOtp.split('');
      newOtp[index] = value;
      if (value !== '' && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      return newOtp.join('');
    });
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const savedAccessToken = localStorage.getItem('AccessToken');
      const response = await axios.post(
        'http://localhost:3000/users/sms_confirmation',
        {
          pin: otp,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'token': savedAccessToken,
          },
        }
      );

      console.log('Response:', response);

      if (response.status === 200) {
        localStorage.removeItem('AccessToken');
        localStorage.setItem('AccessToken', response.data.token);

        const userRole = response.data.user.role;

        switch (userRole) {
          case 'jobseeker':
          case 'freelancer':
            navigate('/profile');
            break;
          case 'company':
            navigate('/CompanyProfile');
            break;
          default:
            toast.error('Unknown user role');
        }
      } else {
        toast.error(response.data.status.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong while verifying OTP');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <div className="App">
                <h2 className="otp_text">OTP Confirmation</h2>
                <p className="description_text">
                  Please enter the OTP sent to your registered phone number.
                  {timer === 0 ? (
                    <>
                      <Typography style={{
                        textDecoration: 'underline', color: '#04d9ff', fontWeight: 700, fontSize: '15px', display: 'inline',
                        marginLeft: '10px'
                      }}>
                        Resend OTP?
                      </Typography>
                    </>
                  ) : (
                    `${timer} seconds`
                  )}
                </p>
                <div>
                  {Array.from({ length: 6 }, (_, index) => (
                    <StyledOTPInput
                      key={index}
                      inputRef={(ref) => (inputRefs.current[index] = ref)}
                      id={`otp-input-${index}`}
                      label=""
                      variant="outlined"
                      type="tel"
                      inputProps={{ maxLength: 1 }}
                      value={otp[index] || ''}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                  <br />
                  <br />
                  <Button data-testid="submit" variant="contained" onClick={handleVerifyOtp} sx={{ minWidth: 200, backgroundColor: '#04d9ff' ,
                                                    '&:hover': {
                                                        backgroundColor: '#70e9ff',
                                                    }  }}>
                    Verify OTP
                  </Button>
                </div>

              </div>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
          <ToastContainer />
        </ThemeProvider>

      )}
    </>
  );
};

export default OTPConfirmation;
