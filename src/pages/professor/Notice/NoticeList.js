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
    { id: "title", label: "제목" },
    { id: "filexo", label: "파일" },
    { id: "name", label: "작성자" },
    { id: "date", label: "작성일" },
    { id: "view_count", label: "조회수" },
];

function createData(title, filexo, name, date, view_count) {
    if(filexo === 1) filexo = <FilePresentIcon />;
    else filexo = "";
    return {title, filexo, name, date, view_count};
};

const rows = [
    createData("소프트웨어공학 공지1", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지2", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지3", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지4", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지5", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지6", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지7", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지8", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지9", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지10", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지11", 1, "이기훈", "2023-03-27", 1),
];

const NoticeList = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const semesterList = recvData.semesterList;
    const currSubject = recvData.currSubject;
    const subjectList = recvData.subjectList;
    const currSubjectID = recvData.currSubjectID;

    const [semester, setSemester] = useState(currSemester);
    const [subject, setSubject] = useState(currSubject);
    const handleChangeSemester = (e) => setSemester(e.target.value);
    const handleChangeSubject = (e) => setSubject(e.target.value);

    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
  
    const [index, setIndex] = useState(1);

    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
      setIndex((newPage - 1) * rowsPerPage + 1);
    };

    const [noticeList, setNoticeList] = useState();

    // const getNoticeList = async () => {
    //     const response = await notice_list(currSubjectID, currSemester);
    //     setNoticeList(response.data);
    // };
    // useEffect(() => {
    //     getNoticeList();
    // }, []);

    const row = [];
    const notice_ID = noticeList ? noticeList.id : null;
    const notice_title = noticeList ? noticeList.title : null;
    const notice_writer = noticeList ? noticeList.professor_name : null;
    const notice_date = noticeList ? noticeList.updated_time : null;
    const view_count = noticeList ? noticeList.view : null;

    // for(let i = 0; i < scheduleList.length; i++){
    //     row.push(createData(scheduleList[i].sub_code, scheduleList[i].name, scheduleList[i].time, scheduleList[i].class));
    // };

    const handleClickRow = (noticeID) => {
        const url = `/professor/read_notice/${currSemester}/${currSubjectID}/${noticeID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "noticeID" : noticeID,
        };
        navigate(url, { state: sendData });
    };

    const handleWriteNotice = () => {
        const url = `/professor/write_notice/${currSemester}/${currSubjectID}`;
        const sendWriteData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
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
                            value={semester}
                            name="semester"
                            onChange={handleChangeSemester}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
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
                                    <TableCell align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>번호</TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ cursor: "pointer" }}>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                                    <TableRow key={i} onClick={() => handleClickRow(i)}>
                                        <TableCell align="center">{index + i}</TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
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
                    <CommonButton variant="contained" onClick={handleWriteNotice} sx={{ mt: 3 }}>작성</CommonButton>
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default NoticeList;