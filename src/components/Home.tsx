import { Box, CssBaseline, InputBase, Modal, Paper, Stack, TextareaAutosize, ThemeProvider, Tooltip, Typography, alpha, colors, createTheme, styled } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ReactPlayer from 'react-player';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GroupIcon from '@mui/icons-material/Group';
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
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days === 1) {
      return '1 day ago';
    } else {
      return `${days} days ago`;
    }
  } else if (hours > 0) {
    return `${hours}hr ago`;
  } else if (minutes > 0) {
    return `${minutes}min ago`;
  } else {
    return 'Just now';
  }
};


interface JobDetails {
  id: number;
  name: string;
  company_type: string;
  headquarters: string;
  position: string;
  experience: string;
  salary: number;
  skills_required: string;
  small_description: string;
  size: string;
  website: string;
  founded: string;
  specialities: string;
  photo: string;
}

interface Likes {
  [postId: string]: boolean;
}

interface Bookmarks {
  [postId: string]: boolean;
}

interface Jobs {
  [JobId: string]: boolean;
}


const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [jobProfiles, setJobProfiles] = useState<any[]>([]);
  const [userProfiles, setUserProfiles] = useState<any[]>([]);
  const [companyProfiles, setCompanyProfiles] = useState<any[]>([]);
  const [postDetails, setPostDetails] = useState<any[]>([]);
  const [post, setPost] = useState<string>('');
  const [visibleCompanies, setVisibleCompanies] = useState(3);
  const [likes, setLikes] = useState<Likes>({});
  const [bookmarks, setBookmarks] = useState<Bookmarks>({});
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [jobCheckStatus, setJobCheckStatus] = useState<Jobs>({});
  const [visiblePeople, setVisiblePeople] = useState(3);
  const [friendRequests, setFriendRequests] = useState<number[]>([]);

  const handlePersonAddClick = (userId: number) => {
    setFriendRequests((prevRequests) => {
      if (prevRequests.includes(userId)) {
        return prevRequests.filter((id) => id !== userId);
      } else {

        return [...prevRequests, userId];
      }
    });
  };

  const handleIconClick = (jobId: number) => {
    setJobCheckStatus((prevStatus) => ({
      ...prevStatus,
      [jobId]: !prevStatus[jobId],
    }));
  };

  const handleBookmarkClick = (postId: string) => {
    setBookmarks((prevBookmarks) => ({ ...prevBookmarks, [postId]: !prevBookmarks[postId] }));
  };

  const handleBusinessClick = async (jobId: any) => {
    try {
      const savedAccessToken = localStorage.getItem('AccessToken');
      const response = await axios.get(`http://localhost:3000/jobs/${jobId}`, {
        headers: {
          token: savedAccessToken,
        },
      });
      setJobDetails(response.data);
      console.log('I got the job responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', response.data)
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching job details', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLikeClick = (postId: string) => {
    setLikes((prevLikes) => ({ ...prevLikes, [postId]: !prevLikes[postId] }));
  };

  const handleViewMoreCompanies = () => {
    setVisibleCompanies((prevVisibleCompanies) => prevVisibleCompanies + 3);
  };

  const handlePostChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };

  const videos = [
    'https://www.youtube.com/watch?v=AscYjsBh430',
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

  const getJobCompanyProfilePhotoUrl = (job: any): string => {
    return job?.photo || 'https://clipart-library.com/new_gallery/280-2806732_png-file-svg-default-profile-picture-png.png';
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
                <Tooltip title="Articles" arrow>
                      <img
                        src="https://cdn.freebiesupply.com/logos/large/2x/the-daily-news-logo-png-transparent.png"
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
                {userRole === 'jobseeker' || userRole === 'freelancer' ? (
                  <>
                    <Tooltip title="Jobs" arrow>
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/008/878/596/non_2x/job-vacancy-concept-with-we-are-hiring-text-design-orange-and-white-color-job-vacancy-social-media-post-design-we-are-hiring-a-banner-design-with-an-orange-shade-free-png.png"
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
                    <Tooltip title="Create Job" arrow>
                      <img
                        src="https://cdn.textstudio.com/output/sample/normal/6/0/4/5/hire-logo-275-15406.png"
                        className="nav--icon"
                        alt="Create Jobs"
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
                muted
                controls
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
                  <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#fff', marginLeft: '10px' }}>
                    OPENINGS
                  </Typography>
                </Box>
                {jobProfiles.map((job: any) => (
                  <Paper key={job.id} sx={{ padding: 2, marginTop: '10px', display: 'flex', alignItems: 'center', minWidth: 500 }}>
                    <div style={{ marginRight: '10px' }}>
                      <BusinessCenterIcon onClick={() => handleBusinessClick(job.id)} sx={{ cursor: 'pointer', marginRight: '5px', minHeight: 20, minWidth: 20 }} />
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
                        {jobCheckStatus[job.id] ? (
                          <CheckCircleOutlineIcon style={{ cursor: 'pointer', color: 'green' }} />
                        ) : (
                          <AddCircleOutlineIcon
                            onClick={() => handleIconClick(job.id)}
                            style={{ cursor: 'pointer', color: '#04d9ff' }}
                          />
                        )}
                      </Tooltip>
                    </div>
                  </Paper>
                ))}
              </div>
            )}
            {userProfiles.length > 0 && (
              <div style={{ position: 'absolute', left: '5px', marginLeft: '10px', marginTop: '5%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#fff', marginLeft: '10px' }}>
                    PEOPLES
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
                {friendRequests.includes(user.id) ? (
                  <HowToRegIcon onClick={() => handlePersonAddClick(user.id)} style={{ color: '#00ff00' }} />
                ) : (
                  <Tooltip title="Friend Request" arrow>
                    <PersonAddIcon
                      style={{ cursor: 'pointer', color: '#04d9ff' }}
                      onClick={() => handlePersonAddClick(user.id)}
                    />
                  </Tooltip>
                )}
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
                  <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#fff', marginLeft: '10px' }}>
                    COMPANIES
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
                {friendRequests.includes(company.id) ? (
                  <GroupIcon onClick={() => handlePersonAddClick(company.id)} style={{ color: '#00ff00' }} />
                ) : (
                  <Tooltip title="Friend Request" arrow>
                    <GroupAddIcon
                      style={{ cursor: 'pointer', color: '#04d9ff' }}
                      onClick={() => handlePersonAddClick(company.id)}
                    />
                  </Tooltip>
                )}
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
                    <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#fff', marginLeft: '10px' }}>
                      BLOGS
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
                            <span onClick={() => handleLikeClick(blog.id)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                              {likes[blog.id] ? <FavoriteIcon style={{ color: '#E1306C' }} /> : <FavoriteBorderIcon />}
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
                        <Tooltip title={bookmarks[blog.id] ? 'Remove From Save' : 'Save'} arrow>
                          {bookmarks[blog.id] ? (
                            <BookmarkIcon
                              style={{ cursor: 'pointer', color: '#04d9ff' }}
                              onClick={() => handleBookmarkClick(blog.id)}
                            />
                          ) : (
                            <BookmarkBorderIcon
                              style={{ cursor: 'pointer', color: '#04d9ff' }}
                              onClick={() => handleBookmarkClick(blog.id)}
                            />
                          )}
                        </Tooltip>
                      </div>
                    </Paper>
                  ))}
                </div>
              )}
            </div>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
            >
              <div style={{ maxWidth: 500, marginTop: '10%', marginLeft: '30%', borderBlockColor: 'black' }}>
                {jobDetails && (
                  <Paper key={jobDetails.id} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 500, marginTop: '10%' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <img
                        src={getJobCompanyProfilePhotoUrl(jobDetails)}
                        alt="company profile"
                        style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                      <Typography variant="h6" style={{ color: '#04d9ff' }}>{jobDetails.name}</Typography>
                      <Typography variant="body1" style={{ color: 'grey' }}>{jobDetails.company_type}</Typography>
                      <Typography variant="body1" style={{ color: 'grey' }}>{jobDetails.founded}</Typography>
                      <Typography variant="body1" style={{ color: 'grey' }}>{jobDetails.size}</Typography>
                      <Typography variant="body1" style={{ color: 'grey' }}>{jobDetails.website}</Typography>
                      <Typography variant="body1" style={{ color: 'grey' }}>{jobDetails.headquarters}</Typography>
                    </div>
                    <Paper key={jobDetails.id} sx={{ padding: 2, marginTop: '10px', display: 'flex', alignItems: 'center', maxWidth: 500 }}>
                      <div style={{ marginRight: '10px' }}>
                        <BusinessCenterIcon sx={{ marginRight: '5px', minHeight: 20, minWidth: 20 }} />
                      </div>
                      <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                        <Typography variant="h5" style={{ color: '#04d9ff' }}>{jobDetails.position}</Typography>
                        <Typography variant="body1">
                          Experience: {jobDetails.experience}
                        </Typography>
                        <Typography variant="body2">Salary: ${jobDetails.salary}</Typography>
                        <Typography variant="body2">description: {jobDetails.small_description}</Typography>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <Tooltip title={jobCheckStatus[jobDetails.id] ? 'Remove' : 'Apply'} arrow>
                          {jobCheckStatus[jobDetails.id] ? (
                            <CheckCircleOutlineIcon onClick={() => handleIconClick(jobDetails.id)} style={{ cursor: 'pointer', color: 'green' }} />
                          ) : (
                            <AddCircleOutlineIcon
                              onClick={() => handleIconClick(jobDetails.id)}
                              style={{ cursor: 'pointer', color: '#04d9ff' }}
                            />
                          )}
                        </Tooltip>
                      </div>
                    </Paper>
                  </Paper>
                )}
              </div>
            </Modal>
          </div>
        </ThemeProvider>
      )}

    </>
  );
};

export default Home;
