import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({theme}) => ({
    position: "absolute",
    top: '40%',
    left: "50%",
    width: '300px',
    backgroundColor: "#B4846C",
    transform: 'translate(-50%, -50%)',
    borderRadius: "32px",
    boxShadow: "40px",
    padding: "32px",
}));

const ModalBox = ({ children, ref, ...props }) => {
    return(
        <StyledBox {...props} ref={ref}>
            {children}
        </StyledBox>
    );
};

export default ModalBox;