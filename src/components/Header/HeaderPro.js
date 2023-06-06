import { AppBar, Toolbar, Box, Collapse, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useState } from 'react';
import CommonButton from '../Button/CommonButton';
import CommonText from '../Input/CommonText';
import IconBtn from '../Button/IconsButton';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MyPage from '../Modal/MyPage';

const listItem = [
    { link: "/professor/main", text: "강의 관리"},
    { link: "/professor/student_info", text: "학생 정보조회"},
];

const HeaderPro = () => {
    const [open, setOpen] = useState(false);
    const [myPageOpen, setMyPageOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const myPageHandleOpen = () => setMyPageOpen(true);
    const myPageHandleClose = () => setMyPageOpen(false);

    return( 
        <AppBar
            color="secondary"
            elevation={0}
            position="sticky"
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <CommonButton sx={{ display: { xs: 'flex', md: 'flex'} }} href="/professor/main">
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
                <IconBtn onClick={myPageHandleOpen} sx={{ display: { xs: 'none', md: 'flex' }, mx: 1 }}>
                    <SettingsIcon />
                </IconBtn>
                <IconBtn sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <LogoutIcon />
                </IconBtn>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconBtn onClick={myPageHandleOpen}>
                        <SettingsIcon />
                    </IconBtn>
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
            <MyPage open={myPageOpen} onClose={myPageHandleClose} />
        </AppBar>
    );
};

export default HeaderPro;