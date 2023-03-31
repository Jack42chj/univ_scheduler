import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../components/Box/BgcolorStack";
import OuterBox from "../../components/Box/OuterBox";
import CommonButton from "../../components/Button/CommonButton";
import Row from "../../components/Grid/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonText from "../../components/Text/CommonText";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import ContentText from "../../components/Text/ContentText";

const SemesterList = [
    {semester: "2022-1"}, {semester: "2022-2"},
    {semester: "2023-1"}, {semester: "2023-2"},
    {semester: "2024-1"},
];

const SubjectList = [
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
];

const content = "hello\n\nworld\n\nhi\n\nmy name\n\nis\n\nchoi\n\nhojin";

const ReadNotice = () => {
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const handleChangeSemester = (e) => setSemester(e.target.value);
    const handleChangeSubject = (e) => setSubject(e.target.value);

    const handleSubmit = () => {
        const title = document.getElementsByName("title")[0].value;
        console.log(title);
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
                            sx={{ width: "30%" }}
                        >
                            <MenuItem value="">학기</MenuItem>
                            {Object.keys(SemesterList).map((year) => (
                                <MenuItem key={SemesterList[year].semester} value={SemesterList[year].semester}>{SemesterList[year].semester}</MenuItem>
                            ))}
                        </Select>
                        <ContentText variant="h6">과목명</ContentText>
                        <Select
                            value={subject}
                            name="subject"
                            onChange={handleChangeSubject}
                            displayEmpty
                            sx={{ width: "30%" }}
                        >
                            <MenuItem value="">과목명</MenuItem>
                            {Object.keys(SubjectList).map((list) => (
                                <MenuItem key={SubjectList[list].name} value={SubjectList[list].name}>{SubjectList[list].name}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, alignItems: "center"}}>
                    <ContentText variant="h4">강의 공지사항</ContentText>
                    <Row sx={{ width: "100%", justifyContent: "space-evenly", mt: 3 }}>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>작성자: 이기훈</ContentText>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>등록일: 2023-03-17</ContentText>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>조회수: 25</ContentText>
                    </Row>
                    <TextField label="제목" name="title" variant="outlined" sx={{ my: 3, width: "80%" }} defaultValue="소프트웨어공학 공지" disabled/>
                    <TextField label="내용" name="content" variant="outlined" multiline rows={18} sx={{ width: "80%" }} defaultValue={content} disabled/>
                    <ContentText sx={{ justifyContent: "flex-start", my: 3, width: "80%" }}><AttachFileIcon />파일: 소프트웨어공학.pdf&nbsp;&nbsp;<DownloadIcon /></ContentText>
                    <Row spacing={3}>
                        <CommonButton onClick={handleSubmit} variant="contained">수정</CommonButton>
                        <CommonButton variant="contained">삭제</CommonButton>
                        <CommonButton href="/professor/notice_list" variant="contained">취소</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default ReadNotice;