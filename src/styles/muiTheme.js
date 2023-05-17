import { createTheme } from "@mui/material";

const MuiTheme = createTheme({
    palette: {
        primary: {
            main: "#7D5A50",
            sub: "#FCDEC0",
        },
        secondary: {
            main: "#B4846C",
            text: "#F0CCA8",
            sub: "#E58299",
        },
    },
    typography : {
        fontFamily: "'Sunflower', sans-serif",
        h4: {
            '@media (max-width:600px)': {
                fontSize: '1.7rem',
            },
        },
        h6: {
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
        },
        overline: {
            fontSize: "1rem",
            '@media (max-width:600px)': {
                fontSize: '0.5rem',
            },
        },
    },
});

export default MuiTheme;