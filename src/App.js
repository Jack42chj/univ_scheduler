import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUpPro from "./pages/Auth/SignUpPro";
import SignUpStu from "./pages/Auth/SignUpStu";
import WriteNotice from "./pages/professor/WriteNotice";
import ReadNotice from "./pages/ReadNotice";
import LectureList from "./pages/professor/LectureList";
import Lecture from "./pages/professor/Lecture";
import StudentInfo from "./pages/professor/StudentInfo";
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
          <Route path = "/professor/write_notice" element={<WriteNotice />} />
          <Route path = "/professor/lecture_list" element={<LectureList />} /> 
          <Route path = "/professor/student_info" element={<StudentInfo />} /> 
          <Route path = "/professor/lecture" element={<Lecture />} /> 
          <Route path = "/read_notice" element={<ReadNotice />} />
        </Routes>
      </ThemeProvider> 
    </>
  );
}

export default App;
