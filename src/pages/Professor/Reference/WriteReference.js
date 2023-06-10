import { Container, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import BgcolorStack from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderPro from "../../../components/Header/HeaderPro";
import ContentText from "../../../components/Input/ContentText";
import { reference_write } from "../../../services/proServices";
import AuthFormText from "../../../components/Input/AuthFormText";
import { checkTrim } from "../../../utils/Trim";
import { useLocation, useNavigate } from "react-router-dom";

const WriteReference = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const semesterList = recvData.semesterList;
    const subjectList = recvData.subjectList;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [fileList, setFileList] = useState([]);

    const onhandlePost = async (data) => {
        try{
            const response = await reference_write(currSubjectID, currSemester, data);
            if(response.status === 201){
                console.log("강의자료 생성 성공!");
                navigate(`/professor/ref_list/${currSemester}/${currSubjectID}`, {
                    state: {
                        "currSemester": currSemester,
                        "currSubject" : currSubject,
                        "semesterList" : semesterList,
                        "subjectList" : subjectList,
                        "currSubjectID": currSubjectID,
                    }
                }
            );}
            else if(response.status === 401){
                console.log("잘못된 access 토큰!");
                navigate("/");
            }
            else if(response.status === 419){
                console.log("access 토큰 만료!");
                navigate("/");
            }
            else
                alert(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const onChangeFile = (e) => {
        if (e.target.files) {
            const newFile = e.target.files;
            setFileList([newFile]);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const joinData = {
            title: formData.get("title"),
            content: formData.get("content"),
        };
        const { title, content } = joinData;

        fileList.forEach(file => {
            formData.append('files', file);
        });

        if (checkTrim(title)) setTitle("");
        else setTitle("제목을 입력하세요");

        if (checkTrim(content)) setContent("");
        else setContent("내용을 입력하세요");

        if (checkTrim(title) && checkTrim(content)) {
            onhandlePost(formData);
        }
    };

    return(
        <>
            <HeaderPro />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={currSemester}
                            name="semester"
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                            disabled
                        >
                            <MenuItem value={currSemester}>{currSemester}</MenuItem>
                        </Select>
                        <ContentText variant="h6">과목명</ContentText>
                        <Select
                            value={currSubject}
                            name="subject"
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                            disabled
                        >
                            <MenuItem value={currSubject}>{currSubject}</MenuItem>
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, mb: 1, justifyContent: "center", alignItems: "center"}}>
                    <ContentText variant="h4">강의자료실</ContentText>
                    <Container component="form" noValidate sx={{ width: "100%" }} onSubmit={handleSubmit}>
                        <TextField label="제목" name="title" variant="outlined" sx={{ mt: 3, width: "100%" }} />
                        <AuthFormText>{title}</AuthFormText>
                        <TextField label="내용" variant="outlined" name="content" multiline rows={18} sx={{ mt: 3, width: "100%" }} />
                        <AuthFormText>{content}</AuthFormText>
                        <TextField variant="outlined" type="file" name="files" inputProps={{ multiple: true }} onChange={onChangeFile} sx={{ my: 3, width: "100%" }} />
                        <Row spacing={3} sx={{ justifyContent: "center" }}>
                            <CommonButton variant="contained" type="submit">등록</CommonButton>
                            <CommonButton onClick={() => {navigate(-1) }} variant="contained">취소</CommonButton>
                        </Row>
                    </Container>
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default WriteReference;