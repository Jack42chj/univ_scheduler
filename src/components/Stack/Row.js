import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const StyledStack = styled(Stack)(({theme}) => ({
    alignItem: "center",
    justifyContent: "space-between",
}));

const Row = ({ children, ...props }) => {
    return (
        <StyledStack direction="row" {...props}>
            {children}
        </StyledStack>
    );
};

export default Row;