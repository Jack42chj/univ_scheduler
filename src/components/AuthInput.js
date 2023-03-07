import { InputBase } from "@mui/material";
import { styled } from "@mui/system";

const CustomInput = styled(InputBase)({
    backgroundColor: "#F4F4F4",
    width: "100%",
    height: 50,
    borderRadius: 2,
    paddingLeft: 2,
});

const AuthInput = () => {
    return <CustomInput>a</CustomInput>
}

export default AuthInput;
