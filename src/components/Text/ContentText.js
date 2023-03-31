import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledTypography = styled(Typography)(({theme}) => ({
    fontWeight: "200",
    textTransform: "none",
    color: "#d4ac85",
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
}));

const CommonText = ({ children, variant, sx }) => {
    return(
        <StyledTypography variant={variant} sx={sx}>
            {children}
        </StyledTypography>
    );
};

export default CommonText;