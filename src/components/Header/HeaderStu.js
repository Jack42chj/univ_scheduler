import { AppBar, Toolbar, Box, Collapse, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import CommonButton from '../Button/CommonButton';
import CommonText from '../Input/CommonText';
import IconBtn from '../Button/IconsButton';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MyPage from '../Modal/MyPage';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/userServices';

const listItem = [
    { link: "/student/main", text: "강의 시간표" },
    { link: "/student/search_syl", text: "강의계획서 조회"},
    { link: "/student/enrollment", text: "수강 신청"},
    { link: "/student/score_board", text: "수강/성적 조회"},
    { link: "/student/ranking", text: "석차 조회"},
];

const HeaderStu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [myPageOpen, setMyPageOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const myPageHandleOpen = () => setMyPageOpen(true);
    const myPageHandleClose = () => setMyPageOpen(false);
    const handleLogout = async() => {
        const response = await logout();
        if(response.status === 200){
            alert("로그아웃!");
            navigate("/");
        }
    };

    return( 
        <AppBar
            color="secondary"
            elevation={0}
            position="sticky"
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <CommonButton sx={{ display: { xs: 'flex', md: 'flex'} }} href="/student/main">
                    <CommonText
                        variant="h5"
                        sx={{ p: 2, letterSpacing: 1 }}
                    >
                        University Scheduler
                    </CommonText>
                </CommonButton>
                <Box sx={{ display: { xs: 'flex' } }}>
                    <IconBtn onClick={myPageHandleOpen}>
                        <SettingsIcon />
                    </IconBtn>
                    <IconBtn sx={{ mx: 1 }} onClick={handleLogout}>
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

export default HeaderStu;