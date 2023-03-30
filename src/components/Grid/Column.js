import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const StyledStack = styled(Stack)(({theme}) => ({
    alignItem: "center",
    justifyContent: "center",
}));

const Column = ({ children, sx, spacing }) => {
    return (
        <StyledStack direction="column" sx={sx} spacing={spacing}>
            {children}
        </StyledStack>
    );
};

export default Column;