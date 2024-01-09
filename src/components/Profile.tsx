import { Box, Stack, TextField } from "@mui/material";
import axios from "axios";
import Button from '../components/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Typography from "./Typography";

const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Profiles = () => {
    const [experiance, setExperiance] = useState<string>('');
    const [defaultProfilePhotoUrl, setDefaultProfilePhotoUrl] = useState<string>('https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png');
    const [education, setEducation] = useState<string>('');
    const [cv, setCV] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [cvFileName, setCVFileName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [profilePhotoFileName, setProfilePhotoFileName] = useState('');
    const [skill, setSkill] = useState<string[]>([]);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>(defaultProfilePhotoUrl);



    const navigate = useNavigate()


    const handleExperianceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperiance(event.target.value);
        setError('');
    };
    const handleSkillChange = (event: React.ChangeEvent<{}>, value: string[]) => {
        setSkill(value);
    };

    const handleEducationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEducation(event.target.value);
        setError('');
    };

    const handleCVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setCV(files[0]);
            setCVFileName(files[0].name);
            setError("");
        }
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



    const hardcodedSkills = [
        'JavaScript',
        'React',
        'Node.js',
        'HTML',
        'CSS',
        'TypeScript',
        'Python',
        'Java',
        'Angular',
        'Vue.js',
        'Express.js',
        'Django',
        'MongoDB',
        'SQL',
        'Git',
        'Redux',
        'Sass',
        'GraphQL',
        'REST API',
        'Responsive Design',
    ];


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const savedAccessToken = localStorage.getItem("AccessToken");
            const formData = new FormData();
            formData.append('skill', skill.join(','));
            formData.append('experience', experiance);
            formData.append('cv', cv as File);
            formData.append('photo', profilePhoto as File)

            const response = await axios.post('http://localhost:3000/profiles', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': `${savedAccessToken}`,
                },
            });
            console.log("i got response", response)
            navigate("/Quiz_form");
        } catch (error) {
            toast.error("Unable to create activity");
        }
        finally {
            setLoading(true);
        }
    };

    const isSubmitDisabled = () => {
        return (
            !education ||
            !experiance ||
            !cv
        );
    };

    const handleSkip = () => {
        navigate("/Quiz_form");
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
                        <h1 className="tital_text">Set Up Profile</h1>
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
                                <Stack sx={{ width: 500 }}>
                                    <Autocomplete
                                        multiple
                                        id="skill"
                                        options={hardcodedSkills}
                                        getOptionLabel={(option) => option}
                                        onChange={handleSkillChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Skill"
                                                variant="outlined"
                                                placeholder="Enter your skill"
                                                value={skill}
                                            />
                                        )}
                                    />
                                </Stack>
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <TextField
                                    id="education"
                                    label="Education"
                                    variant="outlined"
                                    placeholder="Enter your education"
                                    value={education || ''}
                                    onChange={handleEducationChange}
                                    fullWidth
                                />
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <TextField
                                    id="experience"
                                    label="Experience"
                                    variant="outlined"
                                    placeholder="Enter your Experience"
                                    value={experiance || ''}
                                    onChange={handleExperianceChange}
                                    fullWidth
                                />
                            </Grid>
                            <br /><br />
                            <Grid item xs={6}>
                                <label
                                    htmlFor="cv"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '80px',
                                        color: 'black',
                                        width: '200px',
                                        height: '40px',
                                    }}
                                >
                                    <CloudUploadIcon sx={{ marginRight: 1, color: cvFileName ? 'green' : 'blue', flexShrink: 0 }} />
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>
                                        {cvFileName ? <p style={{ color: '#04d9ff' }}>{cvFileName}</p> : 'Upload CV'}
                                    </div>
                                </label>
                                <input
                                    id="cv"
                                    type="file"
                                    onChange={handleCVChange}
                                    style={{ display: 'none' }}
                                />
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <div>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitDisabled()}
                                        sx={{ width: '100%', marginTop: '4%', backgroundColor: '#04d9ff' }}
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

export default Profiles;
