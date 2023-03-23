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

const AuthInput = ({children, placeholder, id, name, error, type, value, onChange, endAdornment, sx}) => {
    return(
        <CustomInput 
            required 
            placeholder={placeholder}
            id={id}
            name={name}
            error={error}
            type={type}
            value={value}
            onChange={onChange}
            endAdornment={endAdornment}
            sx={sx}
        >
            {children}
        </CustomInput>
    );
};

export default AuthInput;
