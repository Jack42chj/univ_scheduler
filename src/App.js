import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/Auth/LogIn";
import SignUpPro from "./pages/Auth/SignUpPro";
import SignUpStu from "./pages/Auth/SignUpStu";
import WriteNotice from "./pages/Professor/WriteNotice";
import NoticeList from "./pages/Professor/NoticeList";
import EditNotice from "./pages/Professor/EditNotice";
import ReadNotice from "./pages/Professor/ReadNotice";
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
          <Route path = "/professor/notice_list/:sub_id/:sem_id" element={<NoticeList />} />
          <Route path = "/professor/read_notice" element={<ReadNotice />} />
          <Route path = "/professor/write_notice/:sub_id/:sem_id/create" element={<WriteNotice />} /> 
          <Route path = "/professor/edit_notice/:sub_id/:sem_id/:noti_id/update" element={<EditNotice />} />
        </Routes>
      </ThemeProvider> 
    </>
  );
}

export default App;
