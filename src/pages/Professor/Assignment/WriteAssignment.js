import { Container, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderPro from "../../../components/Header/HeaderPro";
import ContentText from "../../../components/Input/ContentText";
import { assignment_write } from "../../../services/proServices";
import AuthFormText from "../../../components/Input/AuthFormText";
import { checkTrim } from "../../../utils/Trim";
import { useLocation, useNavigate } from "react-router-dom";
import { checkTime } from "../../../utils/Regex";


const WriteAssignment = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const semesterList = recvData.semesterList;
    const subjectList = recvData.subjectList;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [due_date, setTime] = useState("");
    const [fileList, setFileList] = useState([]);

    const onhandlePost = async (data) => {
        try{
            const response = await assignment_write(currSubjectID, currSemester, data);
            if(response.status === 201){
                alert("과제 생성 성공!");
                navigate(`/professor/assign_list/${currSemester}/${currSubjectID}`, {
                    state: {
                        "currSemester": currSemester,
                        "currSubject" : currSubject,
                        "semesterList" : semesterList,
                        "subjectList" : subjectList,
                        "currSubjectID": currSubjectID,
                    }
                }
            );}
        } catch (err) {
            if (err.response && err.response.status.toString().startswith('4')) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else {
                console.log(err);
            }
        }
    };

    const onChangeFile = (e) => {
        if (e.target.files) {
            const newFile = e.target.files;
            setFileList([newFile]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const joinData = {
            title: formData.get("title"),
            content: formData.get("content"),
            due_date: formData.get("due_date")
        };
        const { title, content, due_date } = joinData;

        fileList.forEach(file => {
            formData.append('files', file);
        });

        if (checkTrim(title)) setTitle("");
        else setTitle("제목을 입력하세요");

        if (checkTrim(content)) setContent("");
        else setContent("내용을 입력하세요");

        if (checkTime(due_date)) setTime("");
        else setTime("시간을 올바르게 입력하세요");

        if (checkTrim(title) && checkTrim(content) && checkTime(due_date)) {
            onhandlePost(formData);
        }
    };

    return(
        <>
            <HeaderPro />
            <BgcolorBox sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={currSemester}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                            disabled
                        >
                            <MenuItem value={currSemester}>{currSemester}</MenuItem>
                        </Select>
                        <ContentText variant="h6">과목명</ContentText>
                        <Select
                            value={currSubject}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                            disabled
                        >
                            <MenuItem value={currSubject}>{currSubject}</MenuItem>
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, mb: 1, justifyContent: "center", alignItems: "center"}}>
                    <ContentText variant="h4">과제</ContentText>
                    <Container component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
                        <TextField label="제목" name="title" variant="outlined" sx={{ mt: 3, width: "100%" }} />
                        <AuthFormText>{title}</AuthFormText>
                        <TextField label="내용" variant="outlined" name="content" multiline rows={18} sx={{ mt: 3, width: "100%" }} />
                        <AuthFormText>{content}</AuthFormText>
                        <TextField label="제출기한 ex) 2023-12-31 15:00:00" variant="outlined" name="due_date" sx={{ mt: 3, width: "100%" }} />
                        <AuthFormText>{due_date}</AuthFormText>
                        <TextField variant="outlined" type="file" name="files" inputProps={{ multiple: true }} onChange={onChangeFile} sx={{ my: 3, width: "100%" }} />
                        <Row spacing={3} sx={{ justifyContent: "center" }}>
                            <CommonButton variant="contained" type="submit">등록</CommonButton>
                            <CommonButton onClick={() => {navigate(-1) }} variant="contained">취소</CommonButton>
                        </Row>
                    </Container>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default WriteAssignment;