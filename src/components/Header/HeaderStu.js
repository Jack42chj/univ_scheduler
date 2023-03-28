import { AppBar, Toolbar, Box, Collapse, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link } from 'react-scroll';
import CommonButton from './Button/CommonButton';
import IconBtn from './Button/IconBtn';
import CommonText from '../Text/CommonText';

const pages = {
    1: {id: "aboutme", name: 'About Me'},
    2: {id: "mytimeline", name: 'Timeline'},
    3: {id: "skills", name: 'Skills'},
    4: {id: "projects", name: 'Projects'},
    5: {id: "study", name: 'Study'},
};

const HeaderStu = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return( 
        <AppBar
            color="secondary"
            elevation={0}
            position="fixed"
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link to="main" spy={true} smooth={true}>
                    <CommonButton sx={{ display: { xs: 'flex', md: 'flex'} }} >
                        <Text
                            variant="h5"
                            sx={{ p: 2, letterSpacing: 1 }}
                        >
                            CHJ's PORTPOLIO
                        </Text>
                    </CommonButton>
                </Link>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
                    {Object.keys(pages).map((page) => (
                        <CommonButton key={pages[page].name} sx={{ display: 'block', mx: 'auto' }}>
                            <Link to={pages[page].id} spy={true} smooth={true}>
                                <Text variant="button">{pages[page].name}</Text>
                            </Link>
                        </CommonButton>
                    ))}
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconBtn onClick={handleClick}>
                        <MenuIcon />
                    </IconBtn>
                </Box>
            </Toolbar>
            <Collapse in={Boolean(open)} unmountOnExit timeout="auto">
                <List disablePadding>
                        {Object.keys(pages).map((page) => (
                            <ListItem key={pages[page].name}>
                                <ListItemText primary={
                                    <CommonButton key={pages[page].name}>
                                        <Link to={pages[page].id} spy={true} smooth={true}>
                                            <Text variant="button">{pages[page].name}</Text>
                                        </Link>
                                    </CommonButton>} />
                            </ListItem>
                        ))}
                </List>
            </Collapse>
        </AppBar>
    );
};

export default HeaderStu;