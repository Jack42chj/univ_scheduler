import { InputBase } from "@mui/material";
import { styled } from "@mui/system";

const CustomInput = styled(InputBase)(({theme}) => ({
    backgroundColor: "#DDDDDD",
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    padding: "0 16px",
    [theme.breakpoints.down('md')]: {
        fontSize: "12px",
    },
}));

const AuthInput = ({ children, ...props }) => {
    return(
        <CustomInput {...props}>
            {children}
        </CustomInput>
    );
};

export default AuthInput;
