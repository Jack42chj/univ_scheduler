import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({theme}) => ({
    fontWeight: "800",
    bgcolor: theme.palette.primary.main,
    color: theme.palette.secondary.text,
    textTransform: "none",
}));

const CommonButton = ({ children, ...props }) => {
    return(
        <StyledButton disableRipple={Boolean(true)} {...props}>
            {children}
        </StyledButton>
    );
};

export default CommonButton;