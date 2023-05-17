import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: "#FFFFFF",
    borderRadius: 10, 
    boxShadow: theme.shadows[5],
    border: "2px solid",
    borderColor: theme.palette.primary.main,
}));

const InnerBox = ({ children, ...props }) => {
    return(
        <StyledBox {...props}>
            {children}
        </StyledBox>
    );
};

export default InnerBox;