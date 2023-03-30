import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const CustomTextField = styled(TextField)(({theme}) => ({
    '& label': {
        color: '#FFCA29',
    },
    '& .MuiOutlinedInput-root': { 
        color: '#FFCA29',
        '& fieldset': {
            borderColor: '#FFCA29',
            border: "2px solid #FFCA29"
        },
        '&.Mui-focused input': {
            color: theme.palette.primary.main,
        },
    },
    '& .MuiInputBase-root.Mui-disabled': {
        '& fieldset': {
            borderColor: '#A19264',
            border: "2px solid #A19264"
        },
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#A19264",
    },
    '& label.Mui-disabled': {
        color: '#A19264',
    },
}));

const FieldText = ({ disabled, sx, children, label, defaultValue }) => {
    return(
        <CustomTextField 
            label={label}
            disabled={disabled}
            sx={sx}
            defaultValue={defaultValue}
        >
            {children}
        </CustomTextField>
    );
};

export default FieldText;