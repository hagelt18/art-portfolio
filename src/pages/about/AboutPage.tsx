import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function About() {
  return (
    <Box sx={{display: {xs: 'block', sm: 'flex'}, maxWidth: '800px', margin: 'auto', gap: '12px' }}>
      <Box 
        component="img"
        src = {`${process.env.PUBLIC_URL}/assets/images/tim-photo.jpg`}
        alt = "Photograph of Tim Hagel"
        sx={{width: '225px', height: '300px', objectFit: 'contain', borderRadius: '16px'}}
      >
      </Box>
      <Typography style={{textAlign: 'left'}}>
        Tim Hagel is an artist who grew up in the Fargo-Moorhead area. His art style is mostly inspired by gross-out art popular in the late 80s and early 90s, cartoons, and video games. Tim worked as a volunteer for CoreCon from 2010 to 2016 primarily as the e-gaming con chair before moving to the Minneapolis metropolitan area. He lives with his wife Daniella and three cats Leo, Luna, and Apollo. Professionally, Tim has worked as a software engineer for 13 years.
      </Typography>
    </Box>
  )
}

export default About;
