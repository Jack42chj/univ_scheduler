import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUpPro from "./pages/Auth/SignUpPro";
import SignUpStu from "./pages/Auth/SignUpStu";
import WriteNotice from "./pages/Professor/WriteNotice";
import NoticeList from "./pages/Professor/NoticeList";
import LectureList from "./pages/Professor/LectureList";
import EditNotice from "./pages/Professor/EditNotice";
import ReadNotice from "./pages/Professor/ReadNotice";
import Lecture from "./pages/Professor/Lecture";
import StudentInfo from "./pages/Professor/StudentInfo";
import StudentScore from "./pages/Professor/StudentScore";
import EditPlan from "./pages/Professor/EditPlan";
import WritePlan from "./pages/Professor/WritePlan";
import ReadPlan from "./pages/Student/ReadPlan";
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
          <Route path = "/professor/notice_list" element={<NoticeList />} />
          <Route path = "/professor/edit_notice" element={<EditNotice />} />
          <Route path = "/professor/read_notice" element={<ReadNotice />} />
          <Route path = "/professor/student_score" element={<StudentScore />} />
          <Route path = "/professor/edit_plan" element={<EditPlan />} />
          <Route path = "/professor/write_plan" element={<WritePlan />} />
          <Route path = "/student/read_plan" element={<ReadPlan />} />
        </Routes>
      </ThemeProvider> 
    </>
  );
}

export default App;
