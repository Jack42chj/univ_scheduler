import { Container, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../components/Stack/BackgroundStack";
import OuterBox from "../../components/Box/OuterBox";
import CommonButton from "../../components/Button/CommonButton";
import Row from "../../components/Stack/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import ContentText from "../../components/Input/ContentText";
import AuthFormText from "../../components/Input/AuthFormText";
import { notice_update } from "../../services/userServices";

const SemesterList = [
    {semester: "2022-1"}, {semester: "2022-2"},
    {semester: "2023-1"}, {semester: "2023-2"},
    {semester: "2024-1"},
];

const SubjectList = [
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
];

const EditNotice = () => {
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleChangeSemester = (e) => setSemester(e.target.value);
    const handleChangeSubject = (e) => setSubject(e.target.value);

    const onhandlePost = async (data) => {
        const { title, content, file } = data;
        const postData = { title, content, file };
        console.log(semester, subject);
        console.log(postData);
        try{
            const response = await notice_update(semester, subject, postData);
            if(response.status === 200){
                console.log("공지사항 생성 성공!");
            }
            else if(response.status === 401){
                console.log("잘못된 access 토큰!");
            }
            else if(response.status === 419){
                console.log("access 토큰 만료!");
            }
            else
                alert(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            title: data.get("title"),
            content: data.get("content"),
            file: e.target.file.files[0]
        };
        const { title, content } = joinData;

        if (title.trim() !== "") setTitle("");
        else setTitle("제목을 입력하세요");

        if (content.trim() !== "") setContent("");
        else setContent("내용을 입력하세요");

        if (title.trim() !=="" && content.trim() !== "") {
            onhandlePost(joinData);
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
                            value={semester}
                            name="semester"
                            onChange={handleChangeSemester}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            <MenuItem value="">학기</MenuItem>
                            {Object.keys(SemesterList).map((year, index) => (
                                <MenuItem key={index} value={SemesterList[year].semester}>{SemesterList[year].semester}</MenuItem>
                            ))}
                        </Select>
                        <ContentText variant="h6">과목명</ContentText>
                        <Select
                            value={subject}
                            name="subject"
                            onChange={handleChangeSubject}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            <MenuItem value="">과목명</MenuItem>
                            {Object.keys(SubjectList).map((list, index) => (
                                <MenuItem key={index} value={SubjectList[list].name}>{SubjectList[list].name}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center"}}>
                    <ContentText variant="h4">강의 공지사항</ContentText>
                    <Container component="form" noValidate sx={{ width: "100%" }} onSubmit={handleSubmit}>
                        <TextField label="제목" name="title" variant="outlined" sx={{ mt: 3, width: "100%" }} defaultValue="" />
                        <AuthFormText>{title}</AuthFormText>
                        <TextField label="내용" variant="outlined" name="content" multiline rows={18} sx={{ mt: 3, width: "100%" }} defaultValue="" />
                        <AuthFormText>{content}</AuthFormText>
                        <TextField variant="outlined" type="file" name="file" sx={{ my: 3, width: "100%" }} defaultValue="" />
                        <Row spacing={3}>
                            <CommonButton variant="contained" type="submit">확인</CommonButton>
                            <CommonButton href="/professor/notice_list" variant="contained">취소</CommonButton>
                        </Row>
                    </Container>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default EditNotice;