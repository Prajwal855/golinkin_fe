import { Box, CssBaseline, InputBase, Paper, Stack, TextareaAutosize, ThemeProvider, Tooltip, Typography, alpha, colors, createTheme, styled } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Button from './Button';

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

const Jobs = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [jobProfiles, setJobProfiles] = useState<any[]>([]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const savedAccessToken = localStorage.getItem("AccessToken");
            const jobsResponse = await axios.get('http://localhost:3000/jobs', {
                headers: {
                    'token': `${savedAccessToken}`,
                },
            });
            setJobProfiles(jobsResponse.data.job_profiles[0]);
        } catch (error) {
            toast.error("Unable to fetch job details");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchJobs();
    }, []);



    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline />
                    <div>
                        <nav>
                            <Link href="/Home">
                                <img src='https://cdn-icons-png.flaticon.com/512/3772/3772209.png' className="nav--icon" alt="Learn Now Logo" />
                            </Link>
                            <h3 className="nav--logo_text">GoLinkIN</h3>
                        </nav>
                        {jobProfiles.length > 0 && (
                            <div style={{ position: 'absolute', left: 200, marginTop: '5%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '10px' }}>
                                        Opennings
                                    </Typography>
                                </Box>
                                {jobProfiles.map((job: any) => (
                                    <Paper key={job.id} sx={{ padding: 2, marginTop: '10px', display: 'flex', alignItems: 'center', minWidth: 500 }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <BusinessCenterIcon sx={{ marginRight: '5px', minHeight: 20, minWidth: 20 }} />
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <Typography variant="h5" style={{ color: '#04d9ff' }}>{job.position}</Typography>
                                            <Typography variant="body1">
                                                Experience: {job.experience}
                                            </Typography>
                                            <Typography variant="body2">Salary: ${job.salary}</Typography>
                                            <Typography variant="body2" style={{ color: 'gray' }}>{timeAgo(job.created_at)}</Typography>
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <Tooltip title="Apply Job" arrow>
                                                <AddCircleOutlineIcon style={{ cursor: 'pointer', color: '#04d9ff' }} />
                                            </Tooltip>
                                        </div>
                                    </Paper>
                                ))}
                            </div>
                        )}
                    </div>
                </ThemeProvider>
            )}

        </>
    );
};

export default Jobs;
