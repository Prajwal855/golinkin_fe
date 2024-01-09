import { Autocomplete, Box, Link, Modal, Paper, TextField } from "@mui/material";
import axios from "axios";
import Button from '../components/Button';
import { useEffect, useState } from "react";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from "./Typography";


const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const timeAgo = (timestamp: string) => {
    const currentDate = new Date();
    const createdAt = new Date(timestamp);
    const timeDifference = currentDate.getTime() - createdAt.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours}hr ago`;
    } else if (minutes > 0) {
        return `${minutes}min ago`;
    } else {
        return 'Just now';
    }
};

interface CompanyData {
    id: string;
    type: string;
    name: string;
    company_type: string;
    size: string;
    website: string;
    founded: string;
    headquarters: string;
    specialities: string;
    photo: string | null;
}

const CreateJob = () => {
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [jobProfiles, setJobProfiles] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [position, setPosition] = useState<string>('');
    const [experience, setExperience] = useState<string>('');
    const [salary, setSalary] = useState<number>(0);
    const [skillrequired, setSkillrequired] = useState<string[]>([]);
    const [smalldescription, setSmalldescription] = useState<string>('');

    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(event.target.value);
    };

    const handleExperianceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperience(event.target.value);
    };

    const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSalary(Number(event.target.value));
    };

    const handleSkillChange = (event: React.ChangeEvent<{}>, value: string[]) => {
        setSkillrequired(value);
        console.log('skilsssssssssssssssss', skillrequired)
    };

    const handleSmallDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSmalldescription(event.target.value);
    };

    const fetchJobs = async () => {
        try {
            const savedAccessToken = localStorage.getItem("AccessToken");
            const jobsResponse = await axios.get('http://localhost:3000/company_jobs', {
                headers: {
                    'token': `${savedAccessToken}`,
                },
            });
            setJobProfiles(jobsResponse.data.job_profiles[0]);
        } catch (error) {
            toast.error("Unable to fetch job details");
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedAccessToken = localStorage.getItem("AccessToken");
                const companyResponse = await axios.get('http://localhost:3000/companies/:id', {
                    headers: {
                        'token': `${savedAccessToken}`,
                    },
                });
                console.log('profiles', companyResponse.data.company);
                setCompanyData(companyResponse.data.company as CompanyData);
                const jobsResponse = await axios.get('http://localhost:3000/company_jobs', {
                    headers: {
                        'token': `${savedAccessToken}`,
                    },
                });
                setJobProfiles(jobsResponse.data.job_profiles[0]);
            } catch (error) {
                toast.error("Unable to fetch company and job details");
            }
        };

        fetchData();
    }, []);

    const getProfilePhotoUrl = () => {
        return companyData?.photo || 'https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png';
    };

    const handleCreateJobs = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setPosition('');
        setExperience('');
        setSalary(0);
        setSkillrequired([]);
        setSmalldescription('');
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const savedAccessToken = localStorage.getItem("AccessToken");

            if (companyData) {
                const formData = new FormData();
                formData.append('position', position);
                formData.append('experience', experience);
                formData.append('salary', salary.toString());
                formData.append('skills_required', skillrequired.join(','));
                formData.append('small_description', smalldescription);
                formData.append('company_id', companyData.id);

                const response = await axios.post('http://localhost:3000/jobs', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'token': `${savedAccessToken}`,
                    },
                });
                console.log("Response from API", response);
                handleCloseModal();
                await fetchJobs();
            } else {
                toast.error("Company data is null. Unable to create job.");
            }
        } catch (error) {
            console.error("Error creating job:", error);
            toast.error("Unable to create job");
        }
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
                    <Link href="/Home">
                        <img src='https://cdn-icons-png.flaticon.com/512/3772/3772209.png' className="nav--icon" alt="Learn Now Logo" />
                    </Link>
                    <h3 className="nav--logo_text">GoLinkIn</h3>
                </nav>
                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div className="App">
                        {companyData && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginLeft: '-100%', marginTop: '10%' }}>
                                    <img
                                        src={getProfilePhotoUrl()}
                                        alt="Company Logo"
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div style={{ marginLeft: '30px', textAlign: 'left' }}>
                                    <Typography variant="h5" style={{ color: '#04d9ff', marginBottom: '8px' }}>
                                        {companyData.name}
                                    </Typography>
                                    <Typography variant="body1" style={{ color: 'gray', marginBottom: '4px' }}>
                                        Size: {companyData.size}
                                    </Typography>
                                    <Typography variant="body1" style={{ color: 'gray', marginBottom: '4px' }}>
                                        Website: {companyData.website}
                                    </Typography>
                                    <Typography variant="body1" style={{ color: 'gray', marginBottom: '4px' }}>
                                        Founded: {companyData.founded}
                                    </Typography>
                                    <Typography variant="body1" style={{ color: 'gray', marginBottom: '4px' }}>
                                        Head Quarters: {companyData.headquarters}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        <Button
                            size="large"
                            variant="text"
                            component="a"
                            sx={{ position: 'absolute', top: '70px', right: '10px', color: '#04d9ff' }}
                            onClick={handleCreateJobs}
                        >
                            +  Create Job
                        </Button>
                    </div>

                </Box>
            </Box>
            {jobProfiles.length > 0 && (
                <div>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h4" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '10px' }}>
                            Opennings
                        </Typography>
                    </Box>
                    {jobProfiles.map((job: any) => (
                        <Paper key={job.id} sx={{ padding: 2, marginTop: '10px', display: 'flex', alignItems: 'center', minWidth: 500 }}>
                            <div style={{ marginRight: '20px' }}>
                                <BusinessCenterIcon sx={{ marginRight: '5px', minHeight: 200, minWidth: 200 }} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <Typography variant="h5" style={{ color: '#04d9ff' }}>{job.position}</Typography>
                                <Typography variant="body1" style={{ color: 'gray' }}>
                                    Experience: {job.experience}
                                </Typography>
                                <Typography variant="body2" style={{ color: 'gray' }}>Salary: ${job.salary}</Typography>
                                <Typography variant="body2" style={{ color: 'gray' }}>Skill: {job.skills_required}</Typography>
                                <Typography variant="body2" style={{ color: 'gray' }}>{job.small_description}</Typography>
                                <Typography variant="body2" style={{ color: 'gray' }}>{timeAgo(job.created_at)}</Typography>
                            </div>
                        </Paper>
                    ))}
                </div>
            )}

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ width: 500, height: 600, margin: 'auto', marginTop: '50px', overflowY: 'auto' }}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6" style={{ marginLeft: "35%", fontWeight: 600, color: '#04d9ff', marginBottom: "3%" }}>Create Job</Typography>
                        <TextField
                            id="filled-hidden-label-normal"
                            defaultValue=""
                            label="Position"
                            required
                            variant="outlined"
                            value={position}
                            onChange={handlePositionChange}
                            placeholder="Enter Position"
                            sx={{ width: '100%' }}
                        />
                        <br /><br />
                        <TextField
                            id="filled-hidden-label-normal"
                            defaultValue=""
                            label="Experiance"
                            required
                            variant="outlined"
                            value={experience}
                            onChange={handleExperianceChange}
                            placeholder="Enter Experiance Required"
                            sx={{ width: '100%' }}
                        />
                        <br /><br />
                        <TextField
                            id="filled-hidden-label-normal"
                            defaultValue=""
                            label="Salary"
                            required
                            variant="outlined"
                            value={salary}
                            onChange={handleSalaryChange}
                            placeholder="Enter Salary Range"
                            sx={{ width: '100%' }}
                        />
                        <br /><br />
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
                                    placeholder="Enter Skill Required"
                                    value={skillrequired || ''}
                                />
                            )}
                        />
                        <br />
                        <TextField
                            id="filled-hidden-label-normal"
                            defaultValue=""
                            label="Description"
                            required
                            variant="outlined"
                            value={smalldescription}
                            onChange={handleSmallDescriptionChange}
                            placeholder="Enter the job Requirements(Optinal)"
                            sx={{ width: '100%' }}
                        />
                        <br /><br />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box sx={{ marginLeft: 2 }}>
                                <Button variant="contained" onClick={handleSubmit} sx={{ maxHeight: 30, minWidth: 70, backgroundColor: '#04d9ff' }}>
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};


export default CreateJob;
