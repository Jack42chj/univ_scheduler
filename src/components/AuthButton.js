import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
    variant: "contained"
});

const AuthButton = () => {
    return <CustomButton sx={{
        borderRadius: 8,
        backgroundColor: "#F4F4F4",
        width: "100%",
        boxShadow: 0,
        height: 50,
        color: 'black',
        fontSize: 14,
    }}/>
}

export default AuthButton;
