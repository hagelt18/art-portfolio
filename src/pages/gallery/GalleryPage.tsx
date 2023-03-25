import { useCallback, useMemo, useState } from 'react';
import './GalleryPage.css';
import { getArtList } from '../../art-service';
import Gallery from 'react-photo-gallery';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ShopIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Typography from '@mui/material/Typography';

function GalleryPage() {

  const artList = useMemo(getArtList, []);
  const [currentImage, setCurrentImage] = useState<any>();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const onGalleryItemClicked = useCallback((event: any, item: any) => {
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
    maxHeight: 'calc(100vh - 10px)',
    maxWidth: 'calc(100vw - 10px)',
    border: 'none',
    backgroundColor: 'rgba(0,0,0)',
    borderRadius: '16px',
    boxShadow: 24,
    textAlign: 'center',
    pt: 2,
    px: 4,
    pb: 3,
  };

  const openCurrentImageShop = () => { window.open(currentImage.shopLink) }

  return (
    <Box className="Gallery-Page">
      <Gallery photos={galleryImages}
        onClick={onGalleryItemClicked}
      />
      {viewerIsOpen && (
        <Modal
          open={viewerIsOpen}
          onClose={closeViewer}

        >
          <Box sx={{ ...modalStyle, width: currentImage.smallSize?.width, height: currentImage.smallSize?.height }}>
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0', color: 'white', margin: '10px' }}
              size="large"
              onClick={closeViewer}
              aria-label="close preview">
              <CloseIcon style={{width: '52px', height: '52px'}} />
            </IconButton>

            <img
              alt={currentImage.name}
              style={{ 
                objectFit: 'contain', 
                height: 'calc(100% - 64px)', 
                width: 'calc(100% - 6px)' 
              }}
              src={`${process.env.PUBLIC_URL}/assets/images/${currentImage.smallFile}`}
              onClick={closeViewer}
            />
            <Box>
              <Typography fontSize="18px" fontWeight={700} >
                
                {currentImage.name} ({currentImage.year})
                <IconButton
                  style={{zIndex: 10, color: 'orange'}}
                  size="small"
                  onClick={()=>{ window.open(`${process.env.PUBLIC_URL}/assets/images/${currentImage.smallFile}`)}}
                  aria-label="View full image in new tab"
                >
                  <ZoomInIcon />
                </IconButton>
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
  )
}

export default GalleryPage;
