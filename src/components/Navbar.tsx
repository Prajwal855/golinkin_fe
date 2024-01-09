import "../assets/styles/Home.css";
import Link from '@mui/material/Link';
import { Box } from "@mui/material";

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const NavBar = () => {
  return (
    <nav className="fixed-navbar">
      <img src='https://cdn-icons-png.flaticon.com/512/3772/3772209.png' className="nav--icon" alt="Learn Now Logo" />
      <h3 className="nav--logo_text">GoLinkIN</h3>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          color="inherit"
          variant="h6"
          underline="none"
          href="/login"
          sx={rightLink}
        >
          {'Sign In'}
        </Link>
        <Link
          variant="h6"
          underline="none"
          href="/Intro"
          sx={{ ...rightLink, color: '#04d9ff' }}
        >
          {'Sign Up'}
        </Link>
      </Box>
    </nav>
  )
}

export default NavBar;