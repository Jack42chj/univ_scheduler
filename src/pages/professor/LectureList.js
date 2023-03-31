import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../components/Box/BgcolorStack";
import OuterBox from "../../components/Box/OuterBox";
import Row from "../../components/Grid/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import ContentText from "../../components/Text/ContentText";

const SemesterList = [
    {semester: "2022-1"}, {semester: "2022-2"},
    {semester: "2023-1"}, {semester: "2023-2"},
];

const columns = [
    { id: "num", label: "학정번호" },
    { id: "name", label: "과목명" },
    { id: "period", label: "교시" },
    { id: "room", label: "강의실" },
];

function createData(num, name, period, room) {
    return { num, name, period, room };
}

const rows = [
    createData("H020-4-0846-01", "소프트웨어공학", "월 5, 수 6", "새빛205"),
    createData("H020-2-1234-01", "진로탐색및설계", "화 2, 3", "미지정"),
    createData("H020-2-8482-02", "객체지향프로그래밍실습", "금 3, 4", "새빛302"),
    createData("H020-3-3704-02", "시스템프로그래밍실습", "금 5, 6", "새빛303"),
    createData("0000-2-4654-03", "KW-VIP 2023-1", "미지정", "새빛102"),
    createData("H020-4-0846-01", "소프트웨어공학", "월 5, 수 6", "새빛205"),
];

const LectureList = () => {
    const [semester, setSemester] = useState('');
    const handleChangeSemester = (e) => setSemester(e.target.value);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

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
                            sx={{ width: "50%" }}
                        >
                            <MenuItem value="">학기</MenuItem>
                            {Object.keys(SemesterList).map((year) => (
                                <MenuItem key={SemesterList[year].semester} value={SemesterList[year].semester}>{SemesterList[year].semester}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <ContentText variant="h4">강의 관리</ContentText>
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
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.name}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
                                                    {value}
                                                </TableCell>
                                            );})}
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

export default LectureList;