import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notice_list } from "../../../services/userServices";
import HeaderPro from "../../../components/Header/HeaderPro";
import BgcolorStack from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import Row from "../../../components/Stack/Row";
import ContentText from "../../../components/Input/ContentText";
import CommonButton from "../../../components/Button/CommonButton";

const columns = [
    { id: "num", label: "번호"},
    { id: "title", label: "제목" },
    { id: "filexo", label: "파일" },
    { id: "writer", label: "작성자" },
    { id: "date", label: "작성일" },
    { id: "view_count", label: "조회수" },
];

function createData(num, title, filexo, writer, date, view_count) {
    if(filexo === 1) filexo = <FilePresentIcon />;
    else filexo = "";
    return {num ,title, filexo, writer, date, view_count};
};

const NoticeList = () => {
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

    const [noticeList, setNoticeList] = useState();

    const getNoticeList = async () => {
        const response = await notice_list(currSubjectID, currSemester);
        setNoticeList(response.data);
    };
    useEffect(() => {
        getNoticeList();
    }, []);

    const rows = [];
    if(noticeList && noticeList.notice){
        for(let i = 0; i < noticeList.notice.length; i++){
            let file_exist = 0;
            if(noticeList.notice[i].file_names) file_exist = 1;
            rows.push(createData(noticeList.notice[i].id, noticeList.notice[i].title, file_exist , noticeList.notice[i].writer, noticeList.notice[i].created_time, noticeList.notice[i].view));
        };
    };

    const handleClickRow = (data) => {
        const notice_ID = data.num;
        const title = data.title;
        const writer = data.writer;
        const date = data.date;
        const view = data.view_count;
        const url = `/professor/read_notice/${currSemester}/${currSubjectID}/${notice_ID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "semesterList" : semesterList,
            "subjectList" : subjectList,
            "noticeID" : notice_ID,
            "title" : title,
            "writer" : writer,
            "date" : date,
            "view" : view,
        };
        navigate(url, { state: sendData });
    };

    const handleWriteNotice = () => {
        const url = `/professor/write_notice/${currSemester}/${currSubjectID}`;
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
                    <ContentText variant="h4">강의 공지사항</ContentText>
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

export default NoticeList;