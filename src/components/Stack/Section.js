import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const StyledStack = styled(Stack)(({theme}) => ({
    width: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
}));

const Section = ({ children, ...props }) => {
    return (
        <StyledStack {...props}>
            {children}
        </StyledStack>
    );
};

export default Section;