import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../components/Box/BgcolorStack";
import OuterBox from "../../components/Box/OuterBox";
import CommonButton from "../../components/Button/CommonButton";
import Row from "../../components/Grid/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonText from "../../components/Text/CommonText";
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

const WritePlan = () => {
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
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center"}}>
                    <ContentText variant="h4">강의 계획서</ContentText>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%", mt: 5 }}>
                        <TextField label="교과명" variant="outlined" fullWidth />
                        <TextField label="학정번호" variant="outlined" fullWidth />
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%", my: 1 }}>
                        <TextField label="년도학기" variant="outlined" fullWidth />
                        <TextField label="이수구분" variant="outlined" fullWidth />
                        <TextField label="학점" variant="outlined" fullWidth />
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%" }}>
                        <TextField label="강의시간" variant="outlined" fullWidth />
                        <TextField label="강의실" variant="outlined" fullWidth />
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%", my: 1 }}>
                        <TextField label="휴대폰" variant="outlined" fullWidth />
                        <TextField label="이메일" variant="outlined" fullWidth />
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%" }}>
                        <TextField label="담당교수" variant="outlined" fullWidth />
                        <TextField label="담당조교" variant="outlined" fullWidth />
                    </Row>
                    <TextField label="교과목 개요" variant="outlined" sx={{ width: "80%", my: 1 }} />
                    <TextField label="교과목 학습 성과" variant="outlined" multiline rows={5} sx={{ width: "80%" }} />
                    <TextField label="강의 운영 방식" variant="outlined" sx={{ width: "80%", my: 1 }} />
                    <TextField label="교재" variant="outlined" sx={{ width: "80%" }} />
                    <TextField label="평가 방법 비율" variant="outlined" sx={{ width: "80%", my: 1 }} />
                    <TextField label="일정" variant="outlined" multiline rows={10} sx={{ mb: 3, width: "80%" }} />
                    <Row spacing={3}>
                        <CommonButton variant="contained">등록</CommonButton>
                        <CommonButton href="/professor/notice_list" variant="contained">취소</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default WritePlan;