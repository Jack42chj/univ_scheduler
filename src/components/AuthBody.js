import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const CustomBody = styled(Stack)({
  justifyContent: "center",
  width: "350px",
  margin: "0 auto",
});

const AuthBody = (props) => <CustomBody>{props.children}</CustomBody>;

export default AuthBody;
