import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const CustomBody = styled(Stack)(({theme}) => ({
  justifyContent: "center",
  width: "448px",
  minHeight: "100vh",
  margin: "0 auto",
  [theme.breakpoints.down('lg')]: {
    width: "400px",
  },
  [theme.breakpoints.down('sm')]: {
      width: "330px",
  },
}));

const AuthStack = (props) => <CustomBody>{props.children}</CustomBody>;

export default AuthStack;