import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUpPro from "./pages/SignUpPro";
import SignUpStu from "./pages/SignUpStu";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path = "/" element={<SignIn />} />
        <Route path = "/signup/student" element={<SignUpStu />} />
        <Route path = "/signup/professor" element={<SignUpPro />} />
      </Routes>
    </>
  );
}

export default App;
