import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const StyledStack = styled(Stack)(({theme}) => ({
    alignItem: "center",
    justifyContent: "center",
}));

const Column = ({ children, ...props }) => {
    return (
        <StyledStack direction="column" {...props}>
            {children}
        </StyledStack>
    );
};

export default Column;