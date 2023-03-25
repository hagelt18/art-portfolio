import './App.css';
import GalleryPage from './pages/gallery/GalleryPage';
import AboutPage from './pages/about/AboutPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './Menu';
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  
  return (
    <Box className="App">
      <Box className="App-Header"
        style={{ display: 'flex', alignItems: 'center' }}>
        <Box className='App-Header-Child App-Header-TextGroup' style={{ flex: '1' }}>
          <Typography fontFamily={"Passion One"} variant="h1" style={{ lineHeight: 1 }}>
            Tim Hagel
          </Typography>
          <Typography variant="subtitle1" style={{ fontSize: '24px' }}>Artist Portfolio</Typography>
        </Box>
      </Box>
      <ResponsiveAppBar />
      <Box className="App-Content">
        <Routes>
          <Route path="/" element={<Navigate to="/gallery"/>} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="*" element={<div>PAGE NOT FOUND</div>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
