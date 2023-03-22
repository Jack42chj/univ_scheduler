import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({theme}) => ({
    borderRadius: 12,
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    height: 50,
    color: theme.palette.secondary.text,
    fontSize: "14px",
    fontWeight: "800",
}));

const AuthButton = ({ children, sx, type }) => {
    return(
        <CustomButton variant="contained" sx={sx} type={type}>
            {children}
        </CustomButton>
    );
};

export default AuthButton;
