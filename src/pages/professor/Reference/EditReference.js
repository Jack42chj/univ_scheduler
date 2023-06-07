import { Container, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderPro from "../../../components/Header/HeaderPro";
import ContentText from "../../../components/Input/ContentText";
import AuthFormText from "../../../components/Input/AuthFormText";
import { reference_update } from "../../../services/userServices";
import { useLocation, useNavigate } from "react-router-dom";

const EditReference = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const refID = recvData.refID;
    const refData = recvData.refData;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onhandlePost = async (data) => {
        const { title, content, file } = data;
        const postData = { title, content, file };
        try{
            const response = await reference_update(currSemester, currSubjectID, refID, postData);
            if(response.status === 200){
                console.log("공지사항 수정 성공!");
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
            file: e.target.file.files[0],
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
                <OuterBox sx={{ py: 5, alignItems: "center"}}>
                    <ContentText variant="h4">강의자료실</ContentText>
                    <Container component="form" noValidate sx={{ width: "100%" }} onSubmit={handleSubmit}>
                        <TextField label="제목" name="title" variant="outlined" sx={{ mt: 3, width: "100%" }} defaultValue="" />
                        <AuthFormText>{title}</AuthFormText>
                        <TextField label="내용" variant="outlined" name="content" multiline rows={18} sx={{ mt: 3, width: "100%" }} defaultValue="" />
                        <AuthFormText>{content}</AuthFormText>
                        <TextField variant="outlined" type="file" name="file" sx={{ my: 3, width: "100%" }} defaultValue="" />
                        <Row spacing={3} sx={{ justifyContent: "center" }}>
                            <CommonButton variant="contained" type="submit">확인</CommonButton>
                            <CommonButton onClick={() => navigate(-1)} variant="contained">취소</CommonButton>
                        </Row>
                    </Container>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default EditReference;