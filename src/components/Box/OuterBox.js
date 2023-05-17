import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const CustomStack = styled(Stack)(({theme}) => ({
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: "60%",
    border: "2px solid",
    borderColor: "#DDDDDD",
    [theme.breakpoints.down('md')]: {
        width: "80%",
    },
}));

const OuterBox = ({ children, ...props }) => {
    return(
        <CustomStack {...props}>
            {children}
        </CustomStack>
    );
};

export default OuterBox;