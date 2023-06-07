import { Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from "@mui/material";
import { useState } from "react";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import OuterBox from "../../components/Box/OuterBox";
import Row from "../../components/Stack/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonButton from "../../components/Button/CommonButton";
import ContentText from "../../components/Input/ContentText";
import { grade_enter, grade_list } from "../../services/userServices";
import { useLocation } from "react-router-dom";

const scoreOptions = [
    { value: 'A+' },
    { value: 'A0' },
    { value: 'B+' },
    { value: 'B0' },
    { value: 'C+' },
    { value: 'C0' },
    { value: 'D+' },
    { value: 'D0' },
    { value: 'F' },
];

const columns = [
    { id: "major", label: "학과" },
    { id: "name", label: "이름" },
    { id: "id", label: "아이디" },
    { id: "score", label: "성적" },
];

function createData(major, name, id, score) {
    return { major, name, id, score };
}

const Grade = () => {
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubjectID = recvData.currSubjectID;

    const [page, setPage] = useState(0);
    const rowsPerPage = 8;
    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

    const [gradeData, setGradeData] = useState();

    // const getGradeData = async () => {
    //     const response = await grade_list(currSubjectID, currSemester);
    //     setGradeData(response.data);
    // }
    // useEffect(() => {
    //     getGradeData();
    // }, []);

    const handleGrade = async (postGrade) => {
        console.log(postGrade);
        // try{
        //     const response = await grade_enter(currSubjectID, currSemester, postGrade);
        //     if(response.status === 200){
        //         console.log("공지사항 생성 성공!");
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    };

    const [rows, setRows] = useState([
        createData("컴퓨터정보공학부", "최호진", "2018202020", "A+"),
        createData("컴퓨터정보공학부", "김우곤", "2018202020", ""),
        createData("컴퓨터정보공학부", "이동익", "2018202020", ""),
        createData("컴퓨터정보공학부", "홍길동", "2018202020", ""),
        createData("컴퓨터정보공학부", "이기훈", "2018202020", ""),
        createData("컴퓨터정보공학부", "사마의", "2018202020", ""),
        createData("컴퓨터정보공학부", "장보고", "2018202020", ""),
        createData("컴퓨터정보공학부", "대조영", "2018202020", ""),
        createData("컴퓨터정보공학부", "이순신", "2018202020", ""),
        createData("컴퓨터정보공학부", "이방원", "2018202020", ""),
        createData("컴퓨터정보공학부", "이성계", "2018202020", ""),
        createData("컴퓨터정보공학부", "하후돈", "2018202020", ""),
        createData("컴퓨터정보공학부", "제갈량", "2018202020", ""),
        createData("컴퓨터정보공학부", "하후연", "2018202020", ""),
    ]);

    return(
        <>
            <HeaderPro />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center", mt: 5 }}>
                    <ContentText variant="h4" sx={{ my: 3 }} >수강 인원 조회 및 성적 입력</ContentText>
                    <TableContainer sx={{ width: "90%", py: 3 }}>
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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                                    const rowIndex = page * rowsPerPage + idx;
                                    return(
                                        <TableRow key={rowIndex}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (    
                                                    <TableCell key={column.id} align="center">
                                                        {column.id === "score" ? (
                                                            <Select
                                                                value={value}
                                                                name="score"
                                                                onChange={(e) => {
                                                                    const updatedScore = e.target.value;
                                                                    const updatedRows = [...rows];
                                                                    updatedRows[rowIndex][column.id] = updatedScore;
                                                                    setRows(updatedRows);
                                                                }}
                                                                sx={{ height: "48px", width: { md: "55%", xs: "70%" }, mx: { xs: 2 }}}
                                                            >
                                                                <MenuItem value="">학점</MenuItem>
                                                                {scoreOptions.map((score) => (
                                                                    <MenuItem key={score.value} value={score.value}>
                                                                        {score.value}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        ) : (
                                                            value
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page + 1}
                        onChange={handleChangePage}
                    />
                    <Row sx={{ justifyContent: "flex-end", width: "80%", mt: 2 }}>
                        <CommonButton variant="contained" onClick={() => handleGrade(rows)}>저장</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default Grade;