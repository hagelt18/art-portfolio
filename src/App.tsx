import { useCallback, useMemo, useState } from 'react';
import './App.css';
import { getArtList } from './art-service';
import Gallery from 'react-photo-gallery';
import Modal from '@mui/material/Modal';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ShopIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {

  const artList = useMemo(getArtList, []);
  const [currentImage, setCurrentImage] = useState<any>();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const onGalleryItemClicked = useCallback((event: any, item: any) => {
    // console.log(galleryImages[item.index]);
    setCurrentImage(artList[item.index]);
    setViewerIsOpen(true);
  }, [artList]);

  const closeViewer = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const galleryImages = useMemo(() => {
    return artList.map(a => {
      return {
        original: a.url,
        src: `${process.env.PUBLIC_URL}/assets/images/${a.smallFile}`,
        alt: a.name,
        width: a.smallSize.width,
        height: a.smallSize.height,
      }
    })
  }, [artList]);

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    maxHeight: '90%',
    border: 'none',
    backgroundColor: 'rgba(0,0,0,0.8)',
    boxShadow: 24,
    textAlign: 'center',
    pt: 2,
    px: 4,
    pb: 3,
  };

  const openMainShop = () => { window.open('https://www.redbubble.com/people/hagelt18/explore?asc=u&page=1&sortOrder=recent') }
  const openCurrentImageShop = () => { window.open(currentImage.shopLink) }

  return (
    <Box className="App">

      <Box className="App-Header" style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box>
          <Typography fontFamily={"Passion One"} variant="h1">Art Gallery</Typography>
          <Box><Typography style={{ textAlign: 'right' }}>by Tim Hagel</Typography></Box>
        </Box>
        <Button style={{ marginLeft: 'auto' }} variant="contained" startIcon={<ShopIcon />} onClick={openMainShop} >
          <Typography>Shop</Typography>
        </Button>
      </Box>

      <Box className="App-Content">
        <Gallery photos={galleryImages}
          onClick={onGalleryItemClicked}
        />;
        {viewerIsOpen && (
          <Modal
            open={viewerIsOpen}
            onClose={closeViewer}

          >
            <Box sx={{ ...modalStyle, width: currentImage.smallSize?.width, height: currentImage.smallSize?.height }}>
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0', color: 'white', margin: '5px' }}
                size="large"
                onClick={closeViewer}
                aria-label="close preview">
                <CloseIcon />
              </IconButton>

              <img
                alt={currentImage.name}
                style={{ objectFit: 'contain', height: '90%', width: '90%' }}
                src={`${process.env.PUBLIC_URL}/assets/images/${currentImage.smallFile}`}
              />
              <Box>
                <Typography fontSize="16px" >
                  {currentImage.name} ({currentImage.year})
                  {currentImage.shopLink && (
                    <IconButton
                      style={{ zIndex: 10, color: 'orange', display: 'inline' }}
                      size="small"
                      onClick={openCurrentImageShop}
                      aria-label="View art in Red bubble Store">
                      <ShopIcon />
                    </IconButton>
                  )}
                </Typography>
              </Box>
            </Box>

          </Modal>
        )}
      </Box>
    </Box>
  );
}

export default App;
