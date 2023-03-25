import { useCallback, useMemo, useState } from 'react';
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
// import {
//   createBrowserRouter,
//   redirect,
//   RouterProvider,

// } from "react-router-dom";

import { Routes, Route, Outlet, Link, redirect, Navigate } from "react-router-dom";


function App() {
  // const router = createBrowserRouter([
  //   // {
  //   //   path: "/",
  //   //   component: <GalleryPage/>
  //   // },
  //   {
  //     path: "/",
  //     component: <div>HOME</div>
  //   },
  //   {
  //     path: "shop",
  //     component: <div>SHOP</div>
  //   },
  //   {
  //     path: "about",
  //     component: <div>ABOUT</div>
  //   }
  // ]);


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
        {/* <RouterProvider router={router} /> */}
        <Routes>
          {/* <Route path="/" element={<GalleryPage />} /> */}
          <Route path="/" element={<Navigate to="/gallery"/>} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage/>} />
          {/* <Route path="/shop" element={<div>SHOP</div>} /> */}
          <Route path="*" element={<div>NOT FOUND</div>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
