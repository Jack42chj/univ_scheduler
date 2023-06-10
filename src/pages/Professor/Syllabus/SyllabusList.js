import { MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderPro from "../../../components/Header/HeaderPro";
import BgcolorStack from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import Row from "../../../components/Stack/Row";
import ContentText from "../../../components/Input/ContentText";
import CommonButton from "../../../components/Button/CommonButton";
import { syllabus_list } from "../../../services/proServices";

const columns = [
    { id: "sub_code", label: "학정번호"},
    { id: "subject", label: "과목명" },
    { id: "time", label: "교시" },
    { id: "room", label: "강의실" },
];

function createData(sub_code, subject, time, room) {
    return {sub_code, subject, time, room};
};

const SyllabusList = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const semesterList = recvData.semesterList;
    const currSubject = recvData.currSubject;
    const subjectList = recvData.subjectList;
    const currSubjectID = recvData.currSubjectID;
    const lectureData = recvData.lectureData;
    
    // const handleChangeSubject = async (e) => {
    //     const sendData = { "subject": e.target.value }
    //     try{
    //         const resp = await professor_change_main(sendData);
    //         if(resp.status === 201){
    //             setData(resp.data);
    //         }
    //     }
    //     catch(err){console.log(err)}
    // };

    const [syllabusList, setSyllabusList] = useState();

    const getSyllabusList = async () => {
        const response = await syllabus_list(currSubjectID, currSemester);
        setSyllabusList(response.data);
    };
    useEffect(() => {
        getSyllabusList();
    }, []);

    //const syllabusList = {};
    // const syllabusList = {
    //     "syllabus": {
    //         "sub_code": "H020-1-0019-02",
    //         "subject_name": "데이터구조설계",
    //         "time": "월3수4",
    //         "class": "새빛302호",
    //     },
    // };

    const rows = [];
    if(syllabusList && syllabusList.syllabus){
        rows.push(createData(syllabusList.syllabus.sub_code, syllabusList.syllabus.subject_name, syllabusList.syllabus.time, syllabusList.syllabus.class));
    };

    const handleClickRow = () => {
        const url = `/professor/edit_syl/${currSemester}/${currSubjectID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "semesterList" : semesterList,
            "subjectList" : subjectList,
            "lectureData" : lectureData
        };
        navigate(url, { state: sendData });
    };

    const handleWriteSyllabus = () => {
        const url = `/professor/write_syl/${currSemester}/${currSubjectID}`;
        const sendWriteData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
            "semesterList" : semesterList,
            "subjectList" : subjectList,
            "lectureData" : lectureData
        };
        navigate(url, { state: sendWriteData });
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
                            //onChange={changeSemester}
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
                            //onChange={handleChangeSubject}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            {subjectList.map((list) => (
                                <MenuItem key={list.name} value={list.name}>{list.name+'('+ list.sub_ID +')'}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <ContentText variant="h4">강의계획서</ContentText>
                    { syllabusList ? (
                        <>
                            <TableContainer sx={{ width: "90%", py: 5}}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ cursor: "pointer" }}>
                                        {rows.map((row, index) => (
                                            <TableRow key={index} onClick={handleClickRow}>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align="center">
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <CommonButton variant="contained" onClick={() => navigate(-1)}>이전</CommonButton>
                        </>
                        
                    ) : (
                        <Row spacing={3} mt={3}>
                            <CommonButton variant="contained" onClick={handleWriteSyllabus}>작성</CommonButton>
                            <CommonButton variant="contained" onClick={() => navigate(-1)}>이전</CommonButton>
                        </Row>
                    )}
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default SyllabusList;