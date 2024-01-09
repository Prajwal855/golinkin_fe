import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from "./Typography";
import Button from "./Button";


const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Termsandcondition = () => {
    const [termsandcondition, setTermsandcondition] = useState<string>('');

    const navigate = useNavigate()

    const handleSBack = () => {
        navigate("/signup");
    };

    const fetchtermsandcondition = async () => {
        try {
            const response = await axios.get('http://localhost:3000/termsandconditions/1');
            const termsandcondition = response.data.termsandcondition.name;
            console.log('i got response for terms and condition', response);
            console.log('i got the terms and condition', termsandcondition);
            setTermsandcondition(termsandcondition);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching user role');
        }
    };

    useEffect(() => {
        fetchtermsandcondition();
    }, []);


    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Link href="/signup">
                        <img src='https://cdn-icons-png.flaticon.com/512/3772/3772209.png' className="nav--icon" alt="Learn Now Logo" />
                    </Link>
                    <h3 className="nav--logo_text">GoLinkIn</h3>
                </nav>
            </Box>
            <Box sx={{ marginLeft: 7, marginTop: 10, maxWidth: 1200 }}>
                <Typography variant="h3" gutterBottom>
                    Terms and Conditions
                </Typography>
                <Typography variant="body1" sx={{ marginLeft: 7, marginTop: 8 }}>
                    {termsandcondition}
                </Typography>
            </Box>
            <Button
                variant="text"
                onClick={handleSBack}
                sx={{ position: 'absolute', top: '70px', right: '10px', color: '#04d9ff' }}
            >
                Back
            </Button>
        </ThemeProvider >
    );
};

export default Termsandcondition;
