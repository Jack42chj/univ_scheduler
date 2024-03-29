import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({theme}) => ({
    borderRadius: 12,
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    height: 50,
    color: theme.palette.secondary.text,
}));

const AuthButton = ({ children, ...props }) => {
    return(
        <CustomButton variant="contained" {...props}>
            {children}
        </CustomButton>
    );
};

export default AuthButton;
