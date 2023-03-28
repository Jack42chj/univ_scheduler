import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../components/Box/BgcolorStack";
import OuterBox from "../../components/Box/OuterBox";
import CommonButton from "../../components/Button/CommonButton";
import Row from "../../components/Grid/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonText from "../../components/Text/CommonText";

const SemesterList = [
    {semester: "2022-1"}, {semester: "2022-2"},
    {semester: "2023-1"}, {semester: "2023-2"},
    {semester: "2024-1"},
];

const SubjectList = [
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
];

const WriteNotice = () => {
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const handleChangeSemester = (e) => setSemester(e.target.value);
    const handleChangeSubject = (e) => setSubject(e.target.value);

    return(
        <>
            <HeaderPro />
            <BgcolorBox sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <CommonText variant="h6">학기</CommonText>
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
                        <CommonText variant="h6">과목명</CommonText>
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
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <CommonText variant="h4">강의 공지사항</CommonText>
                    <TextField label="제목" variant="outlined" sx={{ my: 3, width: "80%" }} />
                    <TextField label="내용" variant="outlined" multiline rows={8} sx={{ mb: 3, width: "80%" }} />
                    <TextField label="파일 업로드" variant="outlined" sx={{ mb: 3, width: "80%" }} />
                    <Row spacing={3}>
                        <CommonButton variant="contained">등록</CommonButton>
                        <CommonButton variant="contained">취소</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default WriteNotice;