import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const UserIntro: React.FC = () => {
    const navigate = useNavigate();

    const handleToHire = () => {

        toast.info('Sign Up Your Company To Hire');
        navigate('/CompanySignUp');
    };

    const handleToWork = () => {
        toast.info('Sign Up Your Account To Work');
        navigate('/signup');
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 2,
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
            </Box>
            <Box sx={{ marginLeft: 7, marginTop: 40, maxWidth: 1400 }}>
                <Typography variant="h3" gutterBottom >
                    What are you Looking in GoLinkIn for?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: -10 }}>
                    <Button variant="contained" onClick={handleToHire} sx={{ minWidth: 200, backgroundColor: '#04d9ff' }}>
                        To Hire
                    </Button>
                    <Box sx={{ marginLeft: 2 }}>
                        <Button variant="contained" onClick={handleToWork} sx={{ minWidth: 200, backgroundColor: '#04d9ff' }}>
                            To Work
                        </Button>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider >
    );
};


export default UserIntro;
