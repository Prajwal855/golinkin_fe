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
import ReactPlayer from 'react-player';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Button from './Button';



const rightLink = {
  fontSize: 20,
  color: 'common.white',
  ml: 3,
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.3, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    Height: '100%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [jobProfiles, setJobProfiles] = useState<any[]>([]);
  const [userProfiles, setUserProfiles] = useState<any[]>([]);
  const [companyProfiles, setCompanyProfiles] = useState<any[]>([]);
  const [postDetails, setPostDetails] = useState<any[]>([]);
  const [post, setPost] = useState<string>('');
  const [visiblePeople, setVisiblePeople] = useState(3);
  const [visibleCompanies, setVisibleCompanies] = useState(3);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const handleViewMoreCompanies = () => {
    setVisibleCompanies((prevVisibleCompanies) => prevVisibleCompanies + 3);
  };

  const handlePostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };

  const videos = [
    'https://www.youtube.com/watch?v=AscYjsBh430',
    'https://www.youtube.com/watch?v=Way9Dexny3w&t=61s',
    'https://www.youtube.com/watch?v=_YUzQa_1RCE&t=8s',
    'https://www.youtube.com/watch?v=U2Qp5pL3ovA',
    'https://www.youtube.com/watch?v=gCcx85zbxz4&t=36s',
    'https://www.youtube.com/watch?v=dZOaI_Fn5o4&t=10s',
    'https://www.youtube.com/watch?v=dL2kMkVafX0',
    'https://www.youtube.com/watch?v=FQFHDOP53GE',
    'https://www.youtube.com/watch?v=k_9tDtXYLq8',
    'https://www.youtube.com/watch?v=wL8DVHuWI7Y',
    'https://www.youtube.com/watch?v=YIhQoT4ZlPo',
  ];

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };


  const handleLogoutClick = async () => {
    setLoading(true);
    try {
      toast.success('Logout Successful');
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('Questions');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Unable to logout');
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = () => {
    navigate('/Chat');
  };

  const handleCreateJobsClick = () => {
    setLoading(true);
    navigate('/CreateJobs');
  };

  const handlePeopleClick = () => {
    setLoading(true);
    navigate('/People');
  };

  const handleArticalsClick = async () => {
    setLoading(true);
    navigate('/Articales');
  };
  const handleJobsClick = async () => {
    setLoading(true);
    navigate('/Jobs');
  };
  const [userRole, setUserRole] = useState('');

  const fetchUserRole = async () => {
    setLoading(true);
    try {
      const savedAccessToken = localStorage.getItem('AccessToken');
      if (!savedAccessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.get('http://localhost:3000/specific_account', {
        headers: {
          token: savedAccessToken,
        },
      });

      const role = response.data.user.role;
      console.log('i got response for user', response);
      console.log('i got the role', role);
      setUserRole(role);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching user role');
    }
    finally {
      setLoading(false);
    }
  };

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

  const fetchUsers = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const savedAccessToken = localStorage.getItem("AccessToken");
      const blogsResponse = await axios.get('http://localhost:3000/blogs', {
        headers: {
          'token': `${savedAccessToken}`,
        },
      });
      console.log('i got response for Companies', blogsResponse.data.blogs);
      setPostDetails(blogsResponse.data.blogs);
    } catch (error) {
      toast.error("Unable to fetch Companies details");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const savedAccessToken = localStorage.getItem("AccessToken");
      const companiesResponse = await axios.get('http://localhost:3000/companies', {
        headers: {
          'token': `${savedAccessToken}`,
        },
      });
      console.log('i got response for Companies', companiesResponse.data.companies[0].data);
      setCompanyProfiles(companiesResponse.data.companies[0].data);
    } catch (error) {
      toast.error("Unable to fetch Companies details");
    } finally {
      setLoading(false);
    }
  };

  const getProfilePhotoUrl = (user: any): string => {
    return user?.photo || 'https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png';
  };

  const getCompanyProfilePhotoUrl = (company: any): string => {
    return company?.attributes?.photo || 'https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png';
  };

  const getUserProfilePhotoUrl = (blog: any): string => {
    return blog?.user?.photo || 'https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png';
  };

  useEffect(() => {
    fetchUserRole();
    fetchJobs();
    fetchUsers();
    fetchCompanies();
    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const savedAccessToken = localStorage.getItem("AccessToken");
      const formData = new FormData();
      formData.append('post', post);
      const response = await axios.post('http://localhost:3000/blogs', formData, {
        headers: {
          'token': `${savedAccessToken}`,
        },
      });
      console.log("Response from API", response);
      setPost('');
      await fetchBlogs();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <div>
            <nav>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3772/3772209.png"
                alt="Learn Now Logo"
                className="nav--icon"
              />
              <h3 className="nav--logo_text">GoLinkIN</h3>

              <Stack spacing={3} direction="row" alignItems="center">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{ color: 'white' }} />
                </Search>
                {userRole === 'jobseeker' || userRole === 'freelancer' ? (
                  <>
                    <Tooltip title="Articles" arrow>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1055/1055682.png"
                        className="nav--icon"
                        alt="Article Logo"
                        onClick={handleArticalsClick}
                      />
                    </Tooltip>
                    <Tooltip title="Jobs" arrow>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3850/3850285.png"
                        className="nav--icon"
                        alt="Jobs Logo"
                        onClick={handleJobsClick}
                      />
                    </Tooltip>
                    <Link
                      color="inherit"
                      variant="h6"
                      underline="none"
                      href="/Quiz_form"
                      sx={rightLink}
                    >
                      {'Take Quiz'}
                    </Link>
                  </>
                ) : userRole === 'company' ? (
                  <>
                    <Tooltip title="Articles" arrow>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1055/1055682.png"
                        className="nav--icon"
                        alt="Article Logo"
                        onClick={handleArticalsClick}
                      />
                    </Tooltip>
                    <Tooltip title="People" arrow>
                      <img
                        src="https://www.shutterstock.com/shutterstock/videos/1068904214/thumb/8.jpg?ip=x480"
                        className="nav--icon"
                        alt="People Logo"
                        onClick={handlePeopleClick}
                      />
                    </Tooltip>
                    <Tooltip title="Create Job" arrow>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3850/3850285.png"
                        className="nav--icon"
                        alt="Jobs Logo"
                        onClick={handleCreateJobsClick}
                      />
                    </Tooltip>
                  </>
                ) : null}

                <div>
                  <Link
                    variant="h6"
                    underline="none"
                    sx={{ ...rightLink, color: '#04d9ff' }}
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Link>
                </div>
              </Stack>
            </nav>
            <div style={{ height: '100vh' }}>
              <ReactPlayer
                url={videos[currentVideoIndex]}
                playing
                width="100%"
                height="100%"
                onEnded={handleVideoEnd}
              />
            </div>
            <Tooltip title="Chat" arrow placement="right">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7598/7598651.png"
                className="nav--icon"
                alt="Chat Logo"
                onClick={handleChatClick}
                style={{ position: 'absolute', marginTop: '-120px', right: '60px' }}
              />
            </Tooltip>
            {jobProfiles.length > 0 && (
              <div style={{ position: 'absolute', right: '5px', marginRight: '10px', marginTop: '5%' }}>
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
            {userProfiles.length > 0 && (
              <div style={{ position: 'absolute', left: '5px', marginLeft: '10px', marginTop: '5%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '10px' }}>
                    Peoples
                  </Typography>
                </Box>
                {userProfiles.slice(0, visiblePeople).map((user: any) => (
                  <Paper key={user.id} sx={{ padding: 2, marginTop: '10px', display: 'flex', alignItems: 'center', minWidth: 300 }}>
                    <div style={{ marginRight: '10px' }}>
                      <img
                        src={getProfilePhotoUrl(user)}
                        alt="profile"
                        style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <Typography variant="h6" style={{ color: '#04d9ff' }}>{user.first_name}  {user.last_name}</Typography>
                      <Typography variant="body1" style={{ color: 'grey' }}>{user.skill}</Typography>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <Tooltip title="Friend Request" arrow>
                        <PersonAddIcon style={{ cursor: 'pointer', color: '#04d9ff' }} />
                      </Tooltip>
                    </div>
                  </Paper>
                ))}
                {userProfiles.length > visiblePeople && (
                  <Button
                    variant="text" onClick={handlePeopleClick} style={{ color: '#04d9ff' }}>View more</Button>
                )}
              </div>
            )}

            {companyProfiles.length > 0 && (
              <div style={{ position: 'absolute', left: '5px', marginLeft: '10px', marginTop: '35%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '10px' }}>
                    Companies
                  </Typography>
                </Box>
                {companyProfiles.slice(0, visibleCompanies).map((company: any) => (
                  <Paper key={company.id} sx={{ padding: 2, marginTop: '10px', display: 'flex', alignItems: 'center', minWidth: 300 }}>
                    <div style={{ marginRight: '10px' }}>
                      <img
                        src={getCompanyProfilePhotoUrl(company)}
                        alt="company profile"
                        style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <Typography variant="h6" style={{ color: '#04d9ff' }}>{company.attributes.name}</Typography>
                      <Typography variant="body1" style={{ color: 'grey' }}>{company.attributes.company_type}</Typography>
                      <Typography variant="body1" style={{ color: 'grey' }}>{company.attributes.headquarters}</Typography>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <Tooltip title="Follow" arrow>
                        <GroupAddIcon style={{ cursor: 'pointer', color: '#04d9ff' }} />
                      </Tooltip>
                    </div>
                  </Paper>
                ))}
                {companyProfiles.length > visibleCompanies && (
                  <Button
                    variant="text" onClick={handleViewMoreCompanies} style={{ color: '#04d9ff' }}>View more</Button>
                )}
              </div>
            )}
            <div style={{ position: 'absolute', left: '25%', marginTop: '5%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '10px' }}>
                  What do you want to talk about?
                </Typography>
              </Box>
              <Paper sx={{ padding: 2, marginTop: '10px', display: 'flex', alignItems: 'center', minWidth: 570 }}>
                <div style={{ textAlign: 'left' }}>
                  <TextareaAutosize
                    minRows={3}
                    placeholder="What's on your Mind..."
                    style={{ width: '170%', backgroundColor: 'black', color: 'white', fontSize: '20px' }}
                    value={post || ''}
                    onChange={handlePostChange}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ marginTop: '3%', backgroundColor: '#04d9ff', maxWidth: 70, maxHeight: 30, left: 470 }}
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                </div>
              </Paper>
            </div>
            <div style={{ position: 'absolute', left: '25%', marginTop: '20%' }}>
              {postDetails.length > 0 && (
                <div>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#04d9ff', marginLeft: '10px' }}>
                      Blogs
                    </Typography>
                  </Box>
                  {postDetails.map((blog: any) => (
                    <Paper key={blog.id} sx={{ padding: 2, marginTop: '5px', display: 'flex', alignItems: 'center', maxWidth: 570, marginBottom: '5px' }}>
                      <div style={{ marginRight: '15px' }}>
                        <img
                          src={getUserProfilePhotoUrl(blog)}
                          alt="company profile"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div style={{ textAlign: 'left', marginTop: '20px' }}>
                        <Typography variant="h6" style={{ color: '#04d9ff' }}>{blog.user.first_name} {blog.user.last_name}</Typography>
                        <Typography variant="body2" style={{ color: 'gray' }}>{timeAgo(blog.created_at)}</Typography>
                        <Typography variant="body1" style={{ color: '#fff', marginTop: '10px' }}>{blog.post}</Typography>

                        <div style={{ display: 'flex', marginTop: '5px' }}>
                          <Tooltip title="Like" arrow>
                            <span onClick={handleLikeClick} style={{ cursor: 'pointer', marginRight: '10px' }}>
                              {isLiked ? <FavoriteIcon style={{ color: '#E1306C' }} /> : <FavoriteBorderIcon />}
                            </span>
                          </Tooltip>
                          <Tooltip title="Comment" arrow>
                            <CommentIcon style={{ marginRight: '10px', color: '#04d9ff', marginLeft: '3px' }} />
                          </Tooltip>
                          <Tooltip title="Share" arrow>
                            <ShareIcon style={{ cursor: 'pointer', color: '#04d9ff', marginLeft: '3px' }} />
                          </Tooltip>
                        </div>
                      </div>

                      <div style={{ marginLeft: 'auto' }}>
                        <Tooltip title="Add To Favorite" arrow>
                          <BookmarkIcon style={{ cursor: 'pointer', color: '#04d9ff' }} />
                        </Tooltip>
                      </div>
                    </Paper>
                  ))}
                </div>
              )}
            </div>

          </div>
        </ThemeProvider>
      )}

    </>
  );
};

export default Home;
