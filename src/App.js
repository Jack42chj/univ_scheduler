import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/Auth/LogIn";
import SignUpPro from "./pages/Auth/SignUpPro";
import SignUpStu from "./pages/Auth/SignUpStu";
import LectureList from "./pages/Professor/LectureList";
import Lecture from "./pages/Professor/Lecture";
import StudentInfo from "./pages/Professor/StudentInfo";
import Grade from "./pages/Professor/Grade";
import WriteNotice from "./pages/Professor/Notice/WriteNotice";
import NoticeList from "./pages/Professor/Notice/NoticeList";
import EditNotice from "./pages/Professor/Notice/EditNotice";
import ReadNotice from "./pages/Professor/Notice/ReadNotice";
import ReferenceList from "./pages/Professor/Reference/ReferenceList";
import ReadReference from "./pages/Professor/Reference/ReadReference";
import EditReference from "./pages/Professor/Reference/EditReference";
import WriteReference from "./pages/Professor/Reference/WriteReference";
import { ThemeProvider } from "@emotion/react";
import MuiTheme from "./styles/MuiTheme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={MuiTheme}>
        <Routes>
          <Route exact path = "/" element={<LogIn />} />
          <Route path = "/signup/student" element={<SignUpStu />} />
          <Route path = "/signup/professor" element={<SignUpPro />} />
          <Route path = "/professor/main" element={<LectureList />} />
          <Route path = "/professor/lecture/:sem/:sub_id" element={<Lecture />} />
          <Route path = "/professor/student_info" element={<StudentInfo />} />
          <Route path = "/professor/grade/:sem/:sub_id" element={<Grade />} />
          <Route path = "/professor/notice_list/:sem/:sub_id" element={<NoticeList />} />
          <Route path = "/professor/read_notice/:sem/:sub_id/:noti_id" element={<ReadNotice />} />
          <Route path = "/professor/write_notice/:sem/:sub_id" element={<WriteNotice />} /> 
          <Route path = "/professor/edit_notice/:sem/:sub_id/:noti_id" element={<EditNotice />} />
          <Route path = "/professor/ref_list/:sem/:sub_id" element={<ReferenceList />} />
          <Route path = "/professor/read_ref/:sem/:sub_id/:noti_id" element={<ReadReference />} />
          <Route path = "/professor/edit_ref/:sem/:sub_id/:noti_id" element={<EditReference />} />
          <Route path = "/professor/write_ref/:sem/:sub_id" element={<WriteReference />} />
        </Routes>
      </ThemeProvider> 
    </>
  );
}

export default App;
