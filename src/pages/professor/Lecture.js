import { Divider, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../components/Box/BgcolorStack";
import InnerBox from "../../components/Box/InnerBox";
import OuterBox from "../../components/Box/OuterBox";
import AuthButton from "../../components/Button/AuthButton";
import Column from "../../components/Grid/Column";
import Row from "../../components/Grid/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonText from "../../components/Text/CommonText";

const SemesterList = [
    {semester: "2022-1"}, {semester: "2022-2"},
    {semester: "2023-1"}, {semester: "2023-2"},
];

const SubjectList = [
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
];

const NoticeList = [
    {text: "소프트웨어공학 공지", date: "2023-03-17"}, {text: "소프트웨어공학 공지", date: "2023-03-17"},
    {text: "소프트웨어공학 공지", date: "2023-03-17"}, {text: "소프트웨어공학 공지", date: "2023-03-17"},
    {text: "소프트웨어공학 공지", date: "2023-03-17"},
];

const ReadNotice = () => {
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
                    <CommonText variant="h4">강의 관리</CommonText>
                    <Row sx={{ justifyContent: "flex-start" }}>
                        <InnerBox sx={{ p: 5 }}>
                            <CommonText variant="h6">공지사항+</CommonText>
                            <Divider />
                            {Object.keys(NoticeList).map((list) => (
                                <CommonText variant="h6">{NoticeList[list].text}{NoticeList[list].date}</CommonText>
                            ))}
                        </InnerBox>
                        <Column>
                            <InnerBox>
                                <CommonText variant="h6">강의정보+</CommonText>
                            </InnerBox>
                            <AuthButton>수강 인원 조회 및 성적 입력+</AuthButton>
                        </Column>
                    </Row>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default ReadNotice;