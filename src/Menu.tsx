import './Menu.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = [
    { name: 'Gallery', link: '/gallery' },
    { name: 'Shop', link: 'https://www.redbubble.com/people/hagelt18/explore' },
    { name: 'About', link: '/about' },
];

function ResponsiveAppBar() {

    const navigate = useNavigate();

    const [spinIcon, setSpinIcon] = useState(false);

    return (
        <AppBar style={{ position: 'sticky', top: '0' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, alignItems: 'center' }}>
                    <Box
                        className={`menu-icon ${spinIcon ? 'spin' : ''}`}
                        component="img"
                        sx={{ display: { xs: 'flex', md: 'flex' }, width: '48px', height: '48px', mr: 1 }}
                        alt="Menu Icon"
                        src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png`}
                        onClick={() => setSpinIcon(!spinIcon)}
                    />
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => {
                                    if (page.link?.startsWith('/')) {
                                        navigate(page.link);
                                    } else {
                                        window.open(page.link);
                                    }

                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;