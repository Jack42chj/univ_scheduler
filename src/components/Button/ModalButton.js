import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({ theme }) => ({
    borderRadius: 8,
    backgroundColor: theme.palette.primary.main,
    width: "50%",
    color: theme.palette.secondary.text,
}));

const ModalButton = ({ children, ...props }) => {
    return(
        <CustomButton variant="contained" {...props}>
            {children}
        </CustomButton>
    );
};

export default ModalButton;
