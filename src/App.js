import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUpPro from "./pages/SignUpPro";
import SignUpStu from "./pages/SignUpStu";
import { ThemeProvider } from "@emotion/react";
import MainTheme from "./styles/muiTheme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={MainTheme}>
        <Routes>
          <Route exact path = "/" element={<Login />} />
          <Route path = "/signup/student" element={<SignUpStu />} />
          <Route path = "/signup/professor" element={<SignUpPro />} />
        </Routes>
       </ThemeProvider> 
    </>
  );
}

export default App;
