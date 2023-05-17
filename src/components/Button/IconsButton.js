import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)(({theme}) => ({
    color: theme.palette.primary.sub,
    border: '2px solid',
    borderRadius: "20%",
}));

const IconsButton = ({ children, ...props }) => {
    return(
        <StyledIconButton {...props}>
            {children}
        </StyledIconButton>
    );
};

export default IconsButton;