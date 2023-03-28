import { createTheme } from "@mui/material";

const MainTheme = createTheme({
    palette: {
        primary: {
            main: "#7D5A50",
            sub: "#FCDEC0",
        },
        secondary: {
            main: "#B4846C",
            text: "#FCDEC0",
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
    },
});

export default MainTheme;