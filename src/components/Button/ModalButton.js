import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: 8,
    backgroundColor: theme.palette.secondary.main,
    width: "50%",
    color: theme.palette.secondary.text,
}));

const AuthModal = ({ children, sx, href }) => {
    return(
        <CustomButton variant="contained" sx={sx} href={href}>
            {children}
        </CustomButton>
    );
};

export default AuthModal;
