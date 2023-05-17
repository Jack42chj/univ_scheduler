import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const CustomStack = styled(Stack)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
}));

const BgcolorStack = ({ children, ...props }) => {
    return(
        <CustomStack {...props}>
            {children}
        </CustomStack>
    );
};

export default BgcolorStack;