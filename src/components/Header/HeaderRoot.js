import { AppBar, Toolbar, Box } from '@mui/material'
import CommonButton from '../Button/CommonButton';
import CommonText from '../Input/CommonText';
import IconBtn from '../Button/IconsButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/userServices';

const HeaderRoot = () => {
    const navigate = useNavigate();
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
                <CommonButton sx={{ display: { xs: 'flex', md: 'flex'} }}>
                    <CommonText
                        variant="h5"
                        sx={{ p: 2, letterSpacing: 1 }}
                    >
                        University Scheduler
                    </CommonText>
                </CommonButton>
                <Box sx={{ display: { xs: 'flex' } }}>
                    <IconBtn sx={{ mx: 1 }} onClick={handleLogout}>
                        <LogoutIcon />
                    </IconBtn>
                </Box> 
            </Toolbar>
        </AppBar>
    );
};

export default HeaderRoot;