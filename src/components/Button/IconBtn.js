import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)(({theme}) => ({
    color: theme.palette.primary.sub,
    border: '2px solid',
    borderRadius: "20%",
}));

const IconBtn = ({ children, onClick, sx }) => {
    return(
        <StyledIconButton onClick={onClick} sx={sx}>
            {children}
        </StyledIconButton>
    );
};

export default IconBtn;