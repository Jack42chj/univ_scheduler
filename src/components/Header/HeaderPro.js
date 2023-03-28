import { AppBar, Toolbar, Box, Collapse, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useState } from 'react';
import CommonButton from '../Button/CommonButton';
import CommonText from '../Text/CommonText';
import IconBtn from '../Button/IconBtn';
import LogoutIcon from '@mui/icons-material/Logout';

const listItem = [
    { link: "/professor/lecture_list", text: "강의 관리"},
    { link: "/professor/student_info", text: "학생 정보조회"},
];

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return( 
        <AppBar
            color="secondary"
            elevation={0}
            position="sticky"
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <CommonButton sx={{ display: { xs: 'flex', md: 'flex'} }} >
                    <CommonText
                        variant="h5"
                        sx={{ p: 2, letterSpacing: 1 }}
                    >
                        University Scheduler
                    </CommonText>
                </CommonButton>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
                    {Object.keys(listItem).map((item) => (
                        <Fragment key={listItem[item].text}>
                            <CommonButton href={listItem[item].link} sx={{ display: 'block', mx: 'auto' }}>
                                    <CommonText variant="h6">{listItem[item].text}</CommonText>
                            </CommonButton>
                        </Fragment>
                    ))}
                </Box>
                <IconBtn sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <LogoutIcon />
                </IconBtn>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconBtn sx={{ mx: 1 }}>
                        <LogoutIcon />
                    </IconBtn>
                    <IconBtn onClick={handleClick}>
                        <MenuIcon />
                    </IconBtn>
                </Box> 
            </Toolbar>
            <Collapse in={Boolean(open)} unmountOnExit timeout="auto">
                <List disablePadding>
                    {Object.keys(listItem).map((item) => (
                        <ListItem key={listItem[item].text}>
                            <ListItemText primary={
                                <CommonButton href={listItem[item].link}>
                                        <CommonText variant="h6">{listItem[item].text}</CommonText>
                                </CommonButton>} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </AppBar>
    );
};

export default Header;