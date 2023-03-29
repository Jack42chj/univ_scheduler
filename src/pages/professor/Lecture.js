import { Divider, IconButton, MenuItem, Select } from "@mui/material";
import { Fragment, useState } from "react";
import BgcolorBox from "../../components/Box/BgcolorStack";
import InnerBox from "../../components/Box/InnerBox";
import OuterBox from "../../components/Box/OuterBox";
import AuthButton from "../../components/Button/AuthButton";
import Column from "../../components/Grid/Column";
import Row from "../../components/Grid/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonText from "../../components/Text/CommonText";
import AddIcon from '@mui/icons-material/Add';

const SemesterList = [
    {semester: "2022-1"}, {semester: "2022-2"},
    {semester: "2023-1"}, {semester: "2023-2"},
];

const SubjectList = [
    {name: "소프트웨어공학"}, {name: "운영체제"}, {name: "KW-VIP"}, 
    {name: "데이터구조설계"}, {name: "시스템프로그래밍"}, 
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
    const [lectureData] = useState({
        name: "소프트웨어공학",
        id: "H020-4-0846-01",
        period: "월 5, 수 6",
        class: "새빛206",
    });

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
                <OuterBox sx={{ py: 10, justifyContent: "center", display: { md: 'none', lg: "flex", xs: "none"} }}>
                    <CommonText variant="h4">강의 관리</CommonText>
                    <Row sx={{ justifyContent: "space-evenly", mt: 5 }}>
                        <InnerBox sx={{ p: 3 }}>
                            <Row>
                                <CommonText variant="h5">공지사항</CommonText>
                                <IconButton sx={{ color: "#FCDEC0"}}><AddIcon fontSize="large"/></IconButton>
                            </Row>
                            <Divider />
                            {Object.keys(NoticeList).map((list, index) => (
                                <Fragment key={index}>
                                    <Row spacing={10}>
                                        <CommonText variant="overline">{NoticeList[list].text}</CommonText>
                                        <CommonText variant="overline">{NoticeList[list].date}</CommonText>
                                    </Row>
                                </Fragment>
                            ))}
                        </InnerBox>
                        <Column>
                            <AuthButton sx={{ mb: 2, fontSize: "18px" }}>수강 인원 조회 및 성적 입력</AuthButton>
                            <InnerBox sx={{ p: 3 }}>
                                <Row>
                                    <CommonText variant="h5">강의정보</CommonText>
                                    <IconButton sx={{ color: "#FCDEC0"}}><AddIcon fontSize="large"/></IconButton>
                                </Row>
                                <Divider />
                                <Row spacing={10}>
                                    <CommonText variant="overline">과목명</CommonText>
                                    <CommonText variant="overline">{lectureData.name}</CommonText>
                                </Row>
                                <Row>
                                    <CommonText variant="overline">학정번호</CommonText>
                                    <CommonText variant="overline">{lectureData.id}</CommonText>
                                </Row>
                                <Row>
                                    <CommonText variant="overline">교시</CommonText>
                                    <CommonText variant="overline">{lectureData.period}</CommonText>
                                </Row>
                                <Row>
                                    <CommonText variant="overline">강의실</CommonText>
                                    <CommonText variant="overline">{lectureData.class}</CommonText>
                                </Row>
                            </InnerBox>
                        </Column>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 1, display: { lg: "none", md: 'flex', xs: "flex" } }}>
                    <CommonText variant="h4" sx={{ mt: 3 }}>강의 관리</CommonText>
                    <Column sx={{ m: 3, alignItems: "stretch"}}>
                        <Column>
                            <AuthButton sx={{ fontSize: "14px" }}>수강 인원 조회 및 성적 입력</AuthButton>
                            <InnerBox sx={{ p: 3, my: 3 }}>
                                <Row>
                                    <CommonText variant="h5">강의정보</CommonText>
                                    <IconButton sx={{ color: "#FCDEC0"}}><AddIcon fontSize="large"/></IconButton>
                                </Row>
                                <Divider />
                                <Row spacing={10}>
                                    <CommonText variant="overline">과목명</CommonText>
                                    <CommonText variant="overline">{lectureData.name}</CommonText>
                                </Row>
                                <Row>
                                    <CommonText variant="overline">학정번호</CommonText>
                                    <CommonText variant="overline">{lectureData.id}</CommonText>
                                </Row>
                                <Row>
                                    <CommonText variant="overline">교시</CommonText>
                                    <CommonText variant="overline">{lectureData.period}</CommonText>
                                </Row>
                                <Row>
                                    <CommonText variant="overline">강의실</CommonText>
                                    <CommonText variant="overline">{lectureData.class}</CommonText>
                                </Row>
                            </InnerBox>
                        </Column>
                        <InnerBox sx={{ p: 3 }}>
                            <Row>
                                <CommonText variant="h5">공지사항</CommonText>
                                <IconButton sx={{ color: "#FCDEC0"}}><AddIcon fontSize="large"/></IconButton>
                            </Row>
                            <Divider />
                            {Object.keys(NoticeList).map((list, index) => (
                                <Fragment key={index}>
                                    <Row>
                                        <CommonText variant="overline">{NoticeList[list].text}</CommonText>
                                        <CommonText variant="overline">{NoticeList[list].date}</CommonText>
                                    </Row>
                                </Fragment>
                            ))}
                        </InnerBox>
                    </Column>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default ReadNotice;