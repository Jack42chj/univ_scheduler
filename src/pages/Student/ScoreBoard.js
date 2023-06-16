import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import OuterBox from "../../components/Box/OuterBox";
import HeaderStu from "../../components/Header/HeaderStu";
import ContentText from "../../components/Input/ContentText";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { grade } from "../../services/sdtServices";

const studentInfo = [
    {id: "school_name", label: "학교"},
    {id: "major", label: "학과"},
    {id: "student_id", label: "학번"},
    {id: "student_name", label: "이름"},
];

function createStudent(school_name, major, student_id, student_name) {
    return { school_name, major, student_id, student_name };
}

const creditInfo = [
    {id: "major_credit", label: "전공 신청 학점"},
    {id: "general_credit", label: "일반 신청 학점"},
    {id: "total_credit", label: "총 신청 학점"},
    {id: "get_major_credit", label: "취득 전공 학점"},
    {id: "get_general_credit", label: "취득 일반 학점"},
    {id: "get_total_credit", label: "총 취득 학점"},
    {id: "average_score", label: "평균 학점"},
];

function createCredit(major_credit, general_credit, total_credit, get_major_credit, get_general_credit, get_total_credit, average_score) {
    return { major_credit, general_credit, total_credit, get_major_credit, get_general_credit, get_total_credit, average_score };
}

const subjectInfo = [
    { id: "sub_code", label: "학정번호" },
    { id: "sub_name", label: "과목명" },
    { id: "major_area", label: "교수명" },
    { id: "classification", label: "이수구분" },
    { id: "credit", label: "학점" },
    { id: "grade", label: "성적" },
];

const ScoreBoard = () => {
    const navigate = useNavigate();
    const [gradeData, setGradeData] = useState();

    const getGradeData = async () => {
        try{
            const response = await grade();
            if(response.status === 200){
                setGradeData(response.data);
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
        getGradeData();
    }, []);

    const stuInfo = [];
    const crdInfo = [];
    const subInfo = gradeData && gradeData.sub_info ? gradeData.sub_info : {};
    if(gradeData && gradeData.student_info && gradeData.credit_info && gradeData.average_score){
        stuInfo.push(createStudent(gradeData.student_info.school_name, gradeData.student_info.major, gradeData.student_info.student_id, gradeData.student_info.student_name));
        crdInfo.push(createCredit(gradeData.credit_info.major_credit, gradeData.credit_info.general_credit, gradeData.credit_info.total_credit, 
        gradeData.credit_info.get_major_credit, gradeData.credit_info.get_general_credit, gradeData.credit_info.get_total_credit, gradeData.average_score));
    }
    console.log(stuInfo, crdInfo);

    return(
        <>
            <HeaderStu />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                { gradeData && gradeData.sub_info && (
                <>
                <OuterBox sx={{ my: 2, py: 5, width: "90%", alignItems: "center" }}>
                        <ContentText variant="h4">성적 관리</ContentText>
                        <TableContainer sx={{
                            width: "90%", borderRadius: 6, mt: 2, border: "3px solid #D4D4D4", "& td": { borderBottom: "3px solid #F0F0F0", borderRight: "3px solid #F0F0F0" },
                            "& th": { borderBottom: "3px solid #F0F0F0", borderRight: "3px solid #F0F0F0" }, "& td:last-child": { borderRight: "none" }, "& th:last-child": { borderRight: "none" }
                        }}>
                            <Table>
                                <TableHead>
                                    {studentInfo.map((column) => (
                                        <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableHead>
                                <TableBody>
                                    {stuInfo.map((student) => (
                                        <TableRow key={student.student_id}>
                                            {studentInfo.map((column) => (
                                                <TableCell key={column.id} align="center">
                                                    {student[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer sx={{
                            width: "90%", borderRadius: 6, mt: 2, border: "3px solid #D4D4D4", "& td": { borderBottom: "3px solid #F0F0F0", borderRight: "3px solid #F0F0F0" },
                            "& th": { borderBottom: "3px solid #F0F0F0", borderRight: "3px solid #F0F0F0" }, "& td:last-child": { borderRight: "none" }, "& th:last-child": { borderRight: "none" }
                        }}>
                            <Table>
                                <TableHead>
                                    {creditInfo.map((column) => (
                                        <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>{column.label}</TableCell>
                                    ))}
                                </TableHead>
                                <TableBody>
                                    {crdInfo.map((credit) => (
                                        <TableRow key={credit.total_credit}>
                                            {creditInfo.map((column) => (
                                                <TableCell key={column.id} align="center">{credit[column.id]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </OuterBox><OuterBox sx={{ my: 2, py: 5, width: "90%", alignItems: "center" }}>
                            <ContentText variant="h4">학기별 성적</ContentText>
                            {Object.entries(subInfo).map(([semester, subjects]) => (
                                <TableContainer key={semester} sx={{
                                    width: "90%", borderRadius: 6, mt: 5, border: "3px solid #D4D4D4", "& td": { borderBottom: "3px solid #F0F0F0", borderRight: "3px solid #F0F0F0" },
                                    "& th": { borderBottom: "3px solid #F0F0F0", borderRight: "3px solid #F0F0F0" }, "& td:last-child": { borderRight: "none" }, "& th:last-child": { borderRight: "none" }
                                }}>
                                    <ContentText variant="h5" sx={{ py: 2 }}>{semester}</ContentText>
                                    <Table>
                                        <TableHead sx={{ borderTop: "3px solid #F0F0F0" }}>
                                            {subjectInfo.map((column) => (
                                                <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                                    {column.label}
                                                    
                                                </TableCell>
                                            ))}
                                        </TableHead>
                                        <TableBody>
                                            {subjects.map((subject) => (
                                                <TableRow key={subject.sub_code}>
                                                    {subjectInfo.map((column) => (
                                                        <TableCell key={column.id} align="center">
                                                            {subject[column.id]}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ))}
                        </OuterBox>
                    </>
                )}
            </BgcolorStack>       
        </>
    );
};

export default ScoreBoard;