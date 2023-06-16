import { Divider, IconButton, MenuItem, Select } from "@mui/material";
import { Fragment, useState } from "react";
import InnerBox from "../../components/Box/InnerBox";
import OuterBox from "../../components/Box/OuterBox";
import HeaderStu from "../../components/Header/HeaderStu";
import AddIcon from '@mui/icons-material/Add';
import BgcolorStack from "../../components/Stack/BackgroundStack";
import Row from "../../components/Stack/Row";
import ContentText from "../../components/Input/ContentText";
import Column from "../../components/Stack/Column";
import { useLocation, useNavigate } from "react-router-dom";

const StuLecture = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const semesterList = recvData.semesterList;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const subjectList = recvData.subjectList;
    const [lectureData] = useState({
        name: recvData.data.sub_name,
        id: recvData.data.sub_code,
        period: recvData.data.time,
        class: recvData.data.class,
    });

    const handleClickNotice = () => {
        const url = `/student/notice_list/${currSemester}/${currSubjectID}`;
        const sendNoticeData = {
            "currSemester": currSemester,
            "semesterList": semesterList,
            "subjectList": subjectList,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
        };
        navigate(url, { state: sendNoticeData });
    };

    const handleClickRef = () => {
        const url = `/student/ref_list/${currSemester}/${currSubjectID}`;
        const sendRefData = {
            "currSemester": currSemester,
            "semesterList": semesterList,
            "subjectList": subjectList,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
        };
        navigate(url, { state: sendRefData });
    };

    const handleClickAssign = (data) => {
        const url = `/student/assign_list/${currSemester}/${currSubjectID}`;
        const sendData = {
            "currSemester": currSemester,
            "semesterList": semesterList,
            "subjectList": subjectList,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
        };
        navigate(url, { state: sendData });
    };

    const handleClickSyl = () => {
        const url = `/student/read_syl/${currSemester}/${currSubjectID}`;
        const sendRefData = {
            "currSemester": currSemester,
            "semesterList": semesterList,
            "subjectList": subjectList,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
            "lectureData" : lectureData,
        };
        navigate(url, { state: sendRefData });
    };
    
    return(
        <>
            <HeaderStu />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={currSemester}
                            name="semester"
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            {semesterList.map((year) => (
                                <MenuItem key={year.semester} value={year.semester}>{year.semester}</MenuItem>
                            ))}
                        </Select>
                        <ContentText variant="h6">과목명</ContentText>
                        <Select
                            value={currSubject}
                            name="subject"
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            {subjectList.map((list) => (
                                <MenuItem key={list.name} value={list.name}>{list.name + '('+ list.sub_ID + ')'}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 8, justifyContent: "center", display: { md: 'none', lg: "flex", xs: "none"} }}>
                    <ContentText variant="h4">강의 관리</ContentText>
                    <Row sx={{ justifyContent: "space-evenly", mt: 5 }}>
                        <Column>
                            <InnerBox sx={{ p: 1, mb: 2 }}>
                                <Row>
                                    <ContentText variant="h5">공지사항</ContentText>
                                    <IconButton sx={{ color: "#FCDEC0"}} onClick={handleClickNotice}><AddIcon fontSize="large"/></IconButton>
                                </Row>
                            </InnerBox>
                            <InnerBox sx={{ p: 1, mb: 2 }}>
                                <Row>
                                    <ContentText variant="h5">강의자료실</ContentText>
                                    <IconButton sx={{ color: "#FCDEC0"}} onClick={handleClickRef}><AddIcon fontSize="large"/></IconButton>
                                </Row>
                            </InnerBox>
                            <InnerBox sx={{ p: 1 }}>
                                <Row>
                                    <ContentText variant="h5">과제</ContentText>
                                    <IconButton sx={{ color: "#FCDEC0"}} onClick={handleClickAssign}><AddIcon fontSize="large"/></IconButton>
                                </Row>
                            </InnerBox>
                        </Column>
                        <Column>
                            <InnerBox sx={{ p: 2, mb: 3 }}>
                                <Row>
                                    <ContentText variant="h5">강의정보</ContentText>
                                    <IconButton sx={{ color: "#FCDEC0"}} onClick={handleClickSyl}><AddIcon fontSize="large"/></IconButton>
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
                            <InnerBox sx={{ p: 3, my: 3 }}>
                                <Row>
                                    <ContentText variant="h5">강의정보</ContentText>
                                    <IconButton sx={{ color: "#FCDEC0"}} onClick={handleClickSyl}><AddIcon fontSize="large"/></IconButton>
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
                        <InnerBox sx={{ p: 3, mb: 3 }}>
                            <Row>
                                <ContentText variant="h5">공지사항</ContentText>
                                <IconButton sx={{ color: "#FCDEC0"}} onClick={handleClickNotice}><AddIcon fontSize="large"/></IconButton>
                            </Row>
                        </InnerBox>
                        <InnerBox sx={{ p: 3, mb: 3 }}>
                            <Row>
                                <ContentText variant="h5">강의자료실</ContentText>
                                <IconButton sx={{ color: "#FCDEC0"}} onClick={handleClickRef}><AddIcon fontSize="large"/></IconButton>
                            </Row>
                        </InnerBox>
                        <InnerBox sx={{ p: 3 }}>
                            <Row>
                                <ContentText variant="h5">과제</ContentText>
                                <IconButton sx={{ color: "#FCDEC0"}} onClick={handleClickAssign}><AddIcon fontSize="large"/></IconButton>
                            </Row>
                        </InnerBox>
                    </Column>
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default StuLecture;