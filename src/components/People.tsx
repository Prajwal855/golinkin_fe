import { Box, CssBaseline, Link, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Button from './Button';
import ReactPlayer from 'react-player';

const paperStyle = {
    padding: 2,
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 500,
    marginLeft: '50%',
};

const columnStyle = {
    marginLeft: '10px',
};

const getProfilePhotoUrl = (user: any): string => {
    console.log('photttttttt', user)
    return user?.photo || 'https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png';
};

const IndividualProfile: React.FC<{ user: any }> = ({ user }) => (
    <div>
        <Typography variant="h3" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '65%', marginBottom: '-5%' }}>
            Profile
        </Typography>
        <Paper sx={paperStyle}>
            <div style={columnStyle}>
                <Typography variant="h3" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '10%' }}>
                    Profile
                </Typography>
                <img
                    src={getProfilePhotoUrl(user)}
                    alt="profile"
                    style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div style={{ textAlign: 'left' }}>
                <Typography variant="h5" style={{ color: '#04d9ff' }}>
                    Basic Info
                </Typography>
                <Typography variant="h6" style={{ color: '#fff' }}>
                    {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="h5" style={{ color: '#04d9ff' }}>
                    Skills & knowledge
                </Typography>
                <Typography variant="body1" style={{ color: '#fff' }}>
                    {user.skill}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff' }}>
                    {user.experience}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff' }}>
                    {user.education}
                </Typography>
            </div>
        </Paper>
    </div>
);


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

const Peoples = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [userProfiles, setUserProfiles] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    const fetchIndivialUser = async (userID: string) => {
        try {
            const savedAccessToken = localStorage.getItem("AccessToken");
            const userResponse = await axios.get(`http://localhost:3000/user/${userID}`);
            setSelectedUser(userResponse.data.user);
            console.log('resposssssss', userResponse.data.user)
        } catch (error) {
            toast.error("Unable to fetch job details");
        }
    };

    const videos = [
        'https://www.youtube.com/watch?v=AscYjsBh430',
    ];

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };


    const fetchUsers = async () => {
        try {
            const savedAccessToken = localStorage.getItem("AccessToken");
            const usersResponse = await axios.get('http://localhost:3000/users', {
                headers: {
                    'token': `${savedAccessToken}`,
                },
            });
            console.log('i got response for usesssr', usersResponse);
            setUserProfiles(usersResponse.data.users);
        } catch (error) {
            toast.error("Unable to fetch job details");
        }
    };


    const getProfilePhotoUrl = (user: any): string => {
        return user?.photo || 'https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png';
    };

    useEffect(() => {
        fetchUsers();
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
                        {userProfiles.length > 0 && (
                            <div style={{ position: 'absolute', left: 100, marginTop: '5%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h3" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '10px' }}>
                                        Peoples
                                    </Typography>
                                </Box>
                                {userProfiles.map((user: any) => (
                                    <Paper key={user.id} sx={{ padding: 2, marginTop: '10px', display: 'flex', alignItems: 'center', minWidth: 500, marginLeft: '10px' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <img
                                                src={getProfilePhotoUrl(user)}
                                                alt="profile"
                                                style={{
                                                    width: '150px',
                                                    height: '150px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <Typography variant="h4" style={{ color: '#04d9ff' }}>{user.first_name}  {user.last_name}</Typography>
                                            <Typography variant="body1" style={{ color: 'grey' }}>{user.skill}</Typography>
                                            <Button
                                                type="text"
                                                onClick={() => fetchIndivialUser(user.id)}
                                                sx={{
                                                    top: '-80px',
                                                    right: '-200px',
                                                    color: '#04d9ff',
                                                    maxHeight: 20,
                                                    width: 150,
                                                    '&:hover': {
                                                        backgroundColor: 'transparent',
                                                    },
                                                }}
                                            >
                                                View Info
                                            </Button>
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <PersonAddIcon style={{ cursor: 'pointer', color: '#04d9ff' }} />
                                        </div>
                                    </Paper>
                                ))}
                            </div>
                        )}
                        <div style={{ marginLeft: '20px' }}>
                            {selectedUser && <IndividualProfile user={selectedUser} />}
                        </div>
                        <div style={{ height: '50%', width: '50%', top: '90%', right: '5%', position: 'absolute' }}>
                            <ReactPlayer
                                url={videos[currentVideoIndex]}
                                playing
                                width="100%"
                                height="100%"
                                onEnded={handleVideoEnd}
                            />
                        </div>

                    </div>
                </ThemeProvider>
            )}

        </>
    );
};

export default Peoples;
