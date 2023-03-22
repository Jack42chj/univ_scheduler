import { FormHelperText } from "@mui/material";
import { styled } from "@mui/system";

const CustomFormHelperText = styled(FormHelperText)({
    color: "#FF5858",
    fontWeight: "800",
    fontSize: "14px",
});

const AuthFormText = ({ children, sx }) => {
    return(
        <CustomFormHelperText sx={sx}>
            {children}
        </CustomFormHelperText>
    );
};

export default AuthFormText;
