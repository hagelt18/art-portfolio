import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function About() {
  const coreConGuestUrl = 'https://www.fargocorecon.org/guests/';
  const scottStoryTShirtUrl = 'https://www.prowrestlingtees.com/wrestler-t-shirts/scottstory/dead-is-better.html';

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
        Tim Hagel is an artist originally from the Fargo-Moorhead area and currently based out of the twin cities area in Minnesota. 
        His art style is mostly inspired by gross-out art popular in the late 80s and early 90s cartoons and video games. 
        Tim was a featured <Link target="_blank" rel="noopener" href={coreConGuestUrl}>Guest Artist at CoreCon 2023</Link>, 
        creating all of the art for the "Fantastic Worlds" theme for that year. 
        He has also done other freelance work such as creating the t-shirt design for <Link target="_blank" rel="noopener" href={scottStoryTShirtUrl}>Scott Story</Link>, 
        a local professional wrestler as well as some artwork for the comedy band "Kamikaze Snowmen".
      </Typography>
    </Box>
  )
}

export default About;
