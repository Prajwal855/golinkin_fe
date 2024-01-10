import { Box, MenuItem, Stack, TextField } from "@mui/material";
import axios from "axios";
import Button from '../components/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';

const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Companies = () => {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [founded, setFounded] = useState<string>('');
    const [headquarters, setHeadquarters] = useState<string>('');
    const [specialities, setSpecialities] = useState<string>('');
    const [defaultProfilePhotoUrl, setDefaultProfilePhotoUrl] = useState<string>('https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [profilePhotoFileName, setProfilePhotoFileName] = useState('');
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>(defaultProfilePhotoUrl);



    const navigate = useNavigate()


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setError('');
    };
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
        setError('');
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSize(event.target.value);
        setError('');
    };

    const handlewebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWebsite(event.target.value);
        setError('');
    };
    const handleFoundedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFounded(event.target.value);
        setError('');
    };

    const handleHeadQuartersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeadquarters(event.target.value);
        setError('');
    };

    const handleSpecialitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpecialities(event.target.value);
        setError('');
    };

    const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setProfilePhoto(files[0]);
            setProfilePhotoFileName(files[0].name);
            setError("");
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePhotoUrl(e.target?.result as string);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setProfilePhoto(null);
            setProfilePhotoFileName('');
            setProfilePhotoUrl(defaultProfilePhotoUrl);
        }
    };



    const companySpecializations = [
        'Technology',
        'Finance',
        'Healthcare',
        'Retail',
        'Manufacturing',
        'Automotive',
        'Entertainment',
        'Telecommunications',
        'Energy',
        'Education',
        'Consulting',
        'Hospitality',
        'E-commerce',
        'Transportation',
        'Media',
        'Real Estate',
        'Agriculture',
        'Biotechnology',
        'Non-profit',
        'Other',
    ];


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const savedAccessToken = localStorage.getItem("AccessToken");
            const formData = new FormData();
            formData.append('name', name);
            formData.append('company_type', type);
            formData.append('size', size);
            formData.append('photo', profilePhoto as File)
            formData.append('website', website);
            formData.append('founded', founded);
            formData.append('headquarters', headquarters);
            formData.append('specialities', specialities);

            const response = await axios.post('http://localhost:3000/companies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': `${savedAccessToken}`,
                },
            });
            console.log("i got response", response)
            navigate("/Home");
        } catch (error) {
            toast.error("Unable to create Company Profile");
        }
        finally {
            setLoading(true);
        }
    };

    const isSubmitDisabled = () => {
        return (
            !name ||
            !type ||
            !size ||
            !website ||
            !founded ||
            !headquarters
        );
    };

    const handleSkip = () => {
        navigate("/Home");
    };

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
                    <Link href="/">
                        <img src='https://cdn-icons-png.flaticon.com/512/3772/3772209.png' className="nav--icon" alt="Learn Now Logo" />
                    </Link>
                    <h3 className="nav--logo_text">GoLinkIn</h3>
                </nav>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <div className="App">
                        <h1 className="tital_text">Set Up Company Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <Grid item xs={3}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <label
                                        htmlFor="profilePhoto"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                position: 'relative',
                                            }}
                                        >
                                            <img
                                                src={profilePhotoUrl || defaultProfilePhotoUrl}
                                                alt="Profile Preview"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                    </label>
                                    <input
                                        id="profilePhoto"
                                        type="file"
                                        onChange={handleProfilePhotoChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </Grid>


                            <Grid item xs={6} >
                                <Stack sx={{ width: 600 }}>
                                    <Autocomplete
                                        multiple
                                        id="Specialities"
                                        options={companySpecializations}
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Specialities"
                                                variant="outlined"
                                                placeholder="Enter Company Specilaties"
                                                value={specialities || ''}
                                                onChange={handleSpecialitiesChange}
                                            />
                                        )}
                                    />
                                </Stack>
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    placeholder="Enter Company Name"
                                    value={name || ''}
                                    onChange={handleNameChange}
                                    fullWidth
                                />
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <TextField
                                    id="Website"
                                    label="Website"
                                    variant="outlined"
                                    placeholder="Enter Company website"
                                    value={website || ''}
                                    onChange={handlewebsiteChange}
                                    fullWidth
                                />
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <TextField
                                    id="HeadQuarters"
                                    label="Head Quarters"
                                    variant="outlined"
                                    placeholder="location of company...."
                                    value={headquarters || ''}
                                    onChange={handleHeadQuartersChange}
                                    fullWidth
                                />
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <TextField
                                    id="companyType"
                                    label="Company Type"
                                    variant="outlined"
                                    select
                                    fullWidth
                                    value={type || ''}
                                    onChange={handleTypeChange}
                                >
                                    <MenuItem value="Public">Public</MenuItem>
                                    <MenuItem value="Private">Private</MenuItem>
                                    <MenuItem value="Non-profit">Non-profit</MenuItem>
                                </TextField>
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <TextField
                                    id="companySize"
                                    label="Company Size"
                                    variant="outlined"
                                    select
                                    fullWidth
                                    value={size || ''}
                                    onChange={handleSizeChange}
                                >
                                    <MenuItem value="100-1000 Employees">100-1000 Employees</MenuItem>
                                    <MenuItem value="1000-10,000 Employees">1000-10,000 Employees</MenuItem>
                                    <MenuItem value="10,000+ Employees">10,000+ Employees</MenuItem>
                                </TextField>
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <TextField
                                    id="foundedYear"
                                    label="Founded Year"
                                    variant="outlined"
                                    select
                                    fullWidth
                                    value={founded || ''}
                                    onChange={handleFoundedChange}
                                >
                                    {Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => (
                                        <MenuItem key={index} value={(new Date().getFullYear() - index).toString()}>
                                            {(new Date().getFullYear() - index).toString()}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <br />
                            <Grid item xs={12}>
                                <div>
                                    <Button

                                        variant="contained"
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitDisabled()}
                                        sx={{ width: '100%', marginTop: '4%', backgroundColor: '#04d9ff'  ,
                                        '&:hover': {
                                            backgroundColor: '#70e9ff',
                                        }  }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Grid>
                        </form>
                    </div>
                    <Button
                        variant="text"
                        onClick={handleSkip}
                        sx={{ position: 'absolute', top: '70px', right: '10px', color: '#04d9ff' }}
                    >
                        Skip
                    </Button>
                </Box>
            </Box>
        </ThemeProvider >
    );
};

export default Companies;
