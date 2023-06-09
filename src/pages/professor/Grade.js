import { Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from "@mui/material";
import { useState } from "react";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import OuterBox from "../../components/Box/OuterBox";
import Row from "../../components/Stack/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonButton from "../../components/Button/CommonButton";
import ContentText from "../../components/Input/ContentText";
import { grade_enter, grade_list } from "../../services/userServices";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

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

    //const [gradeData, setGradeData] = useState([]);

    // const getGradeData = async () => {
    //     const response = await grade_list(currSubjectID, currSemester);
    //     setGradeData(response.data);
    // }
    // useEffect(() => {
    //     getGradeData();
    // }, []);

    const [gradeData] = useState({
        "board": [
            {
                "student_id": "2020202020",
                "grade": "A+",
                "student_name": "관우",
                "major": "컴퓨터정보공학부",
            },
            {
                "student_id": "2020202020",
                "grade": "B+",
                "student_name": "장비",
                "major": "컴퓨터정보공학부",
            },
            {
                "student_id": "2020202020",
                "grade": "C+",
                "student_name": "유비",
                "major": "컴퓨터정보공학부",
            },
            {
                "student_id": "2020202020",
                "grade": "",
                "student_name": "황충",
                "major": "컴퓨터정보공학부",
            },
            {
                "student_id": "2020202020",
                "grade": "",
                "student_name": "마초",
                "major": "컴퓨터정보공학부",
            },
            {
                "student_id": "2020202020",
                "grade": "D0",
                "student_name": "조운",
                "major": "컴퓨터정보공학부",
            },
            {
                "student_id": "2020202020",
                "grade": "",
                "student_name": "방통",
                "major": "컴퓨터정보공학부",
            },
        ],
    });
    
    const handleGrade = async (postGrade) => {
        console.log(postGrade);
        try{
            const response = await grade_enter(currSubjectID, currSemester, postGrade);
            if(response.status === 201){
                console.log("성적 저장 완료!");
            }
            else if(response.status === 401){
                console.log("잘못된 access 토큰!");
                navigate("/");
            }
            else if(response.status === 419){
                console.log("access 토큰 만료!");
                navigate("/");
            }
            else
                alert(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const [rows, setRows] = useState(
        gradeData.board.map((row) => createData(row.major, row.student_name, row.student_id, row.grade))
    );

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