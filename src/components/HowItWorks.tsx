import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import curvylines from '../assets/images/productCurvyLines.png'

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'black', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={curvylines}
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}style={{color:'white'}}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="https://icon-library.com/images/icon-company/icon-company-18.jpg"
                  alt="company"
                  sx={image}
                />
                <Typography variant="h5" align="center" style={{color:'white'}}>
                  Post Requirements ,Hire Experts/Freelancer and Schedule Interviews.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbHfe7DftClTvfhV_AbbQFUxSVGLOO3aG01g&usqp=CAU"
                  alt="expert"
                  sx={image}
                />
                <Typography variant="h5" align="center"  style={{color:'white'}}>
                  Add Skills, Experince, filters Jobs based on his requirement and apply 
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="data:image/png;base64,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"
                  alt="freelancer"
                  sx={image}
                />
                <Typography variant="h5" align="center"  style={{color:'white'}}>
                  Add Experince in Projects, apply for Projects and Bid
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/Intro"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;