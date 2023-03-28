import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({theme}) => ({
    fontWeight: "800",
    bgcolor: theme.palette.primary.main,
    color: theme.palette.secondary.text,
    textTransform: "none",
}));

const CommonButton = ({ children, variant, key, sx, href }) => {
    return(
        <StyledButton disableRipple={Boolean(true)} variant={variant} key={key} sx={sx} href={href}>
            {children}
        </StyledButton>
    );
};

export default CommonButton;