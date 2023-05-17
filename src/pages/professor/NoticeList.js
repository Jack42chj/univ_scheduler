import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import BgcolorBox from "../../components/Stack/BackgroundStack";
import OuterBox from "../../components/Box/OuterBox";
import Row from "../../components/Stack/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ContentText from "../../components/Input/ContentText";
import { notice_list } from "../../services/userServices";

const SemesterList = [
    {semester: "2022-1"}, {semester: "2022-2"},
    {semester: "2023-1"}, {semester: "2023-2"},
];

const SubjectList = [
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
    {name: "소프트웨어공학"}, {name: "소프트웨어공학"}, 
];

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
}

const rows = [
    createData("소프트웨어공학 공지", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 1, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 0, "이기훈", "2023-03-27", 1),
    createData("소프트웨어공학 공지", 1, "이기훈", "2023-03-27", 1),
];

const NoticeList = () => {
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const handleChangeSemester = (e) => setSemester(e.target.value);
    const handleChangeSubject = (e) => setSubject(e.target.value);

    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
  
    const [index, setIndex] = useState(1);

    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
      setIndex((newPage - 1) * rowsPerPage + 1);
    };

    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        const getNoticeList = async (semester, subject) => {
            try {
                const response = await notice_list(semester, subject);
                setNoticeList(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNoticeList();
    }, []);

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
                            sx={{ width: "30%", height: "48px" }}
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
                            sx={{ width: "30%", height: "48px" }}
                        >
                            <MenuItem value="">과목명</MenuItem>
                            {Object.keys(SubjectList).map((list) => (
                                <MenuItem key={SubjectList[list].name} value={SubjectList[list].name}>{SubjectList[list].name}</MenuItem>
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
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                                    <TableRow key={i}>
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
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default NoticeList;