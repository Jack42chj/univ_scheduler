import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/Auth/LogIn";
import Management from "./pages/Manager/Management";
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
import SyllabusList from "./pages/Professor/Syllabus/SyllabusList";
import WriteSyllabus from "./pages/Professor/Syllabus/WriteSyllabus";
import EditSyllabus from "./pages/Professor/Syllabus/EditSyllabus";
import AssignmentList from "./pages/Professor/Assignment/AssignmentList";
import WriteAssignment from "./pages/Professor/Assignment/WriteAssignment";
import ReadAssignment from "./pages/Professor/Assignment/ReadAssignment";
import EditAssignment from "./pages/Professor/Assignment/EditAssignment";
import Main from "./pages/Student/Main";
import StuLecture from "./pages/Student/StuLecture";
import Ranking from "./pages/Student/Ranking";
import StuNoticeList from "./pages/Student/Notice/StuNoticeList";
import StuReadNotice from "./pages/Student/Notice/StuReadNotice";
import StuReferenceList from "./pages/Student/Reference/StuReferenceList";
import StuReadReference from "./pages/Student/Reference/StuReadReference";
import StuAssignmentList from "./pages/Student/Assignment/StuAssignmentList";
import StuReadAssignment from "./pages/Student/Assignment/StuReadAssignment";
import StuWriteAssignment from "./pages/Student/Assignment/StuWriteAssignment";
import StuEditAssignment from "./pages/Student/Assignment/StuEditAssignment";
import StuReadSyllabus from "./pages/Student/Syllabus/StuReadSyllabus";
import MuiTheme from "./styles/MuiTheme";
import { ThemeProvider } from "@emotion/react";
import SearchSyllabus from "./pages/Student/Syllabus/SearchSyllabus";
import Enrollment from "./pages/Student/Enrollment";
import ScoreBoard from "./pages/Student/ScoreBoard";

const App = () => {
  return (
    <>
      <ThemeProvider theme={MuiTheme}>
        <Routes>
          <Route exact path = "/" element={<LogIn />} />
          <Route path = "/root" element={<Management />} />
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
          <Route path = "/professor/syl_list/:sem/:sub_id" element={<SyllabusList />} />
          <Route path = "/professor/write_syl/:sem/:sub_id" element={<WriteSyllabus />} /> 
          <Route path = "/professor/edit_syl/:sem/:sub_id" element={<EditSyllabus />} />
          <Route path = "/professor/ref_list/:sem/:sub_id" element={<ReferenceList />} />
          <Route path = "/professor/read_ref/:sem/:sub_id/:ref_id" element={<ReadReference />} />
          <Route path = "/professor/edit_ref/:sem/:sub_id/:ref_id" element={<EditReference />} />
          <Route path = "/professor/write_ref/:sem/:sub_id" element={<WriteReference />} />
          <Route path = "/professor/assign_list/:sem/:sub_id" element={<AssignmentList />} />
          <Route path = "/professor/write_assign/:sem/:sub_id" element={<WriteAssignment />} />
          <Route path = "/professor/read_assign/:sem/:sub_id/:assign_id" element={<ReadAssignment />} />
          <Route path = "/professor/edit_assign/:sem/:sub_id/:assign_id" element={<EditAssignment />} />
          <Route path = "/student/main" element={<Main />} />
          <Route path = "/student/ranking" element={<Ranking />} />
          <Route path = "/student/enrollment" element={<Enrollment />} />
          <Route path = "/student/lecture/:sem/:sub_id" element={<StuLecture />} />
          <Route path = "/student/notice_list/:sem/:sub_id" element={<StuNoticeList />} />
          <Route path = "/student/read_notice/:sem/:sub_id/:noti_id" element={<StuReadNotice />} />
          <Route path = "/student/ref_list/:sem/:sub_id" element={<StuReferenceList />} />
          <Route path = "/student/read_ref/:sem/:sub_id/:ref_id" element={<StuReadReference />} />
          <Route path = "/student/assign_list/:sem/:sub_id" element={<StuAssignmentList />} />
          <Route path = "/student/read_assign/:sem/:sub_id/:assign_id" element={<StuReadAssignment />} />
          <Route path = "/student/write_assign/:sem/:sub_id/:assign_id" element={<StuWriteAssignment />} />
          <Route path = "/student/edit_assign/:sem/:sub_id/:assign_id" element={<StuEditAssignment />} />
          <Route path = "/student/read_syl/:sem/:sub_id" element={<StuReadSyllabus />} />
          <Route path = "/student/search_syl" element={<SearchSyllabus />} />
          <Route path = "/student/score_board" element={<ScoreBoard />} />
        </Routes>
      </ThemeProvider> 
    </>
  );
}

export default App;
