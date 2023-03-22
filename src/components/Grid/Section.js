import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const StyledStack = styled(Stack)(({theme}) => ({
    width: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
}));

const Section = ({ children, id, sx }) => {
    return (
        <StyledStack id={id} sx={sx}>
            {children}
        </StyledStack>
    );
};

export default Section;