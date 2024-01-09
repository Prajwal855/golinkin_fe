import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://cdn.mos.cms.futurecdn.net/HFUAjfbamNhbM8dsNSQW3D.jpg',
    title: 'Engineering',
    width: '40%',
  },
  {
    url: 'data:image/jpeg;base64,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',
    title: 'Finance',
    width: '20%',
  },
  {
    url: 'https://img.freepik.com/premium-photo/businessman-holding-arrow-up-with-graph-business-analysis-business-development-financial-plan-strategy_117255-1887.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704067200&semt=ais',
    title: 'Business Development',
    width: '40%',
  },
  {
    url: 'https://img.etimg.com/thumb/width-1200,height-900,imgsize-1081374,resizemode-75,msid-102199032/jobs/mid-career/digital-marketing-examples-of-successful-campaigns-what-you-need-to-know-before-starting-one.jpg',
    title: 'Marketing',
    width: '38%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPpxAKzZc39N9eU_n0bVspRIplbxV1StqtzJTEDFGg0kjKyc80eNdd9-uboqaTIRlIIic&usqp=CAU',
    title: 'Human Resoursces',
    width: '38%',
  },
  {
    url: 'https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg',
    title: 'AI',
    width: '24%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxVGc7kNOd-2qEV0pp-uF9TqUQA5eqkwl3zQ&usqp=CAU',
    title: 'Customer Servises',
    width: '40%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNHkto326QmRD6WA0eNY4d0epZ5IF0GuB1QQ&usqp=CAU',
    title: 'Research',
    width: '20%',
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEEHdCv6HGbeQmC3dcZ3uxEKNnUK3pIeV89Q&usqp=CAU',
    title: 'Information Technology',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'black' }}
    >
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h2" style={{ color: 'white' }}>
          For all skills and all jobs
        </Typography>
        <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
          {images.map((image) => (
            <ImageIconButton
              key={image.title}
              style={{
                width: image.width,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%',
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <ImageBackdrop className="imageBackdrop" />
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'common.white',
                }}
              >
                <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className="imageTitle"
                >
                  {image.title}
                  <div className="imageMarked" />
                </Typography>
              </Box>
            </ImageIconButton>
          ))}
        </Box>
      </Container>
    </Box>
  );
}