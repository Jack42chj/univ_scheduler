import { Divider, IconButton, MenuItem, Select } from "@mui/material";
import { Fragment, useState } from "react";
import InnerBox from "../../components/Box/InnerBox";
import OuterBox from "../../components/Box/OuterBox";
import AuthButton from "../../components/Button/AuthButton";
import HeaderPro from "../../components/Header/HeaderPro";
import AddIcon from '@mui/icons-material/Add';
import BgcolorStack from "../../components/Stack/BackgroundStack";
import Row from "../../components/Stack/Row";
import ContentText from "../../components/Input/ContentText";
import Column from "../../components/Stack/Column";
import { useLocation } from "react-router-dom";

const NoticeList = [
    {text: "소프트웨어공학 공지", date: "2023-03-17"}, {text: "소프트웨어공학 공지", date: "2023-03-17"},
    {text: "소프트웨어공학 공지", date: "2023-03-17"}, {text: "소프트웨어공학 공지", date: "2023-03-17"},
    {text: "소프트웨어공학 공지", date: "2023-03-17"},
];

const Lecture = () => {
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const semesterList = recvData.semesterList;
    const currSubject = recvData.data.name;
    const subjectList = recvData.subjectList;

    const [semester, setSemester] = useState(currSemester);
    const [subject, setSubject] = useState(currSubject);
    const handleChangeSemester = (e) => setSemester(e.target.value);
    const handleChangeSubject = (e) => setSubject(e.target.value);
    const [lectureData] = useState({
        name: recvData.data.name,
        id: recvData.data.num,
        period: recvData.data.period,
        class: recvData.data.room,
    });

    return(
        <>
            <HeaderPro />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={semester}
                            name="semester"
                            onChange={handleChangeSemester}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                            defaultValue={currSemester}
                        >
                            {semesterList.map((year) => (
                                <MenuItem key={year.semester} value={year.semester}>{year.semester}</MenuItem>
                            ))}
                        </Select>
                        <ContentText variant="h6">과목명</ContentText>
                        <Select
                            value={subject}
                            name="subject"
                            onChange={handleChangeSubject}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                            defaultValue={currSubject}
                        >
                            {subjectList.map((list) => (
                                <MenuItem key={list.name} value={list.name}>{list.name}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 10, justifyContent: "center", display: { md: 'none', lg: "flex", xs: "none"} }}>
                    <ContentText variant="h4">강의 관리</ContentText>
                    <Row sx={{ justifyContent: "space-evenly", mt: 5 }}>
                        <InnerBox sx={{ p: 3 }}>
                            <Row>
                                <ContentText variant="h5">공지사항</ContentText>
                                <IconButton sx={{ color: "#FCDEC0"}} href="/professor/notice_list"><AddIcon fontSize="large"/></IconButton>
                            </Row>
                            <Divider />
                            {Object.keys(NoticeList).map((list, index) => (
                                <Fragment key={index}>
                                    <Row spacing={10}>
                                        <ContentText variant="overline">{NoticeList[list].text}</ContentText>
                                        <ContentText variant="overline">{NoticeList[list].date}</ContentText>
                                    </Row>
                                </Fragment>
                            ))}
                        </InnerBox>
                        <Column>
                            <AuthButton sx={{ mb: 2, fontSize: "18px" }} href="/professor/student_score">수강 인원 조회 및 성적 입력</AuthButton>
                            <InnerBox sx={{ p: 3 }}>
                                <Row>
                                    <ContentText variant="h5">강의정보</ContentText>
                                    <IconButton sx={{ color: "#FCDEC0"}} href="/professor/edit_plan"><AddIcon fontSize="large"/></IconButton>
                                </Row>
                                <Divider />
                                <Row spacing={10}>
                                    <ContentText variant="overline">과목명</ContentText>
                                    <ContentText variant="overline">{lectureData.name}</ContentText>
                                </Row>
                                <Row>
                                    <ContentText variant="overline">학정번호</ContentText>
                                    <ContentText variant="overline">{lectureData.id}</ContentText>
                                </Row>
                                <Row>
                                    <ContentText variant="overline">교시</ContentText>
                                    <ContentText variant="overline">{lectureData.period}</ContentText>
                                </Row>
                                <Row>
                                    <ContentText variant="overline">강의실</ContentText>
                                    <ContentText variant="overline">{lectureData.class}</ContentText>
                                </Row>
                            </InnerBox>
                        </Column>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 1, mb: 3, display: { lg: "none", md: 'flex', xs: "flex" } }}>
                    <ContentText variant="h4" sx={{ mt: 3 }}>강의 관리</ContentText>
                    <Column sx={{ m: 3, alignItems: "stretch"}}>
                        <Column>
                            <AuthButton sx={{ fontSize: "14px" }} href="/professor/student_score">수강 인원 조회 및 성적 입력</AuthButton>
                            <InnerBox sx={{ p: 3, my: 3 }}>
                                <Row>
                                    <ContentText variant="h5">강의정보</ContentText>
                                    <IconButton sx={{ color: "#FCDEC0"}} href="/professor/edit_plan"><AddIcon fontSize="large"/></IconButton>
                                </Row>
                                <Divider />
                                <Row spacing={10}>
                                    <ContentText variant="overline">과목명</ContentText>
                                    <ContentText variant="overline">{lectureData.name}</ContentText>
                                </Row>
                                <Row>
                                    <ContentText variant="overline">학정번호</ContentText>
                                    <ContentText variant="overline">{lectureData.id}</ContentText>
                                </Row>
                                <Row>
                                    <ContentText variant="overline">교시</ContentText>
                                    <ContentText variant="overline">{lectureData.period}</ContentText>
                                </Row>
                                <Row>
                                    <ContentText variant="overline">강의실</ContentText>
                                    <ContentText variant="overline">{lectureData.class}</ContentText>
                                </Row>
                            </InnerBox>
                        </Column>
                        <InnerBox sx={{ p: 3 }}>
                            <Row>
                                <ContentText variant="h5">공지사항</ContentText>
                                <IconButton sx={{ color: "#FCDEC0"}} href="/professor/notice_list"><AddIcon fontSize="large"/></IconButton>
                            </Row>
                            <Divider />
                            {Object.keys(NoticeList).map((list, index) => (
                                <Fragment key={index}>
                                    <Row>
                                        <ContentText variant="overline">{NoticeList[list].text}</ContentText>
                                        <ContentText variant="overline">{NoticeList[list].date}</ContentText>
                                    </Row>
                                </Fragment>
                            ))}
                        </InnerBox>
                    </Column>
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default Lecture;