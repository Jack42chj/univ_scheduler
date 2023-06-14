import { Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import OuterBox from "../../components/Box/OuterBox";
import Row from "../../components/Stack/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonButton from "../../components/Button/CommonButton";
import ContentText from "../../components/Input/ContentText";
import { grade_enter, grade_list } from "../../services/proServices";
import { useLocation, useNavigate } from "react-router-dom";

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
    { id: "id", label: "학번" },
    { id: "score", label: "성적" },
];

function createData(major, name, id, score) {
    return { major, name, id, score };
}

const Grade = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubjectID = recvData.currSubjectID;

    const [page, setPage] = useState(0);
    const rowsPerPage = 8;
    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

    const [rows, setRows] = useState([]);
    const [gradeData, setGradeData] = useState([]);

    const getGradeData = async () => {
        try{
            const response = await grade_list(currSubjectID, currSemester);
            if(response.status === 201){
                setGradeData(response.data);
                setRows(
                    response.data.board.map((row) =>
                        createData(row.major, row.student_name, row.student_id, row.grade)
                    )
                );
            }
        } catch (err) {
            if (err.response && err.response.status.toString().startswith('4')) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else {
                console.log(err);
            }       
        }
    }
    useEffect(() => {
        getGradeData();
    }, []);
    
    const handleGrade = async (postGrade) => {
        const transformData = {
            student_id: postGrade.map((item) => item.id),
            grade: postGrade.map((item) => item.score),
        };
        try{
            const response = await grade_enter(currSubjectID, currSemester, transformData);
            if(response.status === 201){
                alert("성적 저장 완료!");
            }
            else
                alert(response.data);
        } catch (err) {
            if (err.response && err.response.status.toString().startswith('4')) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else {
                console.log(err);
            }
        }
    };

    return(
        <>
            <HeaderPro />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ py: 5, mb: 1, justifyContent: "center", alignItems: "center", mt: 5 }}>
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
                            
                        </Table>
                    </TableContainer>
                    { gradeData && gradeData.board && (
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
                    )}
                    <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page + 1}
                        onChange={handleChangePage}
                    />
                    <Row spacing={2} sx={{ justifyContent: "flex-end", width: "80%", mt: 2 }}>
                        <CommonButton variant="contained" onClick={() => handleGrade(rows)}>저장</CommonButton>
                        <CommonButton variant="contained" onClick={() => navigate(-1)}>이전</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default Grade;