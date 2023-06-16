import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderPro from "../../../components/Header/HeaderPro";
import BgcolorStack from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import Row from "../../../components/Stack/Row";
import ContentText from "../../../components/Input/ContentText";
import CommonButton from "../../../components/Button/CommonButton";
import { assignment_list } from "../../../services/proServices";

const columns = [
    { id: "num", label: "번호"},
    { id: "title", label: "제목" },
    { id: "creat_time", label: "작성일" },
    { id: "due_time", label: "마감일" },
];

function createData(num ,title, creat_time, due_time) {
    return {num ,title, creat_time, due_time};
};

const AssignmentList = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const semesterList = recvData.semesterList;
    const currSubject = recvData.currSubject;
    const subjectList = recvData.subjectList;
    const currSubjectID = recvData.currSubjectID;

    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

    const [assignList, setAssignList] = useState();

    const getAssignList = async () => {
        try{
            const response = await assignment_list(currSubjectID, currSemester);
            if(response.status === 201){
                setAssignList(response.data);
            }
        } catch (err) {
            if (err.response && (err.response.status === 419 || err.response.status === 401)) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else {
                console.log(err);
            }
        }
    };
    useEffect(() => {
        getAssignList();
    }, []);

    const rows = [];
    if(assignList && assignList.assignment){
        for(let i = 0; i < assignList.assignment.length; i++){
            rows.push(createData(assignList.assignment[i].id, assignList.assignment[i].title, assignList.assignment[i].start_date, assignList.assignment[i].due_date));
        };
    };

    const handleClickRow = (data) => {
        const assign_ID = data.num;
        const due_date = data.due_time;
        const title = data.title;   
        const url = `/professor/read_assign/${currSemester}/${currSubjectID}/${assign_ID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "semesterList" : semesterList,
            "subjectList" : subjectList,
            "assignID" : assign_ID,
            "title" : title,
            "due_date" : due_date,
        };
        navigate(url, { state: sendData });
    };

    const handleWriteNotice = () => {
        const url = `/professor/write_assign/${currSemester}/${currSubjectID}`;
        const sendWriteData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
            "semesterList" : semesterList,
            "subjectList" : subjectList,
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
                                <MenuItem key={list.name} value={list.name}>{list.name+'('+ list.sub_ID +')'}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <ContentText variant="h4">과제</ContentText>
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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                                    <TableRow key={idx} onClick={() => handleClickRow(row)}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.label} align="center">
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page + 1}
                        onChange={handleChangePage}
                    />
                    <Row spacing={3} mt={3}>
                        <CommonButton variant="contained" onClick={handleWriteNotice}>작성</CommonButton>
                        <CommonButton variant="contained" onClick={() => navigate(-1)}>이전</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default AssignmentList;