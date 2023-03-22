import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const StyledStack = styled(Stack)(({theme}) => ({
    alignItem: "center",
    justifyContent: "space-between",
}));

const Row = ({ children, sx, spacing }) => {
    return (
        <StyledStack direction="row" sx={sx} spacing={spacing}>
            {children}
        </StyledStack>
    );
};

export default Row;