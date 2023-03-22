import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const StyledStack = styled(Stack)(({theme}) => ({
    alignItem: "center",
    justifyContent: "center",
}));

const Column = ({ children, sx }) => {
    return (
        <StyledStack direction="column" sx={sx}>
            {children}
        </StyledStack>
    );
};

export default Column;